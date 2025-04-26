import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { GuestPawn } from '../material/GuestPawn'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PickPlayerGuestAndPlaceItInReserveRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.GuestPawns)
      .location(
        (location) =>
          (location.type === LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard && location.player === player) ||
          (location.type === LocationType.GuestPawnSpotOnTheaterTile &&
            this.material(MaterialType.TheaterTiles).player(player).index(location.parent).length > 0)
      )
      .moveItems((item) => ({
        type: LocationType.GuestPawnReserveSpot,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: item.id
      }))
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) && move.location.type === LocationType.GuestPawnReserveSpot) {
      const guestPawn = this.material(MaterialType.GuestPawns).index(move.itemIndex).getItems<GuestPawn>()[0]
      if (guestPawn.location.player === undefined) {
        throw new Error('Cannot find player from pawn origin')
      }
      if (this.remind<RuleId.BuyingPhaseRule | RuleId.ShowingsPhaseRule>(Memorize.CurrentPhase) === RuleId.BuyingPhaseRule) {
        return [this.endPlayerTurn(guestPawn.location.player), this.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, guestPawn.location.player)]
      }
    }
    return super.afterItemMove(move, _context)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }
}
