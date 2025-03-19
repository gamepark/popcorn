import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { DeckLocator, getRelativePlayerIndex, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'

const coordinates: Record<number, Record<number, XYCoordinates>> = {
  2: {
    0: { x: 18, y: 30 },
    1: { x: -18, y: -30 }
  },
  3: {
    0: { x: 18, y: 30 },
    1: { x: -53, y: -30 },
    2: { x: 17, y: -30 }
  },
  4: {
    0: { x: 53, y: 30 },
    1: { x: -17, y: 30 },
    2: { x: -53, y: -30 },
    3: { x: 17, y: -30 }
  }
}

class PlayerMovieArchiveDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinates[_context.rules.players.length][getRelativePlayerIndex(_context, location.player)]
  }

  public getRotateZ(_location: Location<PlayerColor, LocationType>, _context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    switch (_context.rules.players.length) {
      case 2:
      case 3:
        return getRelativePlayerIndex(_context, _location.player) === 0 ? 0 : 180
      case 4:
        return getRelativePlayerIndex(_context, _location.player) < 2 ? 0 : 180
      default:
        throw new Error('Invalid number of players')
    }
  }
}

export const playerMovieArchiveDeckLocator = new PlayerMovieArchiveDeckLocator()
