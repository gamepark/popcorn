import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const coordinatesByPlayerNumber: Record<number, Partial<Coordinates>> = {
  2: { x: -40, y: -13.5 },
  3: { x: -55, y: 2.5 },
  4: { x: -52.5, y: 0 }
}

class FinalShowingCardLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinatesByPlayerNumber[_context.rules.players.length]
  }
}

export const finalShowingCardLocator = new FinalShowingCardLocator()
