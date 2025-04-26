import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'
import { getPlayerItemRotateZ } from './utils/PlayerItemsUtils'

const boardCoordinates: Record<number, Record<number, XYCoordinates>> = {
  2: {
    0: { x: 0, y: 26 },
    1: { x: 0, y: -26 }
  },
  3: {
    0: { x: 0, y: 26 },
    1: { x: -30, y: -26 },
    2: { x: 30, y: -26 }
  },
  4: {
    0: { x: 30, y: 26 },
    1: { x: -30, y: 26 },
    2: { x: -30, y: -26 },
    3: { x: 30, y: -26 }
  }
}

class BottomCinemaBoardLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return boardCoordinates[context.rules.players.length][getRelativePlayerIndex(context, location.player)]
  }

  public getRotateZ(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    return getPlayerItemRotateZ(location, context)
  }
}

export const bottomCinemaBoardLocator = new BottomCinemaBoardLocator()
