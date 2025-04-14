import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PlaceExitZoneGuestInBagRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moves = this.material(MaterialType.GuestPawns).location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard).player(this.player).moveItems({
      type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
      player: this.player
    })
    return moves
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) &&
      move.location.type === LocationType.PlayerGuestPawnsUnderClothBagSpot &&
      move.location.player === this.player
    ) {
      return [
        this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(this.player).shuffle(),
        this.startRule<RuleId>(RuleId.BuyingPhaseRule)
      ]
    }
    return super.afterItemMove(move, _context)
  }
}
