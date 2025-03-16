import { getEnumValues } from '@gamepark/rules-api'

export enum PopcornToken {
  Token11 = 1,
  Token12,
  Token13,
  Token14,
  Token31,
  Token32,
  Token33,
  Token51,
  Token52,
  Token53
}

export const getPopcornTokenValue = (id: PopcornToken) => {
  switch (id) {
    case PopcornToken.Token11:
    case PopcornToken.Token12:
    case PopcornToken.Token13:
    case PopcornToken.Token14:
      return 1
    case PopcornToken.Token31:
    case PopcornToken.Token32:
    case PopcornToken.Token33:
      return 3
    case PopcornToken.Token51:
    case PopcornToken.Token52:
    case PopcornToken.Token53:
      return 5
  }
}

export const popcornTokens = getEnumValues(PopcornToken)
