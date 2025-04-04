import { isMoveItemType, isStartRule, isStartSimultaneousRule, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
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
    const guestColor = this.remind<GuestPawn>(Memorize.GuestPawnColorToDraw, this.player)
    const reserveGuestMaterial = this.material(MaterialType.GuestPawns).location(LocationType.GuestPawnReserveSpot).id<GuestPawn>(guestColor)
    return reserveGuestMaterial.length > 0
      ? reserveGuestMaterial.moveItems({
          type: LocationType.PlayerGuestPawnsUnderBlothBagSpot,
          player: this.player
        })
      : this.material(MaterialType.GuestPawns)
          .location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard)
          .player((player) => player !== this.player)
          .id<GuestPawn>(guestColor)
          .moveItems({
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
}
