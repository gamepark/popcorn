import { CustomMove, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { BuyingPhaseBuyingFilmRule } from './BuyingPhaseBuyingFilmRule'

export class BuyingPhaseRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  private subRules = [new BuyingPhaseBuyingFilmRule(this.game)]

  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.subRules.flatMap((rule) => rule.getPlayerMoves())
  }

  public onCustomMove(move: CustomMove, context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
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
