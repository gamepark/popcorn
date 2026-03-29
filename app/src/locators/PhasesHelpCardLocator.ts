import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { Locator } from '@gamepark/react-game'

class PhasesHelpCardLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  coordinates = { x: -22.5, y: -12.5 }

  public getHoverTransform(): string[] {
    return ['translateY(5.5em)', 'translateZ(0.5em)', 'scale(3)']
  }
}

export const phasesHelpCardLocator = new PhasesHelpCardLocator()
