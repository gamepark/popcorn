import { MaterialGameSetup } from '@gamepark/rules-api'
import { PopCornOptions } from './PopCornOptions'
import { PopCornRules } from './PopCornRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class PopCornSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, PopCornOptions> {
  Rules = PopCornRules

  setupMaterial(_options: PopCornOptions) {
    // TODO
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
