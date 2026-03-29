import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { offsetAdvertisingBoardCoordinates } from './utils/offsetLocatorCoordinates'

class ThreeSeatTheaterTilesRowLocator extends ListLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  gap = { y: 4.5 }

  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    return offsetAdvertisingBoardCoordinates(context, 17.6, -2)
  }
}

export const threeSeatTheaterTilesRowLocator = new ThreeSeatTheaterTilesRowLocator()
