import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { Locator } from '@gamepark/react-game'

class ActionsHelpCardLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  coordinates = { x: 39, y: 7 }

  public getHoverTransform(): string[] {
    return ['translateX(-4.5em)', 'translateZ(0.5em)', 'scale(3)']
  }
}

export const actionsHelpCardLocator = new ActionsHelpCardLocator()
