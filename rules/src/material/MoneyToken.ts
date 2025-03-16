import { getEnumValues } from '@gamepark/rules-api'

export enum MoneyToken {
  Money1 = 1,
  Money5 = 5
}

export const moneyTokens = getEnumValues(MoneyToken)
