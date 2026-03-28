import { ItemMove, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { GamePhase } from '../../GamePhase'
import { DiscardAwardCardAction } from '../../material/Actions/DiscardAwardCardAction'
import { AwardCard } from '../../material/AwardCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { isPopcornMoveItemType, PopcornMove } from '../../material/PopcornMoves'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'

export class DiscardAwardCardActionRule extends ActionRule<DiscardAwardCardAction> {
  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): PopcornMove[] {
    const awardCardDeck = this.material(MaterialType.AwardCards).location(LocationType.AwardCardDeckSpot).deck()
    return this.game.players.flatMap((player) =>
      awardCardDeck.dealAtOnce(
        {
          type: LocationType.PlayerAwardCardHand,
          player: player
        },
        2
      )
    )
  }
  public consequencesBeforeRuleForPlayer(): PopcornMove[] {
    return []
  }

  public getActivePlayerLegalMoves(player: PlayerColor): PopcornMove[] {
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

  public beforeItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): PopcornMove[] {
    if (isPopcornMoveItemType(MaterialType.AwardCards)(move) && move.location.type === LocationType.AwardCardDeckSpot && move.location.x === 0) {
      const card = this.material(MaterialType.AwardCards).index(move.itemIndex).getItem<AwardCard>()
      if (card?.location.player === undefined) {
        throw new Error('Unable to find player owning card')
      }
      this.removeCurrentActionForPlayer(card.location.player)
      switch (this.currentPhase) {
        case GamePhase.Setup:
          return [this.endPlayerTurn(card.location.player)]
        case GamePhase.ShowingsPhase:
          if (this.action.guestIndexToMoveToExitZone !== undefined) {
            return [
              this.material(MaterialType.GuestPawns).index(this.action.guestIndexToMoveToExitZone).moveItem({
                type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
                player: card.location.player
              })
            ]
          }
          return []
        default:
          return []
      }
    }
    return []
  }

  public getMovesAfterPlayersDone(): PopcornMove[] {
    return [this.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, this.game.players[0])]
  }
}
