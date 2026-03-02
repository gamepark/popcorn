import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { offsetPlayerCinemaBoardCoordinates } from './utils/PlayerItemsUtils.ts'

class PlayerAdvertisingTokenPileLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  radius = 2
  limit = 3

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return offsetPlayerCinemaBoardCoordinates(context, location.player, -22, -6)
  }

  public getPositionDependencies(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    return super.getPositionDependencies(location, context)
  }
}

export const playerAdvertisingTokenPileLocator = new PlayerAdvertisingTokenPileLocator()
