import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const coordinatesByPlayerNumber: Record<number, Partial<Coordinates>> = {
  2: { x: -22, y: -22.5 },
  3: { x: -55, y: 27.5 },
  4: { x: -45, y: 2 }
}

class TheaterTrophyReserveLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinatesByPlayerNumber[_context.rules.players.length]
  }

  public getGap(_location: Location<PlayerColor, LocationType>, _context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    return _context.rules.players.length == 2 ? { x: 4 } : { y: -7 }
  }
}

export const theaterTrophyReserveLocator = new TheaterTrophyReserveLocator()
