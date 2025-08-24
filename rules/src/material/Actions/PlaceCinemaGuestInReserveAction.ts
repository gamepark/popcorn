import { ActionType } from './ActionType'

export type PlaceCinemaGuestInReserveAction = {
  type: ActionType.PlaceCinemaGuestInReserve
  guestIndexToMoveToExitZone?: number
}
