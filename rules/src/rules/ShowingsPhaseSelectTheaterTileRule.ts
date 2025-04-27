import { isSelectItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { TheaterTileId } from '../material/TheaterTile'
import { Memorize, PlayerActionMemory } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class ShowingsPhaseSelectTheaterTileRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
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
      this.memorize<PlayerActionMemory>(
        Memorize.PlayerActions,
        (actionMemory) => {
          actionMemory[RuleId.ShowingsPhaseRule].currentTheaterTileIndex = move.itemIndex
          actionMemory[RuleId.ShowingsPhaseRule].theaterTilesActivated[theaterTileItem.location.x ?? 0] = true
          return actionMemory
        },
        player
      )
      return []
    }
    return super.afterItemMove(move, _context)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }
}
