import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { GamePhase } from '../../GamePhase'
import { DiscardAwardCardAction } from '../../material/Actions/DiscardAwardCardAction'
import { AwardCard } from '../../material/AwardCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'

export class DiscardAwardCardActionRule extends ActionRule<DiscardAwardCardAction> {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (this.game.rule?.players !== undefined) {
      const awardCardDeck = this.material(MaterialType.AwardCards).location(LocationType.AwardCardDeckSpot).deck()
      return this.game.rule.players.flatMap((player) =>
        awardCardDeck.dealAtOnce(
          {
            type: LocationType.PlayerAwardCardHand,
            player: player
          },
          2
        )
      )
    }
    return super.onRuleStart(_move, _previousRule, _context)
  }
  public consequencesBeforeRuleForPlayer(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return this.material(MaterialType.AwardCards)
      .location(LocationType.PlayerAwardCardHand)
      .player(player)
      .sort((item) => -((item.location.x ?? 0) + 1))
      .limit(2)
      .moveItems({
        type: LocationType.AwardCardDeckSpot,
        x: 0
      })
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.AwardCards)(move) &&
      move.location.type === LocationType.AwardCardDeckSpot &&
      move.location.x === 0
    ) {
      const card = this.material(MaterialType.AwardCards).index(move.itemIndex).getItem<AwardCard>()
      if (card?.location.player === undefined) {
        throw new Error('Unable to find player owning card')
      }
      this.removeCurrentActionForPlayer(card.location.player)
      return this.currentPhase === GamePhase.Setup
        ? [this.endPlayerTurn(card.location.player)]
        : [this.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, card.location.player)]
    }
    return []
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return [this.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, this.game.players[0])]
  }
}
