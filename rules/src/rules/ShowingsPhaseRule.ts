import { ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memorize, PlayerActionMemory } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { PickPlayerGuestAndPlaceItInReserveRule } from './PickPlayerGuestAndPlaceItInReserveRule'
import { PlaceExitZoneGuestInBagRule } from './PlaceExitZoneGuestInBagRule'
import { RuleId } from './RuleId'
import { ShowingsPhasePlaceGuestsRule } from './ShowingsPhasePlaceGuestsRule'
import { ShowingsPhaseSeatActionRule } from './ShowingsPhaseSeatActionRule'
import { SeatActionSubRules } from './ShowingsPhaseSubRules'

export class ShowingsPhaseRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  private subRules = {
    placeGuests: new ShowingsPhasePlaceGuestsRule(this.game),
    chooseTheater: new ShowingsPhasePlaceGuestsRule(this.game),
    seatActions: new ShowingsPhaseSeatActionRule(this.game),
    placeExitZoneGuestInBag: new PlaceExitZoneGuestInBagRule(this.game),
    placeInReserve: new PickPlayerGuestAndPlaceItInReserveRule(this.game)
  }

  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const subRule = this.getSubRuleFromMemory(player)
    return subRule === undefined ? [] : subRule.getActivePlayerLegalMoves(player)
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return Object.values(this.subRules).flatMap((subRule) => subRule.beforeItemMove(move, context))
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return [this.endGame()]
  }

  private getSubRuleFromMemory(player: PlayerColor): SimultaneousRule<PlayerColor, MaterialType, LocationType> | undefined {
    const ruleActions = this.remind<PlayerActionMemory>(Memorize.PlayerActions, player)[RuleId.ShowingsPhaseRule]
    if (!ruleActions.guestPlaced) {
      return this.subRules.placeGuests
    } else if (ruleActions.theaterTilesActivated.some((v) => !v)) {
      if (ruleActions.seatActionSubRule === undefined && ruleActions.currentTheaterTileIndex === undefined) {
        return this.subRules.chooseTheater
      } else if (ruleActions.currentTheaterTileIndex !== undefined) {
        return this.subRules.seatActions
      }
      switch (ruleActions.seatActionSubRule) {
        case SeatActionSubRules.MovieAction:
          // TODO
          return
        case SeatActionSubRules.MoveGuestFromExitZoneToBag:
          return this.subRules.placeExitZoneGuestInBag
        case SeatActionSubRules.DrawGuestAndPlaceThem:
          return this.subRules.placeGuests
        case SeatActionSubRules.PlaceGuestInReserve:
          return this.subRules.placeInReserve
        case undefined:
          return
      }
    }
    return
  }
}
