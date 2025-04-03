import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { getPlayerItemRotateZ } from './utils/PlayerItemsUtils'

const coordinates: Record<number, Record<number, Coordinates>> = {
  2: {
    0: { x: -12.5, y: 30, z: 0.1 },
    1: { x: 12.5, y: -30, z: 0.1 }
  },
  3: {
    0: { x: -12.5, y: 30, z: 0.1 },
    1: { x: -13, y: -30, z: 0.1 },
    2: { x: 52, y: -30, z: 0.1 }
  },
  4: {
    0: { x: 13, y: 30, z: 0.1 },
    1: { x: -47, y: 30, z: 0.1 },
    2: { x: -13, y: -30, z: 0.1 },
    3: { x: 47, y: -30, z: 0.1 }
  }
}

class PlayerClothBagLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinates[_context.rules.players.length][getRelativePlayerIndex(_context, _location.player)]
  }

  public getRotateZ(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    return getPlayerItemRotateZ(location, context)
  }
}

export const playerClothBagLocator = new PlayerClothBagLocator()
