import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { offsetPremiersTileCoordinates } from './utils/offsetLocatorCoordinates'

class FeatureMovieCardsRowLocator extends ListLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  gap = { x: 7.5 }

  getHoverTransform() {
    return ['scale(2)', 'translateZ(10em)']
  }

  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    return offsetPremiersTileCoordinates(context, 7, 8)
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    if (context.player !== context.rules.game.view && context.displayIndex === context.rules.material(MaterialType.MovieCards).id(item.id).getIndex()) {
      return context.dragTransform !== undefined
    }
    return super.hide(item, context)
  }
}

export const featureMovieCardsRowLocator = new FeatureMovieCardsRowLocator()
