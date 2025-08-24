import { CustomMove, isSelectItemType, ItemMove, Material, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { ChooseSeatActionAction } from '../../material/Actions/ChooseSeatActionAction'
import { CustomMoveType, isPassCurrentActionCustomMove } from '../../material/CustomMoveType'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MoneyToken, moneyTokens } from '../../material/MoneyToken'
import { PopcornToken, popcornTokens } from '../../material/PopcornToken'
import { SeatAction, SeatColor, TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'

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
      if (parentTheaterTile.location.player === undefined) {
        throw new Error('Cannot find owning player for guest pawn')
      }
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = [
        guestPawnMaterial.unselectItem(),
        guestPawnMaterial.moveItem({
          type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
          player: parentTheaterTile.location.player
        })
      ]
      this.removeCurrentActionForPlayer(parentTheaterTile.location.player)
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
      if (seatColor === SeatColor.Grey || guestPawn.id === this.getGuestColorCorrespondingToSeatColor(seatColor)) {
        return this.getConsequencesForSeatAction(parentTileCharacteristics.getSeatAction(guestPawn.location.x), player, guestPawnMaterial)
      }
      return [
        guestPawnMaterial.unselectItem(),
        guestPawnMaterial.moveItem({
          type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
          player: player
        })
      ]
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
    const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = [guestPawnMaterial.unselectItem()]
    switch (seatAction) {
      case SeatAction.Get1Money:
        return consequences
          .concat(
            this.material(MaterialType.MoneyTokens).money<MoneyToken>(moneyTokens).addMoney(1, {
              type: LocationType.PlayerMoneyPileSpot,
              player: player
            })
          )
          .concat(
            guestPawnMaterial.moveItem({
              type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
              player: player
            })
          )
      case SeatAction.Get2Money:
        return consequences
          .concat(
            this.material(MaterialType.MoneyTokens).money<MoneyToken>(moneyTokens).addMoney(2, {
              type: LocationType.PlayerMoneyPileSpot,
              player: player
            })
          )
          .concat(
            guestPawnMaterial.moveItem({
              type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
              player: player
            })
          )
      case SeatAction.Get3Money:
        return consequences
          .concat(
            this.material(MaterialType.MoneyTokens).money<MoneyToken>(moneyTokens).addMoney(3, {
              type: LocationType.PlayerMoneyPileSpot,
              player: player
            })
          )
          .concat(
            guestPawnMaterial.moveItem({
              type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
              player: player
            })
          )
      case SeatAction.Get1Popcorn:
        return consequences
          .concat(
            this.material(MaterialType.PopcornTokens).money<PopcornToken>(popcornTokens).addMoney(1, {
              type: LocationType.PlayerPopcornPileUnderPopcornCupSpot,
              player: player
            })
          )
          .concat(
            guestPawnMaterial.moveItem({
              type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
              player: player
            })
          )
      case SeatAction.Get2Popcorn:
        return consequences
          .concat(
            ...this.material(MaterialType.PopcornTokens).money<PopcornToken>(popcornTokens).addMoney(2, {
              type: LocationType.PlayerPopcornPileUnderPopcornCupSpot,
              player: player
            })
          )
          .concat(
            guestPawnMaterial.moveItem({
              type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
              player: player
            })
          )
      case SeatAction.MovieAction:
        this.memorize<Actions[]>(
          Memory.PendingActions,
          (pendingActions) => {
            pendingActions.unshift({
              type: ActionType.ChooseMovieAction,
              guestIndex: guestPawnMaterial.getIndex()
            })
            return pendingActions
          },
          player
        )
        return consequences
      case SeatAction.PlaceGuestInReserve:
        this.memorize<Actions[]>(
          Memory.PendingActions,
          (pendingActions) => {
            pendingActions.unshift({
              type: ActionType.PlaceCinemaGuestInReserve
            })
            return pendingActions
          },
          player
        )
        return consequences
      case SeatAction.DrawGuestAndPlaceThem:
        this.memorize<Actions[]>(
          Memory.PendingActions,
          (pendingActions) => {
            pendingActions.unshift({
              type: ActionType.PlaceGuests,
              placeOneGuest: true
            })
            return pendingActions
          },
          player
        )
        return consequences.concat(
          this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(player).deck().dealOne({
            type: LocationType.PlayerShowingsDrawnGuestSpot,
            player: player
          })
        )
      case SeatAction.MoveGuestFromExitZoneToBag:
        this.memorize<Actions[]>(
          Memory.PendingActions,
          (pendingActions) => {
            pendingActions.unshift({
              type: ActionType.PlaceExitZoneGuestInBag
            })
            return pendingActions
          },
          player
        )
        return consequences
      case undefined:
        return consequences
    }
  }
}
