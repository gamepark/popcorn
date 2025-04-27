import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class MoneyTokenPileLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  limit = 20
  coordinates = { x: -35, y: -4 }
  radius = { x: 4, y: 2 }

  public getPileId(item: MaterialItem<PlayerColor, LocationType>, _context: ItemContext<PlayerColor, MaterialType, LocationType>): string {
    return `${item.id}`
  }
}

export const moneyPileLocator = new MoneyTokenPileLocator()
