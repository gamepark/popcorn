import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

const coordinatesByPlayerNumber: Record<number, Partial<Coordinates>> = {
  2: { x: -30, y: -22.5 },
  3: { x: -48, y: 20 },
  4: { x: -35, y: 4 }
}

class PopcornTokenPileLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  limit = 30
  radius = { x: 4, y: 2 }

  public getPileId(item: MaterialItem<PlayerColor, LocationType>): string {
    return `${item.id}`
  }

  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinatesByPlayerNumber[_context.rules.players.length]
  }
}

export const popcornTokenPileLocator = new PopcornTokenPileLocator()
