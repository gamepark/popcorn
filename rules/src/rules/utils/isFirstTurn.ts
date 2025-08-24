import { MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'

export const isFirstTurn = (rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>): boolean =>
  rule.material(MaterialType.MovieCards).location(LocationType.MovieCardDeckSpot).length === 39
