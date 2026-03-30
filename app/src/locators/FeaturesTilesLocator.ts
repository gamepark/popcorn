import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { offsetPremiersTileCoordinates } from './utils/offsetLocatorCoordinates'

class FeaturesTilesLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    return offsetPremiersTileCoordinates(context, 0, 8)
  }
}

export const featuresTilesLocator = new FeaturesTilesLocator()
