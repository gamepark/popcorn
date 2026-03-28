import { CustomMove, ItemMove, Material, PlayMoveContext } from '@gamepark/rules-api'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { ChooseSeatActionAction } from '../../material/Actions/ChooseSeatActionAction'
import { PlaceExitZoneGuestInBagAction } from '../../material/Actions/PlaceExitZoneGuestInBagAction'
import { CustomMoveType, isPassCurrentActionCustomMove } from '../../material/CustomMoveType'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayableMovieCardId } from '../../material/MovieCard'
import { isPopcornSelectItemType, PopcornMove } from '../../material/PopcornMoves'
import { SeatAction, SeatColor, TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { AvailableMovieActionsMemory, Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { AudienceMoveOrMovieOrSeatActionRule } from './AudienceMoveOrMovieOrSeatActionRule'

export class ChooseSeatActionActionRule extends AudienceMoveOrMovieOrSeatActionRule<ChooseSeatActionAction> {
  public consequencesBeforeRuleForPlayer(): PopcornMove[] {
    return []
  }

  public getActivePlayerLegalMoves(player: PlayerColor): PopcornMove[] {
    const guestPawnMaterial = this.material(MaterialType.GuestPawns).player(player).index(this.action.guestIndex)
    return [guestPawnMaterial.selectItem(), this.customMove(CustomMoveType.PassCurrentAction, { player: player })]
  }

  public onCustomMove(move: CustomMove, _context?: PlayMoveContext): PopcornMove[] {
    if (isPassCurrentActionCustomMove(move)) {
      const guestPawnMaterial = this.material(MaterialType.GuestPawns).index(this.action.guestIndex)
      const guestPawn = guestPawnMaterial.getItems<GuestPawn>()[0]
      const parentTheaterTile = this.material(MaterialType.TheaterTiles).index(guestPawn.location.parent).getItems<Required<TheaterTileId>>()[0]
      const player = parentTheaterTile.location.player
      if (player === undefined) {
        throw new Error('Cannot find owning player for guest pawn')
      }
      this.removeCurrentActionForPlayer(player)
      const consequences: PopcornMove[] = []
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

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): PopcornMove[] {
    if (isPopcornSelectItemType(MaterialType.GuestPawns)(move) && move.selected !== false) {
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
      const consequences: PopcornMove[] = [guestPawnMaterial.unselectItem()]
      if (seatColor === SeatColor.Grey || guestPawn.id === this.getGuestColorCorrespondingToSeatColor(seatColor)) {
        consequences.push(
          ...this.getConsequencesForSeatAction(
            parentTileCharacteristics.getSeatAction(guestPawn.location.x),
            player,
            guestPawnMaterial,
            this.canPlayerPlaceAGuestAfterSeatOrMovieAction(player, guestPawn.location.x!) ? move.itemIndex : undefined
          )
        )
      }
      const movieCard = this.material(MaterialType.MovieCards)
        .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
        .player(player)
        .location((l) => l.x === parentTheaterTile.location.x)
        .getItems<Required<PlayableMovieCardId>>()[0]
      const movieRemainingAvailableActions = this.remind<AvailableMovieActionsMemory>(Memory.AvailableMovieActions)[movieCard.id.front]!
      if (
        !this.remind<Actions[]>(Memory.PendingActions, player).some(
          (action) =>
            (action.type === ActionType.ChooseMovieAction && action.guestIndex === this.action.guestIndex) ||
            (action.type === ActionType.PlaceGuests && action.guestIndexToMoveToExitZone === this.action.guestIndex) ||
            action.type === ActionType.PlaceExitZoneGuestInBag ||
            action.type === ActionType.PlaceCinemaGuestInReserve
        )
      ) {
        consequences.push(
          guestPawnMaterial.moveItem({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        )
      } else if (!movieRemainingAvailableActions.some((available) => available)) {
        consequences.push(this.customMove(CustomMoveType.PassCurrentAction, { player: player }))
      }
      return consequences
    }
    return super.afterItemMove(move, _context)
  }

  public getMovesAfterPlayersDone(): PopcornMove[] {
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
    guestPawnMaterial: Material<PlayerColor, MaterialType, LocationType>,
    guestIndexToMoveAfter?: number
  ): PopcornMove[] {
    switch (seatAction) {
      case SeatAction.Get1Money:
        return this.getMoneyMove(player, MaterialType.MoneyTokens, 1)
      case SeatAction.Get2Money:
        return this.getMoneyMove(player, MaterialType.MoneyTokens, 2)
      case SeatAction.Get3Money:
        return this.getMoneyMove(player, MaterialType.MoneyTokens, 3)
      case SeatAction.Get1Popcorn:
        return this.getMoneyMove(player, MaterialType.PopcornTokens, 1)
      case SeatAction.Get2Popcorn:
        return this.getMoneyMove(player, MaterialType.PopcornTokens, 2)
      case SeatAction.MovieAction:
        this.addPendingActionForPlayer(player, {
          type: ActionType.ChooseMovieAction,
          guestIndex: guestPawnMaterial.getIndex(),
          isSeatAction: true
        })
        return []
      case SeatAction.PlaceGuestInReserve:
        this.addPendingActionForPlayer(player, { type: ActionType.PlaceCinemaGuestInReserve })
        return []
      case SeatAction.DrawGuestAndPlaceThem:
        return this.getDrawGuestMovesAndAddPendingActionIfNecessary(player, guestPawnMaterial.getItem()!.location.x!, guestIndexToMoveAfter)
      case SeatAction.MoveGuestFromExitZoneToBag: {
        const action: PlaceExitZoneGuestInBagAction = { type: ActionType.PlaceExitZoneGuestInBag }
        const guestIndex = guestPawnMaterial.getIndex()
        if (!this.existsPendingActionForPlayer(player, (action) => action.type === ActionType.ChooseMovieAction && action.guestIndex === guestIndex)) {
          action.guestIndexToMoveToExitZone = guestIndex
        }
        this.addPendingActionForPlayer(player, action)
        return []
      }
      case undefined:
        return []
    }
  }
}
