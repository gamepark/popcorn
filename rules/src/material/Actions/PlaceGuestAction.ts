import { ActionType } from './ActionType'

export type PlaceGuestAction = {
  type: ActionType.PlaceGuests
  placeOneGuest?: true
  guestIndexToMoveToExitZone?: number
}
