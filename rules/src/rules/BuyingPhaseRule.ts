import { CustomMove, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { CustomMoveType, isPassBuyingPhaseCustomMove } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { defaultPlayerActionMemory, Memorize, PlayerActionMemory } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { BuyingPhaseBuyingFilmRule } from './BuyingPhaseBuyingFilmRule'
import { BuyingPhaseUseAdvertisingTokenRule } from './BuyingPhaseUseAdvertisingTokenRule'
import { RuleId } from './RuleId'

export class BuyingPhaseRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  private subRules = [new BuyingPhaseBuyingFilmRule(this.game), new BuyingPhaseUseAdvertisingTokenRule(this.game)]

  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const availableSubRules = this.remind<boolean>(Memorize.IsFirstTurn) ? [this.subRules[0]] : this.subRules
    const playerMoves = availableSubRules.flatMap((rule) => rule.getPlayerMoves())
    playerMoves.push(this.customMove<CustomMoveType>(CustomMoveType.PassBuyingPhase))
    return playerMoves
  }

  public onCustomMove(move: CustomMove, context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isPassBuyingPhaseCustomMove(move)) {
      this.memorize<PlayerActionMemory>(Memorize.PlayerActions, defaultPlayerActionMemory, this.player)
      return this.nextPlayer === this.game.players[0] ? [this.endGame()] : [this.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, this.nextPlayer)]
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
