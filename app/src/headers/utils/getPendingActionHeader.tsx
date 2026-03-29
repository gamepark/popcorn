import { Actions } from '@gamepark/popcorn/material/Actions/Actions'
import { ActionType } from '@gamepark/popcorn/material/Actions/ActionType'
import { ChooseMovieActionHeader } from '../actions/ChooseMovieActionHeader'
import { ChooseSeatActionHeader } from '../actions/ChooseSeatActionHeader'
import { DiscardAwardCardHeader } from '../actions/DiscardAwardCardHeader'
import { PickReserveOrExitZoneGuestHeader } from '../actions/PickReserveOrExitZoneGuestHeader'
import { PickTheaterTileToActivateHeader } from '../actions/PickTheaterTileToActivateHeader'
import { PlaceCinemaGuestInReserveHeader } from '../actions/PlaceCinemaGuestInReserveHeader'
import { PlaceExitZoneGuestInBagHeader } from '../actions/PlaceExitZoneGuestInBagHeader'
import { PlaceGuestsHeader } from '../actions/PlaceGuestsHeader'

export const getPendingActionHeader = (action: Actions) => {
  switch (action.type) {
    case ActionType.ChooseMovieAction:
      return <ChooseMovieActionHeader />
    case ActionType.ChooseSeatAction:
      return <ChooseSeatActionHeader />
    case ActionType.DiscardAwardCard:
      return <DiscardAwardCardHeader />
    case ActionType.PickReserveOrExitZoneGuest:
      return <PickReserveOrExitZoneGuestHeader action={action} />
    case ActionType.PickTheaterTileToActivate:
      return <PickTheaterTileToActivateHeader />
    case ActionType.PlaceCinemaGuestInReserve:
      return <PlaceCinemaGuestInReserveHeader />
    case ActionType.PlaceExitZoneGuestInBag:
      return <PlaceExitZoneGuestInBagHeader />
    case ActionType.PlaceGuests:
      return <PlaceGuestsHeader />
    default:
      return
  }
}
