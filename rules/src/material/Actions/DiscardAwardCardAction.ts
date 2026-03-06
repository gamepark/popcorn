import { ActionType } from './ActionType'

export type DiscardAwardCardAction = {
  type: ActionType.DiscardAwardCard
  guestIndexToMove?: number
}
