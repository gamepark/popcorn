import { CustomMove, Location, MaterialMove, MoveItem, PlayMoveContext } from '@gamepark/rules-api'
import { range } from 'es-toolkit'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { BuyMovieCardAction } from '../../material/Actions/BuyMovieCardAction'
import { BuyMovieCardCustomMoveData, CustomMoveType, isBuyMovieCardCustomMove } from '../../material/CustomMoveType'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MoneyToken, moneyTokens } from '../../material/MoneyToken'
import { PlayableMovieCardId, MovieCard, movieCardCharacteristics, MovieColor } from '../../material/MovieCard'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { getBuyingFilmCardConsequences } from '../utils/movieCardConsequences.util'
import { ActionRule } from './ActionRule'
import { addPendingActionForPlayer } from './utils/addPendingActionForPlayer.util'

export class BuyMovieCardActionRule extends ActionRule<BuyMovieCardAction> {
  public consequencesBeforeRuleForPlayer(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
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
    const moves = destinations.flatMap((destination) =>
      this.getMovesForMovieCardsInRow(playerMoney, destination, LocationType.FeaturesRowSpot)
        .concat(this.getMovesForMovieCardsInRow(playerMoney, destination, LocationType.PremiersRowSpot))
        .map((move) => this.mapMovieCardMoveToCustomMove(move))
    )
    return moves
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public onCustomMove(move: CustomMove<CustomMoveType>, context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (isBuyMovieCardCustomMove(move)) {
      const boughtCard = this.material(MaterialType.MovieCards).index(move.data.boughtCardIndex).getItem<Required<PlayableMovieCardId>>()
      if (
        boughtCard === undefined ||
        (boughtCard.location.type !== LocationType.PremiersRowSpot && boughtCard.location.type !== LocationType.FeaturesRowSpot)
      ) {
        throw new Error('Invalid bought card')
      }
      this.removeCurrentActionForPlayer(move.data.player)
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] = this.material(MaterialType.MoneyTokens)
        .player(move.data.player)
        .location(LocationType.PlayerMoneyPileSpot)
        .money<MoneyToken>(moneyTokens)
        .removeMoney(movieCardCharacteristics[boughtCard.id.front].getPrice(boughtCard.location.type), {
          type: LocationType.PlayerMoneyPileSpot,
          player: move.data.player
        })
      if (boughtCard.location.type === LocationType.PremiersRowSpot) {
        addPendingActionForPlayer(
          this,
          {
            type: ActionType.PickReserveOrExitZoneGuest,
            guest: BuyMovieCardActionRule.getGuestPawnColorFromMovieId(boughtCard.id.front),
            boughtCardData: move.data
          },
          move.data.player
        )
        return consequences
      }
      return consequences.concat(getBuyingFilmCardConsequences(this, move.data.player, boughtCard, move.data.destinationSpot))
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
