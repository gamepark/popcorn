import { isSelectItemType, ItemMove, MaterialItem, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { range } from 'es-toolkit'
import { Actions } from '../../material/Actions/Actions'
import { ChooseMovieActionAction } from '../../material/Actions/ChooseMovieActionAction'
import { ChooseSeatActionAction } from '../../material/Actions/ChooseSeatActionAction'
import { PickTheaterTileToActivateAction } from '../../material/Actions/PickTheaterTileToActivateAction'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { TheaterTileCharacteristics } from '../../material/TheaterTiles/TheaterTileCharacteristics'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'
import { buildPendingActionsForGuest } from './utils/buildPendingActionsForGuest'
import { getMovieColorFromSpot } from './utils/getMovieColorFromSpot'

export class PickTheaterTileToActivateActionRule extends ActionRule<PickTheaterTileToActivateAction> {
  public consequencesBeforeRuleForPlayer(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const theaterTileIndexes = this.material(MaterialType.GuestPawns)
      .location(LocationType.GuestPawnSpotOnTheaterTile)
      .player(player)
      .getItems<Required<TheaterTileId>>()
      .map((item) => item.location.parent)
    return this.material(MaterialType.TheaterTiles)
      .index((tileIndex) => theaterTileIndexes.includes(tileIndex))
      .selected(false)
      .selectItems()
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isSelectItemType<PlayerColor, MaterialType, LocationType>(MaterialType.TheaterTiles)(move) && move.selected !== false) {
      const theaterTileItem = this.material(MaterialType.TheaterTiles).index(move.itemIndex).getItems<Required<TheaterTileId>>()[0]
      const player = theaterTileItem.location.player
      if (player === undefined) {
        throw new Error('Cannot find player owning theater tile')
      }
      const tileCharacteristics = theaterTilesCharacteristics[theaterTileItem.id.front]
      const guestPawnsOnTileMaterial = this.material(MaterialType.GuestPawns)
        .location(LocationType.GuestPawnSpotOnTheaterTile)
        .parent(move.itemIndex)
        .sort((item) => item.location.x ?? 0)
      const guestPawnsOnTile = guestPawnsOnTileMaterial.getItems<GuestPawn>()
      const guestPawnsOnTileIndexes = guestPawnsOnTileMaterial.getIndexes()
      this.removeCurrentActionForPlayer(player)
      const addedPendingActions = this.buildPendingActions(guestPawnsOnTile, tileCharacteristics, guestPawnsOnTileIndexes)
      if (addedPendingActions.length > 0) {
        this.memorize<Actions[]>(
          Memory.PendingActions,
          (pendingActions) => {
            pendingActions.unshift(...this.buildPendingActions(guestPawnsOnTile, tileCharacteristics, guestPawnsOnTileIndexes))
            return pendingActions
          },
          player
        )
        const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
        let firstGuestWithActionFound = false
        guestPawnsOnTileIndexes.forEach((guestPawnIndex) => {
          if (!firstGuestWithActionFound) {
            firstGuestWithActionFound = addedPendingActions.some((action) => action.guestIndex === guestPawnIndex)
            if (!firstGuestWithActionFound) {
              consequences.push(
                guestPawnsOnTileMaterial.index(guestPawnIndex).moveItem({
                  type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
                  player: player
                })
              )
            }
          }
        })
        return consequences
      } else {
        return [
          guestPawnsOnTileMaterial.moveItemsAtOnce({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        ]
      }
    }
    return super.afterItemMove(move, _context)
  }

  private buildPendingActions(
    guestPawnsOnTile: MaterialItem<PlayerColor, LocationType, GuestPawn>[],
    tileCharacteristics: TheaterTileCharacteristics,
    guestPawnsOnTileIndexes: number[]
  ): (ChooseSeatActionAction | ChooseMovieActionAction)[] {
    return range(0, guestPawnsOnTile.length).flatMap((index) => {
      const guestPawn = guestPawnsOnTile[index]
      const guestPawnColor = guestPawn.id
      const guestPawnIndex = guestPawnsOnTileIndexes[index]
      const seatColor = tileCharacteristics.getSeatColor(guestPawn.location.x ?? 0)
      const parentTheaterTile = this.material(MaterialType.TheaterTiles).index(guestPawn.location.parent).getItems<Required<TheaterTileId>>()[0]
      const movieColor = getMovieColorFromSpot(this, parentTheaterTile.location.player!, parentTheaterTile.location.x ?? 0)
      return buildPendingActionsForGuest(seatColor, guestPawnColor, guestPawnIndex, movieColor)
    })
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }
}
