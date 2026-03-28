import { MaterialRulesPart } from '@gamepark/rules-api'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { BuyMovieCardActionRule } from '../actions/BuyMovieCardActionRule'
import { BuyTheaterTileActionRule } from '../actions/BuyTheaterTileActionRule'
import { ChooseMovieActionRule } from '../actions/ChooseMovieActionRule'
import { ChooseSeatActionActionRule } from '../actions/ChooseSeatActionActionRule'
import { DiscardAwardCardActionRule } from '../actions/DiscardAwardCardActionRule'
import { PickGuestFromReserveOrExitZoneActionRule } from '../actions/PickGuestFromReserveOrExitZoneActionRule'
import { PickTheaterTileToActivateActionRule } from '../actions/PickTheaterTileToActivateActionRule'
import { PlaceCinemaGuestInReserveActionRule } from '../actions/PlaceCinemaGuestInReserveActionRule'
import { PlaceExitZoneGuestInBagActionRule } from '../actions/PlaceExitZoneGuestInBagActionRule'
import { PlaceGuestsActionRule } from '../actions/PlaceGuestsActionRule'
import { UseAdvertisingTokenActionRule } from '../actions/UseAdvertisingTokenActionRule'
import { RuleId } from '../RuleId'

export const getActionRule = (action: Actions, rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>) => {
  switch (action.type) {
    case ActionType.BuyMovieCard:
      return new BuyMovieCardActionRule(rule.game, undefined, action)
    case ActionType.BuyTheaterTile:
      return new BuyTheaterTileActionRule(rule.game, undefined, action)
    case ActionType.ChooseMovieAction:
      return new ChooseMovieActionRule(rule.game, undefined, action)
    case ActionType.ChooseSeatAction:
      return new ChooseSeatActionActionRule(rule.game, undefined, action)
    case ActionType.DiscardAwardCard:
      return new DiscardAwardCardActionRule(rule.game, undefined, action)
    case ActionType.PickReserveOrExitZoneGuest:
      return new PickGuestFromReserveOrExitZoneActionRule(rule.game, undefined, action)
    case ActionType.PickTheaterTileToActivate:
      return new PickTheaterTileToActivateActionRule(rule.game, undefined, action)
    case ActionType.PlaceCinemaGuestInReserve:
      return new PlaceCinemaGuestInReserveActionRule(rule.game, undefined, action)
    case ActionType.PlaceExitZoneGuestInBag:
      return new PlaceExitZoneGuestInBagActionRule(rule.game, undefined, action)
    case ActionType.PlaceGuests:
      return new PlaceGuestsActionRule(rule.game, undefined, action)
    case ActionType.UseAdvertisingToken:
      return new UseAdvertisingTokenActionRule(rule.game, undefined, action)
    default:
      throw new Error('Not implemented')
  }
}
