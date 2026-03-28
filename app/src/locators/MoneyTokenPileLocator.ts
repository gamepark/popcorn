import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class MoneyTokenPileLocator extends PileLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  limit = 20
  coordinates = { x: -22.5, y: -3 }
  radius = { x: 4, y: 2 }

  public getPileId(item: MaterialItem<PlayerColor, LocationType>): string {
    return `${item.id}`
  }
}

export const moneyPileLocator = new MoneyTokenPileLocator()
