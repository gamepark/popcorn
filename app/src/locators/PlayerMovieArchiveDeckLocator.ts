import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { DeckLocator, getRelativePlayerIndex, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'
import { getPlayerItemRotateZ } from './utils/PlayerItemsUtils'

const coordinates: Record<number, Record<number, XYCoordinates>> = {
  2: {
    0: { x: 18, y: 30 },
    1: { x: -18, y: -30 }
  },
  3: {
    0: { x: 18, y: 30 },
    1: { x: -49, y: -30 },
    2: { x: 11, y: -30 }
  },
  4: {
    0: { x: 49, y: 30 },
    1: { x: -11, y: 30 },
    2: { x: -49, y: -30 },
    3: { x: 11, y: -30 }
  }
}

class PlayerMovieArchiveDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinates[_context.rules.players.length][getRelativePlayerIndex(_context, location.player)]
  }

  public getRotateZ(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    return getPlayerItemRotateZ(location, context)
  }
}

export const playerMovieArchiveDeckLocator = new PlayerMovieArchiveDeckLocator()
