import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const coordinatesByPlayerNumber: Record<number, Partial<Coordinates>> = {
  2: { x: -40, y: 17.5 },
  3: { x: -38, y: 25 },
  4: { x: 15, y: 0 }
}

class AdvertisingBoardLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinatesByPlayerNumber[_context.rules.players.length]
  }
}

export const advertisingBoardLocator = new AdvertisingBoardLocator()
