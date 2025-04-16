import { isMoveItemType, isStartRule, isStartSimultaneousRule, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { AdvertisingTokenSpot } from '../material/AdvertisingTokenSpot'
import { GuestPawn } from '../material/GuestPawn'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MovieCardId } from '../material/MovieCard'
import { Memorize, PlayerActionMemory } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { getBuyingFilmCardConsequences } from './utils/BuyingFilmConsequencesHelper'

export class PickGuestFromReserveOrExitZoneRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  public getActivePlayerLegalMoves(currentPlayer: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const guestColor = this.getGuestPawnColorFromMemory(currentPlayer)
    if (guestColor === GuestPawn.White) {
      return this.game.players.flatMap((player) =>
        this.material(MaterialType.GuestPawns)
          .id(GuestPawn.White)
          .location(
            (location) =>
              (location.player !== currentPlayer && location.type === LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard) ||
              (location.player === currentPlayer && location.type !== LocationType.PlayerGuestPawnsUnderClothBagSpot) ||
              location.type === LocationType.GuestPawnReserveSpot
          )
          .moveItems({
            type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
            player: player
          })
      )
    }
    const reserveGuestMaterial =
      guestColor === undefined
        ? this.material(MaterialType.GuestPawns)
            .location(LocationType.GuestPawnReserveSpot)
            .id<GuestPawn>((id) => id !== GuestPawn.White)
        : this.material(MaterialType.GuestPawns).location(LocationType.GuestPawnReserveSpot).id<GuestPawn>(guestColor)
    const exitZoneGuestsMaterial =
      guestColor === undefined
        ? this.material(MaterialType.GuestPawns)
            .location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard)
            .player((player) => player !== currentPlayer)
            .id<GuestPawn>((id) => id !== GuestPawn.White)
        : this.material(MaterialType.GuestPawns)
            .location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard)
            .player((player) => player !== currentPlayer)
            .id<GuestPawn>(guestColor)
    return reserveGuestMaterial.length > 0
      ? reserveGuestMaterial.moveItems({
          type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
          player: currentPlayer
        })
      : exitZoneGuestsMaterial.moveItems({
          type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
          player: currentPlayer
        })
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) &&
      move.location.type === LocationType.PlayerGuestPawnsUnderClothBagSpot
    ) {
      const playerMakingMove = move.location.player
      if (playerMakingMove === undefined) {
        throw new Error('Invalid player')
      }
      const moveData = this.remind<PlayerActionMemory>(Memorize.PlayerActions, playerMakingMove)[RuleId.BuyingPhaseRule].buyingCardCustomMoveData
      if (moveData === undefined) {
        throw new Error('Issue with game memory')
      }
      const boughtCard = this.material(MaterialType.MovieCards).index(moveData.boughtCardIndex).getItem<Required<MovieCardId>>()
      if (boughtCard === undefined) {
        throw new Error('Issue with game memory')
      }
      const consequences = [
        this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(playerMakingMove).shuffle(),
        ...getBuyingFilmCardConsequences(this, playerMakingMove, boughtCard, moveData.destinationSpot)
      ]
      if (
        this.remind<RuleId.BuyingPhaseRule | RuleId.ShowingsPhaseRule>(Memorize.CurrentPhase) === RuleId.BuyingPhaseRule &&
        !consequences.some((move) => isStartRule(move) || isStartSimultaneousRule(move))
      ) {
        consequences.push(this.endPlayerTurn<PlayerColor>(playerMakingMove), this.startRule<RuleId>(RuleId.BuyingPhaseRule))
      }
      return consequences
    }
    return super.afterItemMove(move, _context)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }

  private getGuestPawnColorFromMemory(player: PlayerColor): GuestPawn | undefined {
    const colorFromMemory = this.remind<AdvertisingTokenSpot>(Memorize.GuestPawnColorToDraw, player)
    switch (colorFromMemory) {
      case AdvertisingTokenSpot.AnyGuestPawn:
        return undefined
      case AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag:
        return GuestPawn.White
      case AdvertisingTokenSpot.BlueGuestPawn:
        return GuestPawn.Blue
      case AdvertisingTokenSpot.GreenGuestPawn:
        return GuestPawn.Green
      case AdvertisingTokenSpot.RedGuestPawn:
        return GuestPawn.Red
      case AdvertisingTokenSpot.YellowGuestPawn:
        return GuestPawn.Yellow
    }
  }
}
