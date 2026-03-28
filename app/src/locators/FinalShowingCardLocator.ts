import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { Locator } from '@gamepark/react-game'

class FinalShowingCardLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  coordinates = { x: -12.5, y: -12.5 }
}

export const finalShowingCardLocator = new FinalShowingCardLocator()
