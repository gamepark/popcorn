import { MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { PopcornRules } from '../../PopcornRules'

export const isFirstTurn = (rule?: MaterialRulesPart<PlayerColor, MaterialType, LocationType> | PopcornRules): boolean =>
  rule?.material(MaterialType.MovieCards).location(LocationType.MovieCardDeckSpot).length === 38
