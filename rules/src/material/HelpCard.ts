import { getEnumValues } from '@gamepark/rules-api'

export enum HelpCard {
  PhaseHelp = 1,
  ActionsHelp
}

export const helpCards = getEnumValues(HelpCard)
