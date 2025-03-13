import { getEnumValues } from '@gamepark/rules-api'

export enum PlayerColor {
  Cyan = 1,
  Green,
  Orange,
  Purple
}

export const playerColors = getEnumValues(PlayerColor)
