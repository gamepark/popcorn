import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { BuyingPhaseBuyingFilm } from './BuyingPhaseBuyingFilm'

export class BuyingPhaseRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  private subRules = [new BuyingPhaseBuyingFilm(this.game)]

  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = this.subRules.flatMap((rule) => rule.getPlayerMoves())
    return moves
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
