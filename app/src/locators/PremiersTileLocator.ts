import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { Locator } from '@gamepark/react-game'

class PremiersTileLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  coordinates = { x: 5, y: -12.5 }
}

export const premiersTileLocator = new PremiersTileLocator()
