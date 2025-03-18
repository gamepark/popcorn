import { getEnumValues } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'

/* eslint "@typescript-eslint/prefer-literal-enum-member": "off" */
export enum LobbySlider {
  Cyan1 = 1 | (PlayerColor.Cyan << 2),
  Cyan2 = 2 | (PlayerColor.Cyan << 2),
  Cyan3 = 3 | (PlayerColor.Cyan << 2),
  Green1 = 1 | (PlayerColor.Green << 2),
  Green2 = 2 | (PlayerColor.Green << 2),
  Green3 = 3 | (PlayerColor.Green << 2),
  Orange1 = 1 | (PlayerColor.Orange << 2),
  Orange2 = 2 | (PlayerColor.Orange << 2),
  Orange3 = 3 | (PlayerColor.Orange << 2),
  Purple1 = 3 | (PlayerColor.Purple << 2),
  Purple2 = 3 | (PlayerColor.Purple << 2),
  Purple3 = 3 | (PlayerColor.Purple << 2)
}

export const getSliderColor = (id: LobbySlider): PlayerColor => (id >> 2) & 3

export const lobbySliders = getEnumValues(LobbySlider)
