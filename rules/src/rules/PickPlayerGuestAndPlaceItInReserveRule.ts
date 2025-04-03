import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PickPlayerGuestAndPlaceItInReserveRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.GuestPawns)
      .player(this.player)
      .location(
        (location) => location.type === LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard || location.type === LocationType.GuestPawnSpotOnTheaterTile
      )
      .moveItems((item) => ({
        type: LocationType.GuestPawnReserveSpot,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: item.id
      }))
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) && move.location.type === LocationType.GuestPawnReserveSpot) {
      return [this.startRule<RuleId>(RuleId.BuyingPhaseRule)]
    }
    return super.afterItemMove(move, _context)
  }
}
