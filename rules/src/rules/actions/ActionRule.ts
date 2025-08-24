import { MaterialGame, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { GamePhase } from '../../GamePhase'
import { Actions } from '../../material/Actions/Actions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export abstract class ActionRule<T extends Actions> extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  protected action: T

  constructor(game: MaterialGame<PlayerColor, MaterialType, LocationType>, action?: T) {
    super(game)
    if (this.game.rule?.players !== undefined) {
      this.action = action ?? (this.remind<Actions[]>(Memory.PendingActions, this.game.rule.players[0])[0] as T)
    } else {
      this.action = action ?? (this.remind<Actions[]>(Memory.PendingActions, this.game.players[0])[0] as T)
    }
  }

  public abstract consequencesBeforeRuleForPlayer(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[]

  protected getActionsForPlayer(player: PlayerColor) {
    return this.remind<Actions[]>(Memory.PendingActions, player)
  }

  protected removeCurrentActionForPlayer(player: PlayerColor) {
    this.memorize<Actions[]>(Memory.PendingActions, (actions) => actions.slice(1), player)
  }

  protected get currentPhase(): GamePhase {
    switch (this.game.rule?.id) {
      case RuleId.DealAndDiscardAwardCards:
        return GamePhase.Setup
      case RuleId.BuyingPhaseRule:
        return GamePhase.BuyingPhase
      case RuleId.ShowingsPhaseRule:
        return GamePhase.ShowingsPhase
      default:
        throw new Error('Incorrect rule id')
    }
  }
}
