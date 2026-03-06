import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { offsetAdvertisingBoardCoordinates } from './utils/offsetLocatorCoordinates.ts'

class TwoSeatTheaterTilesDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return offsetAdvertisingBoardCoordinates(context, 12.8, -7.5)
  }
}

export const twoSeatTheaterTilesDeckLocator = new TwoSeatTheaterTilesDeckLocator()
