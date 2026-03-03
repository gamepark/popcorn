import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class PopcornTokenPileLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  limit = 30
  radius = { x: 4, y: 2 }
  coordinates = { x: -12.5, y: -3 }

  public getPileId(item: MaterialItem<PlayerColor, LocationType>): string {
    return `${item.id}`
  }
}

export const popcornTokenPileLocator = new PopcornTokenPileLocator()
