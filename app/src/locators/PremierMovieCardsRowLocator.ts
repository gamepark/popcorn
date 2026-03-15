import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { offsetPremiersTileCoordinates } from './utils/offsetLocatorCoordinates.ts'

class PremierMovieCardsRowLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  gap = { x: 7.5 }

  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return offsetPremiersTileCoordinates(context, 7, 0)
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): boolean {
    if (context.player !== (context.rules.game.view ?? context.player) && context.dragTransform !== undefined) {
      const draggedIndex = context.index
      const draggedItem = context.rules.material(MaterialType.MovieCards).index(draggedIndex).getItem()
      if (draggedItem?.id.front === item.id.front) {
        return true
      }
    }
    return super.hide(item, context)
  }
}

export const premierMovieCardsRowLocator = new PremierMovieCardsRowLocator()
