import { CustomMove, isSelectItemType, ItemMove, Material, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { CustomMoveType, isPassSeatActionCustomMove } from '../material/CustomMoveType'
import { GuestPawn } from '../material/GuestPawn'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MoneyToken, moneyTokens } from '../material/MoneyToken'
import { PopcornToken, popcornTokens } from '../material/PopcornToken'
import { SeatAction, SeatColor, TheaterTileId, theaterTilesCharacteristics } from '../material/TheaterTile'
import { Memorize, PlayerActionMemory } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { SeatActionSubRules } from './ShowingsPhaseSubRules'

export class ShowingsPhaseSeatActionRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const parentTileItemIndex = this.remind<PlayerActionMemory>(Memorize.PlayerActions, player)[RuleId.ShowingsPhaseRule].currentTheaterTileIndex
    const guestPawnMaterial = this.material(MaterialType.GuestPawns)
      .parent(parentTileItemIndex)
      .minBy((item) => item.location.x ?? 0)
    return [guestPawnMaterial.selectItem(), this.customMove(CustomMoveType.PassSeatAction, { player: player, guestPawnIndex: guestPawnMaterial.getIndex() })]
  }

  public onCustomMove(move: CustomMove, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isPassSeatActionCustomMove(move)) {
      const guestPawnMaterial = this.material(MaterialType.GuestPawns).index(move.data.guestPawnIndex)
      const guestPawnSeat = guestPawnMaterial.getItems<GuestPawn>()[0].location.x
      if (guestPawnSeat === undefined) {
        throw new Error('Error getting guest pawn seat number')
      }
      return [
        guestPawnMaterial.unselectItem(),
        guestPawnMaterial.moveItem({
          type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
          player: move.data.player
        })
      ]
    }
    return super.onCustomMove(move, _context)
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isSelectItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) && move.selected) {
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

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }

  // private isLastGuestOnTile(guestPawnSeat: number, theaterTileFrontId: TheaterTile) {
  //   switch (theaterTilesCharacteristics[theaterTileFrontId].getSeatsNumber()) {
  //     case SeatsNumber.One:
  //       return 0 === guestPawnSeat
  //     case SeatsNumber.Two:
  //       return 1 === guestPawnSeat
  //     case SeatsNumber.Three:
  //       return 2 === guestPawnSeat
  //   }
  // }

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
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = [guestPawnMaterial.unselectItem()]
    switch (seatAction) {
      case SeatAction.Get1Money:
        consequences.push(
          ...this.material(MaterialType.MoneyTokens).money<MoneyToken>(moneyTokens).addMoney(1, {
            type: LocationType.PlayerMoneyPileSpot,
            player: player
          }),
          guestPawnMaterial.moveItem({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        )
        break
      case SeatAction.Get2Money:
        consequences.push(
          ...this.material(MaterialType.MoneyTokens).money<MoneyToken>(moneyTokens).addMoney(2, {
            type: LocationType.PlayerMoneyPileSpot,
            player: player
          }),
          guestPawnMaterial.moveItem({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        )
        break
      case SeatAction.Get3Money:
        consequences.push(
          ...this.material(MaterialType.MoneyTokens).money<MoneyToken>(moneyTokens).addMoney(3, {
            type: LocationType.PlayerMoneyPileSpot,
            player: player
          }),
          guestPawnMaterial.moveItem({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        )
        break
      case SeatAction.Get1Popcorn:
        consequences.push(
          ...this.material(MaterialType.PopcornTokens).money<PopcornToken>(popcornTokens).addMoney(1, {
            type: LocationType.PlayerPopcornPileUnderPopcornCupSpot,
            player: player
          }),
          guestPawnMaterial.moveItem({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        )
        break
      case SeatAction.Get2Popcorn:
        consequences.push(
          ...this.material(MaterialType.PopcornTokens).money<PopcornToken>(popcornTokens).addMoney(2, {
            type: LocationType.PlayerPopcornPileUnderPopcornCupSpot,
            player: player
          }),
          guestPawnMaterial.moveItem({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        )
        break
      case SeatAction.MovieAction:
        this.memorize<PlayerActionMemory>(
          Memorize.PlayerActions,
          (actionMemory) => {
            actionMemory[RuleId.ShowingsPhaseRule].seatActionSubRule = SeatActionSubRules.MovieAction
            return actionMemory
          },
          player
        )
        break
      case SeatAction.PlaceGuestInReserve:
        this.memorize<PlayerActionMemory>(
          Memorize.PlayerActions,
          (actionMemory) => {
            actionMemory[RuleId.ShowingsPhaseRule].seatActionSubRule = SeatActionSubRules.PlaceGuestInReserve
            return actionMemory
          },
          player
        )
        break
      case SeatAction.DrawGuestAndPlaceThem:
        this.memorize<PlayerActionMemory>(
          Memorize.PlayerActions,
          (actionMemory) => {
            actionMemory[RuleId.ShowingsPhaseRule].seatActionSubRule = SeatActionSubRules.DrawGuestAndPlaceThem
            return actionMemory
          },
          player
        )
        consequences.push(
          this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(player).deck().dealOne({
            type: LocationType.PlayerShowingsDrawnGuestSpot,
            player: player
          })
        )
        break
      case SeatAction.MoveGuestFromExitZoneToBag:
        this.memorize<PlayerActionMemory>(
          Memorize.PlayerActions,
          (actionMemory) => {
            actionMemory[RuleId.ShowingsPhaseRule].seatActionSubRule = SeatActionSubRules.MoveGuestFromExitZoneToBag
            return actionMemory
          },
          player
        )
        break
    }
    return consequences
  }
}
