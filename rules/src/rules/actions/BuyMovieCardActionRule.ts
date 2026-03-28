import { CustomMove, Location, MoveItem, PlayMoveContext } from '@gamepark/rules-api'
import { range } from 'es-toolkit'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { BuyMovieCardAction } from '../../material/Actions/BuyMovieCardAction'
import { BuyMovieCardCustomMoveData, CustomMoveType, isBuyMovieCardCustomMove } from '../../material/CustomMoveType'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MoneyToken, moneyTokens } from '../../material/MoneyToken'
import { MovieCard, movieCardCharacteristics, MovieColor, PlayableMovieCardId } from '../../material/MovieCard'
import { PopcornMove } from '../../material/PopcornMoves'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { AudienceMoveOrMovieOrSeatActionRule } from './AudienceMoveOrMovieOrSeatActionRule'

export class BuyMovieCardActionRule extends AudienceMoveOrMovieOrSeatActionRule<BuyMovieCardAction> {
  public consequencesBeforeRuleForPlayer(): PopcornMove[] {
    return []
  }

  public getActivePlayerLegalMoves(player: PlayerColor): PopcornMove[] {
    const numberOfDestinations =
      this.material(MaterialType.TheaterTiles)
        .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
        .player(player)
        .location((location) => location.x === 2).length !== 0
        ? 3
        : 2
    const destinations = range(0, numberOfDestinations).map((destinationX) => ({
      type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
      player: player,
      x: destinationX
    }))
    const playerMoney = this.material(MaterialType.MoneyTokens).money(moneyTokens).location(LocationType.PlayerMoneyPileSpot).player(player).count
    return destinations.flatMap((destination) =>
      this.getMovesForMovieCardsInRow(playerMoney, destination, LocationType.FeaturesRowSpot)
        .concat(this.getMovesForMovieCardsInRow(playerMoney, destination, LocationType.PremiersRowSpot))
        .map((move) => this.mapMovieCardMoveToCustomMove(move))
    )
  }

  public getMovesAfterPlayersDone(): PopcornMove[] {
    return []
  }

  public onCustomMove(move: CustomMove<CustomMoveType>, context?: PlayMoveContext): PopcornMove[] {
    if (isBuyMovieCardCustomMove(move)) {
      const boughtCard = this.material(MaterialType.MovieCards).index(move.data.boughtCardIndex).getItem<Required<PlayableMovieCardId>>()
      if (
        boughtCard === undefined ||
        (boughtCard.location.type !== LocationType.PremiersRowSpot && boughtCard.location.type !== LocationType.FeaturesRowSpot)
      ) {
        throw new Error('Invalid bought card')
      }
      this.removeCurrentActionForPlayer(move.data.player)
      const consequences: PopcornMove[] = this.material(MaterialType.MoneyTokens)
        .money<MoneyToken>(moneyTokens)
        .removeMoney(movieCardCharacteristics[boughtCard.id.front].getPrice(boughtCard.location.type), {
          type: LocationType.PlayerMoneyPileSpot,
          player: move.data.player
        })
      if (boughtCard.location.type === LocationType.PremiersRowSpot) {
        const guestColorToPick = BuyMovieCardActionRule.getGuestPawnColorFromMovieId(boughtCard.id.front)
        const pickableGuestsMaterial = this.material(MaterialType.GuestPawns)
          .location(
            (l) =>
              (l.type === LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard && l.player !== move.data.player) ||
              l.type === LocationType.GuestPawnReserveSpot
          )
          .id(guestColorToPick)
        if (pickableGuestsMaterial.exists) {
          this.addPendingActionForPlayer(move.data.player, {
            type: ActionType.PickReserveOrExitZoneGuest,
            guest: guestColorToPick,
            boughtCardData: move.data
          })
          return consequences
        }
      }
      return consequences.concat(this.getBuyingFilmCardConsequences(move.data.player, boughtCard, move.data.destinationSpot))
    }
    return super.onCustomMove(move, context)
  }

  protected override removeCurrentActionForPlayer(player: PlayerColor): void {
    this.memorize<Actions[]>(Memory.PendingActions, (pendingActions) => pendingActions.filter((action) => action.type !== ActionType.BuyMovieCard), player)
  }

  private getMovesForMovieCardsInRow(
    playerMoney: number,
    destination: Location<PlayerColor, LocationType>,
    row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot
  ): MoveItem<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.MovieCards)
      .location(row)
      .id<Required<PlayableMovieCardId>>((id) => movieCardCharacteristics[id.front].getPrice(row) <= playerMoney)
      .moveItems(destination)
  }

  private mapMovieCardMoveToCustomMove(move: MoveItem<PlayerColor, MaterialType, LocationType>): CustomMove<CustomMoveType> {
    const moveData: BuyMovieCardCustomMoveData = {
      boughtCardIndex: move.itemIndex,
      player: move.location.player ?? this.game.players[0],
      destinationSpot: move.location.x as 0 | 1 | 2
    }
    return this.customMove<CustomMoveType>(CustomMoveType.BuyMovieCard, moveData)
  }

  private static getGuestPawnColorFromMovieId(front: Exclude<MovieCard, MovieCard.FinalShowing>): GuestPawn {
    switch (movieCardCharacteristics[front].color) {
      case MovieColor.Blue:
        return GuestPawn.Blue
      case MovieColor.Green:
        return GuestPawn.Green
      case MovieColor.Red:
        return GuestPawn.Red
      case MovieColor.Yellow:
        return GuestPawn.Yellow
    }
  }
}
