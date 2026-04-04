import { ActionType } from './ActionType'

export type PlaceGuestAction =
  | {
      type: ActionType.PlaceGuests
      placeOneGuest: false
    }
  | {
      type: ActionType.PlaceGuests
      placeOneGuest: true
      guestIndexPerformingAction: number
      guestIndexToMoveToExitZone?: number
    }
