import { getEnumValues } from '@gamepark/rules-api'

export enum PopcornToken {
  Token1 = 1,
  Token3 = 3,
  Token5 = 5
}

export const popcornTokens = getEnumValues(PopcornToken)
