import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { getPlayerItemRotateZ, offsetPlayerCinemaBoardCoordinates } from './utils/PlayerItemsUtils'

class PopcornCupLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return { ...offsetPlayerCinemaBoardCoordinates(context, location.player, -16, -11.5), z: 0.1 }
  }

  public getRotateZ(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    return getPlayerItemRotateZ(location, context)
  }
}

export const popcornCupLocator = new PopcornCupLocator()
