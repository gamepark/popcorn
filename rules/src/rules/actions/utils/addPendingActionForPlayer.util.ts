import { MaterialRulesPart } from '@gamepark/rules-api'
import { Actions } from '../../../material/Actions/Actions'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Memory } from '../../../Memory'
import { PlayerColor } from '../../../PlayerColor'
import { RuleId } from '../../RuleId'

export const addPendingActionForPlayer = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType, RuleId>,
  action: Actions,
  player: PlayerColor
): void => {
  addPendingActionsForPlayer(rule, [action], player, true)
}

export const addPendingActionsForPlayer = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType, RuleId>,
  actions: Actions[],
  player: PlayerColor,
  before?: boolean
): void => {
  rule.memorize<Actions[]>(Memory.PendingActions, (pendingActions) => (before ? actions.concat(pendingActions) : pendingActions.concat(actions)), player)
}
