import { ItemMove, PlayMoveContext } from '@gamepark/rules-api'
import { PlaceExitZoneGuestInBagAction } from '../../material/Actions/PlaceExitZoneGuestInBagAction'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { isPopcornMoveItemType, PopcornMove } from '../../material/PopcornMoves'
import { PlayerColor } from '../../PlayerColor'
import { ActionRule } from './ActionRule'

export class PlaceExitZoneGuestInBagActionRule extends ActionRule<PlaceExitZoneGuestInBagAction> {
  public consequencesBeforeRuleForPlayer(): PopcornMove[] {
    return []
  }

  public getActivePlayerLegalMoves(player: PlayerColor): PopcornMove[] {
    const moves = this.material(MaterialType.GuestPawns).location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard).player(player).moveItems({
      type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
      player: player
    })
    return moves
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): PopcornMove[] {
    if (isPopcornMoveItemType(MaterialType.GuestPawns)(move) && move.location.type === LocationType.PlayerGuestPawnsUnderClothBagSpot) {
      const player = move.location.player
      if (player === undefined) {
        throw new Error('Cannot find player from target location')
      }
      this.removeCurrentActionForPlayer(player)
      const consequences: PopcornMove[] = [
        this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(player).shuffle()
      ]
      if (this.action.guestIndexToMoveToExitZone !== undefined && move.itemIndex !== this.action.guestIndexToMoveToExitZone) {
        consequences.push(
          this.material(MaterialType.GuestPawns).index(this.action.guestIndexToMoveToExitZone).moveItem({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        )
      }
      return consequences
    }
    return super.afterItemMove(move, _context)
  }

  public getMovesAfterPlayersDone(): PopcornMove[] {
    return []
  }
}
