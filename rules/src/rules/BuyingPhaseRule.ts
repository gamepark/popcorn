import { CustomMove, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { isEmpty } from 'lodash'
import { CustomMoveType, isPassBuyingPhaseCustomMove } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { defaultPlayerActionMemory, Memorize, PlayerActionMemory } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { BuyingPhaseBuyingFilmRule } from './BuyingPhaseBuyingFilmRule'
import { BuyingPhaseBuyingTheaterRule } from './BuyingPhaseBuyingTheaterRule'
import { BuyingPhaseUseAdvertisingTokenRule } from './BuyingPhaseUseAdvertisingTokenRule'
import { RuleId } from './RuleId'
import { addNextRuleMoveToConsequenceIfNecessary } from './utils/BuyingFilmConsequencesHelper'

export class BuyingPhaseRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  private get subRules() {
    return this.remind<boolean>(Memorize.IsFirstTurn)
      ? [new BuyingPhaseBuyingFilmRule(this.game)]
      : [new BuyingPhaseBuyingFilmRule(this.game), new BuyingPhaseBuyingTheaterRule(this.game), new BuyingPhaseUseAdvertisingTokenRule(this.game)]
  }

  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    this.memorize<RuleId.BuyingPhaseRule | RuleId.ShowingsPhaseRule>(Memorize.CurrentPhase, RuleId.BuyingPhaseRule)
    addNextRuleMoveToConsequenceIfNecessary(this, this.player, consequences)
    return consequences
  }

  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const playerMoves = this.subRules.flatMap((rule) => rule.getPlayerMoves())
    if (!isEmpty(playerMoves)) {
      playerMoves.push(this.customMove<CustomMoveType>(CustomMoveType.PassBuyingPhase))
    }
    return playerMoves
  }

  public onCustomMove(move: CustomMove, context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isPassBuyingPhaseCustomMove(move)) {
      this.memorize<PlayerActionMemory>(Memorize.PlayerActions, defaultPlayerActionMemory, this.player)
      if (this.nextPlayer === this.game.players[0]) {
        this.memorize<boolean>(Memorize.IsFirstTurn, (_) => false)
        return [this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.ShowingsPhaseRule)]
      }
      return [this.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, this.nextPlayer)]
    }
    return this.subRules.flatMap((rule) => rule.onCustomMove(move, context))
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.subRules.flatMap((rule) => rule.beforeItemMove(move, context))
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.subRules.flatMap((rule) => rule.afterItemMove(move, context))
  }
}
