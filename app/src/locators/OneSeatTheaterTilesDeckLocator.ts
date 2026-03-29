import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { TheaterTileDeckLocationDescription } from './TheaterTileDeckLocationDescription'
import { offsetAdvertisingBoardCoordinates } from './utils/offsetLocatorCoordinates'

class OneSeatTheaterTilesDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  locationDescription = new TheaterTileDeckLocationDescription()

  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    return offsetAdvertisingBoardCoordinates(context, 8, -7.5)
  }
}

export const oneSeatTheaterTilesDeckLocator = new OneSeatTheaterTilesDeckLocator()
