import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const coordinatesByPlayerNumber: Record<number, Partial<Coordinates>> = {
  2: { x: -22, y: -13.5 },
  3: { x: -45, y: 10 },
  4: { x: -25, y: 4.5 }
}

class AwardCardDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  gap = { x: -0.02, y: -0.02 }

  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinatesByPlayerNumber[_context.rules.players.length]
  }

  public getRotateZ(_location: Location<PlayerColor, LocationType>, _context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    return _context.rules.players.length !== 2 ? 0 : 90
  }
}

export const awardCardDeckLocator = new AwardCardDeckLocator()
