import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { Locator } from '@gamepark/react-game'

class PhasesHelpCardLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  coordinates = { x: -32.5, y: -4.5 }

  public getHoverTransform(): string[] {
    return ['translateX(2em)', 'translateZ(0.5em)', 'scale(3)']
  }
}

export const phasesHelpCardLocator = new PhasesHelpCardLocator()
