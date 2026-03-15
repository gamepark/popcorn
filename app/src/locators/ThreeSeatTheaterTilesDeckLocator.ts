import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { TheaterTileDeckLocationDescription } from './TheaterTileDeckLocationDescription.ts'
import { offsetAdvertisingBoardCoordinates } from './utils/offsetLocatorCoordinates.ts'

class ThreeSeatTheaterTilesDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  locationDescription = new TheaterTileDeckLocationDescription()

  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return offsetAdvertisingBoardCoordinates(context, 17.6, -7.5)
  }
}

export const threeSeatTheaterTilesDeckLocator = new ThreeSeatTheaterTilesDeckLocator()
