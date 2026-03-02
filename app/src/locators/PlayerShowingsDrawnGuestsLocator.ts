import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { getRelativePlayerIndex, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { getPlayerItemRotateZ, offsetPlayerCinemaBoardCoordinates } from './utils/PlayerItemsUtils'

class PlayerShowingsDrawnGuestsLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  gap = { x: 2, y: 0, z: 0 }
  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return offsetPlayerCinemaBoardCoordinates(_context, _location.player, -10, -13)
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
