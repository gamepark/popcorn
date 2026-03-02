import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { offsetPlayerCinemaBoardCoordinates } from './utils/PlayerItemsUtils.ts'

class PlayerTheaterTrophyLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return offsetPlayerCinemaBoardCoordinates(context, location.player, 15, -12)
  }
}

export const playerTheaterTrophyLocator = new PlayerTheaterTrophyLocator()
