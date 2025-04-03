import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'
import { getPlayerItemRotateZ } from './utils/PlayerItemsUtils'

const coordinates: Record<number, Record<number, XYCoordinates>> = {
  2: {
    0: { x: 15, y: 14 },
    1: { x: -15, y: -14 }
  },
  3: {
    0: { x: 15, y: 14 },
    1: { x: 10, y: -14 },
    2: { x: -50, y: -14 }
  },
  4: {
    0: { x: 50, y: 14 },
    1: { x: -10, y: 14 },
    2: { x: -50, y: -14 },
    3: { x: 10, y: -14 }
  }
}

class FirstPlayerTokenLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinates[context.rules.players.length][getRelativePlayerIndex(context, location.player)]
  }

  public getRotateZ(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    return getPlayerItemRotateZ(location, context)
  }
}

export const firstPlayerTokenLocator = new FirstPlayerTokenLocator()
