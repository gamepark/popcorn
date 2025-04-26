import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'

const coordinates: Record<number, Record<number, XYCoordinates>> = {
  2: {
    0: { x: 10, y: 14 },
    1: { x: -10, y: -14 }
  },
  3: {
    0: { x: 10, y: 14 },
    1: { x: 5, y: -14 },
    2: { x: -45, y: -14 }
  },
  4: {
    0: { x: 45, y: 14 },
    1: { x: -5, y: 14 },
    2: { x: -45, y: -14 },
    3: { x: 5, y: -14 }
  }
}

class PlayerTheaterToprhyLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinates[context.rules.players.length][getRelativePlayerIndex(context, location.player)]
  }
}

export const playerTheaterToprhyLocator = new PlayerTheaterToprhyLocator()
