import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { PlaceCinemaGuestInReserveAction } from '../../material/Actions/PlaceCinemaGuestInReserveAction'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'

export class PlaceCinemaGuestInReserveActionRule extends ActionRule<PlaceCinemaGuestInReserveAction> {
  public consequencesBeforeRuleForPlayer(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.GuestPawns)
      .player(player)
      .location((l) => l.type !== LocationType.PlayerGuestPawnsUnderClothBagSpot)
      .moveItems((item) => ({
        type: LocationType.GuestPawnReserveSpot,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: item.id
      }))
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) && move.location.type === LocationType.GuestPawnReserveSpot) {
      const guestPawn = this.material(MaterialType.GuestPawns).index(move.itemIndex).getItem<GuestPawn>()
      if (guestPawn?.location.player === undefined) {
        throw new Error('Invalid guest pawn')
      }
      this.memorize<Actions[]>(
        Memory.PendingActions,
        (pendingActions) => pendingActions.filter((action) => action.type !== ActionType.ChooseMovieAction || action.guestIndex !== move.itemIndex),
        guestPawn.location.player
      )
      this.removeCurrentActionForPlayer(guestPawn.location.player)
      if (this.action.guestIndexToMoveToExitZone !== undefined && move.itemIndex !== this.action.guestIndexToMoveToExitZone) {
        return [
          this.material(MaterialType.GuestPawns).index(this.action.guestIndexToMoveToExitZone).moveItem({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: guestPawn.location.player
          })
        ]
      }
    }
    return super.afterItemMove(move, context)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }
}
