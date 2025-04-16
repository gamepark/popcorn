import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PlaceExitZoneGuestInBagRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moves = this.material(MaterialType.GuestPawns).location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard).player(player).moveItems({
      type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
      player: player
    })
    return moves
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) &&
      move.location.type === LocationType.PlayerGuestPawnsUnderClothBagSpot
    ) {
      const player = move.location.player
      if (player === undefined) {
        throw new Error('Cannot find player from target location')
      }
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = [
        this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(player).shuffle()
      ]
      if (this.remind<RuleId.BuyingPhaseRule | RuleId.ShowingsPhaseRule>(Memorize.CurrentPhase) === RuleId.BuyingPhaseRule) {
        consequences.push(this.endPlayerTurn(player), this.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, player))
      }
      return consequences
    }
    return super.afterItemMove(move, _context)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }
}
