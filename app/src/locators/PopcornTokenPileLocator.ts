import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class PopcornTokenPileLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  limit = 30
  coordinates = { x: -35, y: 4 }
  radius = { x: 4, y: 2 }

  public getPileId(item: MaterialItem<PlayerColor, LocationType>, _context: ItemContext<PlayerColor, MaterialType, LocationType>): string {
    return `${item.id}`
  }
}

export const popcornTokenPileLocator = new PopcornTokenPileLocator()
