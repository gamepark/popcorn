import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { offsetPremiersTileCoordinates } from './utils/PlayerItemsUtils.ts'

class FeatureMovieCardsRowLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  gap = { x: 7.5 }

  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return offsetPremiersTileCoordinates(_context, 7, 8)
  }
}

export const featureMovieCardsRowLocator = new FeatureMovieCardsRowLocator()
