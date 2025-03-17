import { FillGapStrategy, hideItemId, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { TheFirstStepRule } from './rules/TheFirstStepRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class PopCornRules
  extends SecretMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
  rules = {
    [RuleId.TheFirstStep]: TheFirstStepRule
  }

  hidingStrategies = {
    [MaterialType.MovieCards]: {
      [LocationType.MovieCardDeckSpot]: hideItemId
    },
    [MaterialType.AwardCards]: {
      [LocationType.AwardCardDeckSpot]: hideItemId
    }
  }

  locationsStrategies = {
    [MaterialType.MovieCards]: {
      [LocationType.MovieCardDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.FeaturesRowSpot]: new FillGapStrategy(),
      [LocationType.PremiersRowSpot]: new FillGapStrategy()
    },
    [MaterialType.AwardCards]: {
      [LocationType.AwardCardDeckSpot]: new PositiveSequenceStrategy()
    }
  }

  giveTime(): number {
    return 60
  }
}
