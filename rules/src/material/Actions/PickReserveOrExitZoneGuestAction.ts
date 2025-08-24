import { BuyMovieCardCustomMoveData } from '../CustomMoveType'
import { GuestPawn } from '../GuestPawn'
import { ActionType } from './ActionType'

export type PickReserveOrExitZoneGuestAction = {
  type: ActionType.PickReserveOrExitZoneGuest
  guest: GuestPawn | undefined
  boughtCardData?: BuyMovieCardCustomMoveData
}
