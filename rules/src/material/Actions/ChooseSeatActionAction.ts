import { ActionType } from './ActionType'

export type ChooseSeatActionAction = {
  type: ActionType.ChooseSeatAction
  guestIndex: number
}
