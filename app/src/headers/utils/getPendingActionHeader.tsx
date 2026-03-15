import { Actions } from '@gamepark/popcorn/material/Actions/Actions.ts'
import { ActionType } from '@gamepark/popcorn/material/Actions/ActionType.ts'
import { ChooseMovieActionHeader } from '../actions/ChooseMovieActionHeader.tsx'
import { ChooseSeatActionHeader } from '../actions/ChooseSeatActionHeader.tsx'
import { DiscardAwardCardHeader } from '../actions/DiscardAwardCardHeader.tsx'
import { PickReserveOrExitZoneGuestHeader } from '../actions/PickReserveOrExitZoneGuestHeader.tsx'
import { PickTheaterTileToActivateHeader } from '../actions/PickTheaterTileToActivateHeader.tsx'
import { PlaceCinemaGuestInReserveHeader } from '../actions/PlaceCinemaGuestInReserveHeader.tsx'
import { PlaceExitZoneGuestInBagHeader } from '../actions/PlaceExitZoneGuestInBagHeader.tsx'
import { PlaceGuestsHeader } from '../actions/PlaceGuestsHeader.tsx'

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
