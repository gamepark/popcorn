import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { offsetAdvertisingBoardCoordinates } from './utils/offsetLocatorCoordinates.ts'

class TwoSeatTheaterTilesRowLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  gap = { y: 4.5 }

  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return offsetAdvertisingBoardCoordinates(context, 12.8, -2)
  }
}

export const twoSeatTheaterTilesRowLocator = new TwoSeatTheaterTilesRowLocator()
