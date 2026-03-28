import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { ItemContext, Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed.ts'

class BottomCinemaBoardLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  coordinates = { x: 14, y: 15 }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

export const bottomCinemaBoardLocator = new BottomCinemaBoardLocator()
