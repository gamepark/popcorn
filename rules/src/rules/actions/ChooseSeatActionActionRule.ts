import { CustomMove, isSelectItemType, ItemMove, Material, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { ChooseSeatActionAction } from '../../material/Actions/ChooseSeatActionAction'
import { CustomMoveType, isPassCurrentActionCustomMove } from '../../material/CustomMoveType'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { SeatAction, SeatColor, TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'
import { addPendingActionForPlayer } from './utils/addPendingActionForPlayer.util'
import { getDrawGuestMovesAndAddPendingActionIfNecessary, getMoneyMove } from './utils/movieOrSeatActionConsequences.util'

export class ChooseSeatActionActionRule extends ActionRule<ChooseSeatActionAction> {
  public consequencesBeforeRuleForPlayer(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const guestPawnMaterial = this.material(MaterialType.GuestPawns).player(player).index(this.action.guestIndex)
    return [guestPawnMaterial.selectItem(), this.customMove(CustomMoveType.PassCurrentAction, { player: player })]
  }

  public onCustomMove(move: CustomMove, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (isPassCurrentActionCustomMove(move)) {
      const guestPawnMaterial = this.material(MaterialType.GuestPawns).index(this.action.guestIndex)
      const guestPawn = guestPawnMaterial.getItems<GuestPawn>()[0]
      const parentTheaterTile = this.material(MaterialType.TheaterTiles).index(guestPawn.location.parent).getItems<Required<TheaterTileId>>()[0]
      const player = parentTheaterTile.location.player
      if (player === undefined) {
        throw new Error('Cannot find owning player for guest pawn')
      }
      this.removeCurrentActionForPlayer(player)
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
      const guestPendingMovieAction = this.remind<Actions[]>(Memory.PendingActions, player).find(
        (action) => action.type === ActionType.ChooseMovieAction && action.guestIndex === this.action.guestIndex
      )
      if (guestPendingMovieAction === undefined) {
        consequences.push(
          guestPawnMaterial.moveItem({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: parentTheaterTile.location.player
          })
        )
      }
      return consequences
    }
    return super.onCustomMove(move, _context)
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (isSelectItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) && move.selected !== false) {
      const guestPawnMaterial = this.material(MaterialType.GuestPawns).index(move.itemIndex)
      const guestPawn = guestPawnMaterial.getItems<GuestPawn>()[0]
      if (guestPawn.location.x === undefined) {
        throw new Error('Error getting guest pawn location')
      }
      const parentTheaterTile = this.material(MaterialType.TheaterTiles).index(guestPawn.location.parent).getItems<Required<TheaterTileId>>()[0]
      const player = parentTheaterTile.location.player
      if (player === undefined) {
        throw new Error('Error getting theater tile owning player')
      }
      const parentTileCharacteristics = theaterTilesCharacteristics[parentTheaterTile.id.front]
      const seatColor = parentTileCharacteristics.getSeatColor(guestPawn.location.x)
      if (seatColor === undefined) {
        throw new Error('Error getting theater tile seat color')
      }
      this.removeCurrentActionForPlayer(player)
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] = [guestPawnMaterial.unselectItem()]
      if (seatColor === SeatColor.Grey || guestPawn.id === this.getGuestColorCorrespondingToSeatColor(seatColor)) {
        consequences.push(...this.getConsequencesForSeatAction(parentTileCharacteristics.getSeatAction(guestPawn.location.x), player, guestPawnMaterial))
      }
      if (
        !this.remind<Actions[]>(Memory.PendingActions, player).some(
          (action) => action.type === ActionType.ChooseMovieAction && action.guestIndex === this.action.guestIndex
        )
      ) {
        consequences.push(
          guestPawnMaterial.moveItem({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        )
      }
      return consequences
    }
    return super.afterItemMove(move, _context)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  private getGuestColorCorrespondingToSeatColor(seatColor: Exclude<SeatColor, SeatColor.Grey>): GuestPawn {
    switch (seatColor) {
      case SeatColor.Blue:
        return GuestPawn.Blue
      case SeatColor.Green:
        return GuestPawn.Green
      case SeatColor.Red:
        return GuestPawn.Red
      case SeatColor.Yellow:
        return GuestPawn.Yellow
    }
  }

  private getConsequencesForSeatAction(
    seatAction: SeatAction | undefined,
    player: PlayerColor,
    guestPawnMaterial: Material<PlayerColor, MaterialType, LocationType>
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    switch (seatAction) {
      case SeatAction.Get1Money:
        return getMoneyMove(this, player, MaterialType.MoneyTokens, 1)
      case SeatAction.Get2Money:
        return getMoneyMove(this, player, MaterialType.MoneyTokens, 2)
      case SeatAction.Get3Money:
        return getMoneyMove(this, player, MaterialType.MoneyTokens, 3)
      case SeatAction.Get1Popcorn:
        return getMoneyMove(this, player, MaterialType.PopcornTokens, 1)
      case SeatAction.Get2Popcorn:
        return getMoneyMove(this, player, MaterialType.PopcornTokens, 2)
      case SeatAction.MovieAction:
        addPendingActionForPlayer(
          this,
          {
            type: ActionType.ChooseMovieAction,
            guestIndex: guestPawnMaterial.getIndex()
          },
          player
        )
        return []
      case SeatAction.PlaceGuestInReserve:
        addPendingActionForPlayer(this, { type: ActionType.PlaceCinemaGuestInReserve }, player)
        return []
      case SeatAction.DrawGuestAndPlaceThem:
        return getDrawGuestMovesAndAddPendingActionIfNecessary(this, player)
      case SeatAction.MoveGuestFromExitZoneToBag:
        addPendingActionForPlayer(this, { type: ActionType.PlaceExitZoneGuestInBag }, player)
        return []
      case undefined:
        return []
    }
  }
}
