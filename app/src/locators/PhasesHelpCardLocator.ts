import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { Locator } from '@gamepark/react-game'

class PhasesHelpCardLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: -22.5, y: -12.5 }

  public getHoverTransform(): string[] {
    return ['translateY(5.5em)', 'translateZ(0.5em)', 'scale(3)']
  }
}

export const phasesHelpCardLocator = new PhasesHelpCardLocator()
