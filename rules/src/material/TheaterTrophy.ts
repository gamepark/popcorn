import { getEnumValues } from '@gamepark/rules-api'

export enum TheaterTrophy {
  TrophyFirst = 5,
  TrophySecond = 3
}

export const theaterTrophy = getEnumValues(TheaterTrophy)
