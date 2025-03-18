import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'

const boardCoordinates: Record<number, Record<number, XYCoordinates>> = {
  2: {
    0: { x: 0, y: 26 },
    1: { x: 0, y: -26 }
  },
  3: {
    0: { x: 0, y: 26 },
    1: { x: -35, y: -26 },
    2: { x: 35, y: -26 }
  },
  4: {
    0: { x: 35, y: 26 },
    1: { x: -35, y: 26 },
    2: { x: -35, y: -26 },
    3: { x: 35, y: -26 }
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
    switch (context.rules.players.length) {
      case 2:
      case 3:
        return getRelativePlayerIndex(context, location.player) === 0 ? 0 : 180
      case 4:
        return getRelativePlayerIndex(context, location.player) < 2 ? 0 : 180
      default:
        throw new Error('Invalid player number')
    }
  }
}

export const bottomCinemaBoardLocator = new BottomCinemaBoardLocator()
