import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { getRelativePlayerIndex, ItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { getPlayerItemRotateZ } from './utils/PlayerItemsUtils'

const coordinates: Record<number, Record<number, XYCoordinates>> = {
  2: {
    0: { x: -16, y: 20 },
    1: { x: 16, y: -20 }
  },
  3: {
    0: { x: -16, y: 20 },
    1: { x: -9, y: -20 },
    2: { x: 51, y: -20 }
  },
  4: {
    0: { x: 9, y: 20 },
    1: { x: -51, y: 20 },
    2: { x: -9, y: -20 },
    3: { x: 51, y: -20 }
  }
}

class PlayerMoneyPileLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  radius = 2

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinates[context.rules.players.length][getRelativePlayerIndex(context, location.player)]
  }

  public getPileId(item: MaterialItem<PlayerColor, LocationType>, _context: ItemContext<PlayerColor, MaterialType, LocationType>): string {
    return `${item.location.player}-${item.id}`
  }

  public getRotateZ(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    return super.getRotateZ(location, context) + getPlayerItemRotateZ(location, context)
  }
}

export const playerMoneyPileLocator = new PlayerMoneyPileLocator()
