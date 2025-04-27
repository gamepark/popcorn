import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { getRelativePlayerIndex, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'
import { getPlayerItemRotateZ } from './utils/PlayerItemsUtils'

const coordinates: Record<number, Record<number, XYCoordinates>> = {
  2: {
    0: { x: -10, y: 13 },
    1: { x: 10, y: -13 }
  },
  3: {
    0: { x: 0, y: 13 },
    1: { x: -20, y: -13 },
    2: { x: 40, y: -13 }
  },
  4: {
    0: { x: 20, y: 13 },
    1: { x: -40, y: 13 },
    2: { x: -20, y: -13 },
    3: { x: 40, y: -13 }
  }
}

class PlayerShowingsDrawnGuestsLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  gap = { x: 2, y: 0, z: 0 }
  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinates[_context.rules.players.length][getRelativePlayerIndex(_context, _location.player)]
  }

  public getRotateZ(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    return getPlayerItemRotateZ(location, context)
  }

  public getGap(_location: Location<PlayerColor, LocationType>, _context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    switch (_context.rules.players.length) {
      case 2:
      case 3:
        return getRelativePlayerIndex(_context, _location.player) === 0 ? { x: 2, y: 0, z: 0 } : { x: -2, y: 0, z: 0 }
      case 4:
        return getRelativePlayerIndex(_context, _location.player) < 2 ? { x: 2, y: 0, z: 0 } : { x: -2, y: 0, z: 0 }
      default:
        throw new Error('Invalid number of players')
    }
  }
}

export const playerShowingsDrawnGuestsLocator = new PlayerShowingsDrawnGuestsLocator()
