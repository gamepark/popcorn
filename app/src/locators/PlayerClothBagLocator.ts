import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { getPlayerItemRotateZ, offsetPlayerCinemaBoardCoordinates } from './utils/PlayerItemsUtils'

class PlayerClothBagLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return offsetPlayerCinemaBoardCoordinates(_context, _location.player, -16, 4)
  }

  public getRotateZ(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    return getPlayerItemRotateZ(location, context)
  }
}

export const playerClothBagLocator = new PlayerClothBagLocator()
