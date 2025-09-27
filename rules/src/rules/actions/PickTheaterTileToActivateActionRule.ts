import { isSelectItemType, ItemMove, MaterialItem, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { range } from 'es-toolkit'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { PickTheaterTileToActivateAction } from '../../material/Actions/PickTheaterTileToActivateAction'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { movieCardCharacteristics, MovieColor } from '../../material/MovieCard'
import { BuyableTheaterTileId, SeatColor, TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { TheaterTileCharacteristics } from '../../material/TheaterTiles/TheaterTileCharacteristics'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'

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
      this.memorize<Actions[]>(
        Memory.PendingActions,
        (pendingActions) => {
          pendingActions.unshift(...this.buildPendingActions(guestPawnsOnTile, tileCharacteristics, guestPawnsOnTileIndexes))
          return pendingActions
        },
        player
      )
      return []
    }
    return super.afterItemMove(move, _context)
  }

  private buildPendingActions(
    guestPawnsOnTile: MaterialItem<PlayerColor, LocationType, GuestPawn>[],
    tileCharacteristics: TheaterTileCharacteristics,
    guestPawnsOnTileIndexes: number[]
  ): Actions[] {
    return range(0, guestPawnsOnTile.length).flatMap((index) => {
      const actionsToPush: Actions[] = []
      const guestPawn = guestPawnsOnTile[index]
      const guestPawnColor = guestPawn.id
      const seatColor = tileCharacteristics.getSeatColor(guestPawn.location.x ?? 0)
      if (seatColor !== undefined && (seatColor === SeatColor.Grey || seatColor === this.getSeatColorFromGuestPawn(guestPawnColor))) {
        actionsToPush.push({
          type: ActionType.ChooseSeatAction,
          guestIndex: guestPawnsOnTileIndexes[index]
        })
      }
      const parentTheaterTile = this.material(MaterialType.TheaterTiles).index(guestPawn.location.parent).getItems<Required<TheaterTileId>>()[0]
      const movieCard = this.material(MaterialType.MovieCards)
        .player(parentTheaterTile.location.player)
        .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
        .location((l) => l.x === parentTheaterTile.location.x)
        .getItems<Required<BuyableTheaterTileId>>()[0]
      const movieCharacteristics = movieCardCharacteristics[movieCard.id.front]
      if (movieCharacteristics.color === this.getMovieColorFromGuestPawn(guestPawnColor)) {
        actionsToPush.push({
          type: ActionType.ChooseMovieAction,
          guestIndex: guestPawnsOnTileIndexes[index]
        })
      }
      return actionsToPush
    })
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }

  private getSeatColorFromGuestPawn(guestPawn: GuestPawn) {
    switch (guestPawn) {
      case GuestPawn.Blue:
        return SeatColor.Blue
      case GuestPawn.Green:
        return SeatColor.Green
      case GuestPawn.Red:
        return SeatColor.Red
      case GuestPawn.Yellow:
        return SeatColor.Yellow
      case GuestPawn.White:
        return undefined
    }
  }

  private getMovieColorFromGuestPawn(guestPawn: GuestPawn) {
    switch (guestPawn) {
      case GuestPawn.Blue:
        return MovieColor.Blue
      case GuestPawn.Green:
        return MovieColor.Green
      case GuestPawn.Red:
        return MovieColor.Red
      case GuestPawn.Yellow:
        return MovieColor.Yellow
      case GuestPawn.White:
        return undefined
    }
  }
}
