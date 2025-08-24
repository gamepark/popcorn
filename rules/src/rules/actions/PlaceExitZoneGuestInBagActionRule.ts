import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { PlaceExitZoneGuestInBagAction } from '../../material/Actions/PlaceExitZoneGuestInBagAction'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'

export class PlaceExitZoneGuestInBagActionRule extends ActionRule<PlaceExitZoneGuestInBagAction> {
  public consequencesBeforeRuleForPlayer(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

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
      this.removeCurrentActionForPlayer(player)
      return [this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(player).shuffle()]
    }
    return super.afterItemMove(move, _context)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }
}
