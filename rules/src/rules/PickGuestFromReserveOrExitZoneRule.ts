import { isMoveItemType, isStartRule, isStartSimultaneousRule, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { AdvertisingTokenSpot } from '../material/AdvertisingTokenSpot'
import { GuestPawn } from '../material/GuestPawn'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MovieCardId } from '../material/MovieCard'
import { Memorize, PlayerActionMemory } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { BuyingPhaseBuyingFilmRule } from './BuyingPhaseBuyingFilmRule'
import { RuleId } from './RuleId'

export class PickGuestFromReserveOrExitZoneRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const guestColor = this.getGuestPawnColorFromMemory()
    if (guestColor === GuestPawn.White) {
      return this.game.players.flatMap((player) =>
        this.material(MaterialType.GuestPawns)
          .id(GuestPawn.White)
          .location(
            (location) =>
              (location.player !== this.player && location.type === LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard) ||
              (location.player === this.player && location.type !== LocationType.PlayerGuestPawnsUnderBlothBagSpot) ||
              location.type === LocationType.GuestPawnReserveSpot
          )
          .moveItems({
            type: LocationType.PlayerGuestPawnsUnderBlothBagSpot,
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
            .player((player) => player !== this.player)
            .id<GuestPawn>((id) => id !== GuestPawn.White)
        : this.material(MaterialType.GuestPawns)
            .location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard)
            .player((player) => player !== this.player)
            .id<GuestPawn>(guestColor)
    return reserveGuestMaterial.length > 0
      ? reserveGuestMaterial.moveItems({
          type: LocationType.PlayerGuestPawnsUnderBlothBagSpot,
          player: this.player
        })
      : exitZoneGuestsMaterial.moveItems({
          type: LocationType.PlayerGuestPawnsUnderBlothBagSpot,
          player: this.player
        })
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) &&
      move.location.type === LocationType.PlayerGuestPawnsUnderBlothBagSpot &&
      move.location.player === this.player
    ) {
      const moveData = this.remind<PlayerActionMemory>(Memorize.PlayerActions, this.player)[RuleId.BuyingPhaseRule].buyingCardCustomMoveData
      if (moveData === undefined) {
        throw new Error('Issue with game memory')
      }
      const boughtCard = this.material(MaterialType.MovieCards).index(moveData.boughtCardIndex).getItem<Required<MovieCardId>>()
      if (boughtCard === undefined) {
        throw new Error('Issue with game memory')
      }
      const consequences = [
        this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderBlothBagSpot).player(this.player).shuffle(),
        ...BuyingPhaseBuyingFilmRule.getBuyingFilmCardConsequences(this, this.player, boughtCard, moveData.destinationSpot)
      ]
      if (!consequences.some((move) => isStartRule(move) || isStartSimultaneousRule(move))) {
        consequences.push(this.startRule<RuleId>(RuleId.BuyingPhaseRule))
      }
      return consequences
    }
    return super.afterItemMove(move, _context)
  }

  private getGuestPawnColorFromMemory(): GuestPawn | undefined {
    const colorFromMemory = this.remind<AdvertisingTokenSpot>(Memorize.GuestPawnColorToDraw)
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
