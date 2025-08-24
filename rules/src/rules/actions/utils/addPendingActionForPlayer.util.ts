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
  rule.memorize<Actions[]>(
    Memory.PendingActions,
    (pendingActions) => {
      pendingActions.unshift(action)
      return pendingActions
    },
    player
  )
}
