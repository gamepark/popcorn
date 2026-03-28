import { CustomMove, ItemMove, PlayerTurnRule, PlayMoveContext, RuleMove } from '@gamepark/rules-api'
import { Actions } from '../material/Actions/Actions'
import { ActionType } from '../material/Actions/ActionType'
import { CustomMoveType } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { isPopcornMoveItemType, isPopcornStartSimultaneousRule, PopcornMove } from '../material/PopcornMoves'
import { Memory } from '../Memory'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { getActionRule } from './utils/getActionRule.util'

export class BuyingPhaseRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private get pendingActions(): Actions[] {
    return this.remind<Actions[]>(Memory.PendingActions, this.player)
  }

  public getPlayerMoves(): PopcornMove[] {
    const pendingActions = this.pendingActions
    if (pendingActions.length === 0) {
      return []
    }
    if (
      pendingActions[0].type !== ActionType.BuyMovieCard &&
      pendingActions[0].type !== ActionType.BuyTheaterTile &&
      pendingActions[0].type !== ActionType.UseAdvertisingToken
    ) {
      const subRule = getActionRule(pendingActions[0], this)
      return subRule.getActivePlayerLegalMoves(this.player)
    }
    const availableMoves: PopcornMove[] = [
      this.isLastPlayer
        ? this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.ShowingsPhaseRule)
        : this.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, this.nextPlayer)
    ]
    const buyMovieCardPendingAction = this.pendingActions.find((pendingAction) => pendingAction.type === ActionType.BuyMovieCard)
    if (buyMovieCardPendingAction !== undefined) {
      const subRule = getActionRule(buyMovieCardPendingAction, this)
      availableMoves.push(...subRule.getActivePlayerLegalMoves(this.player))
    }
    const buyTheaterTilePendingAction = this.pendingActions.find((pendingAction) => pendingAction.type === ActionType.BuyTheaterTile)
    if (buyTheaterTilePendingAction !== undefined) {
      const subRule = getActionRule(buyTheaterTilePendingAction, this)
      availableMoves.push(...subRule.getActivePlayerLegalMoves(this.player))
    }
    const useAdvertisingTokenPendingAction = this.pendingActions.find((pendingAction) => pendingAction.type === ActionType.UseAdvertisingToken)
    if (useAdvertisingTokenPendingAction !== undefined) {
      const subRule = getActionRule(useAdvertisingTokenPendingAction, this)
      availableMoves.push(...subRule.getActivePlayerLegalMoves(this.player))
    }
    return availableMoves
  }

  public onCustomMove(move: CustomMove<CustomMoveType>, context?: PlayMoveContext): PopcornMove[] {
    const subRules = this.pendingActions.map((pendingAction) => getActionRule(pendingAction, this))
    const consequences = subRules.flatMap((rule) => rule.onCustomMove(move, context))
    if (this.pendingActions.length === 0) {
      consequences.push(
        this.isLastPlayer
          ? this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.ShowingsPhaseRule)
          : this.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, this.nextPlayer)
      )
    }
    return consequences
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, context?: PlayMoveContext): PopcornMove[] {
    if (isPopcornMoveItemType(MaterialType.AwardCards)(move) && move.location.type === LocationType.AwardCardDeckSpot && this.pendingActions.length === 0) {
      return [
        this.isLastPlayer
          ? this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.ShowingsPhaseRule)
          : this.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, this.nextPlayer)
      ]
    }
    const subRules = this.pendingActions.map((pendingAction) => getActionRule(pendingAction, this))
    const consequences = subRules.flatMap((rule) => rule.afterItemMove(move, context))
    if (
      this.pendingActions.length === 0 &&
      (consequences.length > 0 ||
        (isPopcornMoveItemType(MaterialType.GuestPawns)(move) &&
          (move.location.type === LocationType.PlayerGuestPawnsUnderClothBagSpot || move.location.type === LocationType.GuestPawnReserveSpot)))
    ) {
      consequences.push(
        this.isLastPlayer
          ? this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.ShowingsPhaseRule)
          : this.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, this.nextPlayer)
      )
    }
    return consequences
  }

  public beforeItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, context?: PlayMoveContext): PopcornMove[] {
    const subRules = this.pendingActions.map((pendingAction) => getActionRule(pendingAction, this))
    return subRules.flatMap((rule) => rule.beforeItemMove(move, context))
  }

  private get isLastPlayer() {
    const startingPlayerToken = this.material(MaterialType.FirstPlayerMarker).getItem()
    if (startingPlayerToken?.location.player === undefined) {
      return false
    }
    const startingPlayerIndex = this.game.players.indexOf(startingPlayerToken?.location.player)
    if (startingPlayerIndex === -1) {
      return false
    }
    const lastPlayerIndex = (startingPlayerIndex - 1 + this.game.players.length) % this.game.players.length
    const lastPlayer = this.game.players[lastPlayerIndex]
    return this.player === lastPlayer
  }

  public onRuleEnd(move: RuleMove<PlayerColor, RuleId>, _context?: PlayMoveContext): PopcornMove[] {
    if (isPopcornStartSimultaneousRule(move) && move.id === RuleId.ShowingsPhaseRule) {
      this.game.players.forEach((player) => {
        this.memorize<Actions[]>(Memory.PendingActions, [{ type: ActionType.PlaceGuests }], player)
      })
    }
    return super.onRuleEnd(move)
  }
}
