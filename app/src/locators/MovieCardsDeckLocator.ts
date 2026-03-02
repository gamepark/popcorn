import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const coordinatesByPlayerNumber: Record<number, Partial<Coordinates>> = {
  2: { x: -30, y: -13.5 },
  3: { x: -45, y: 2.5 },
  4: { x: -25, y: -3 }
}

class MovieCardsDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  limit = 45
  gap = { x: -0.02, y: -0.02 }

  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinatesByPlayerNumber[_context.rules.players.length]
  }
}

export const movieCardsDeckLocator = new MovieCardsDeckLocator()
