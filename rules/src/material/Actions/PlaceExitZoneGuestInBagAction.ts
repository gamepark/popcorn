import { ActionType } from './ActionType'

export type PlaceExitZoneGuestInBagAction = {
  type: ActionType.PlaceExitZoneGuestInBag
  guestIndexToMoveToExitZone?: number
}
