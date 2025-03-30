import { RuleId } from '@gamepark/game-template/rules/RuleId'
import { ComponentType } from 'react'
import { DealAndDiscardAwardCardsHeader } from './DealAndDiscardAwardCardsHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DealAndDiscardAwardCards]: DealAndDiscardAwardCardsHeader
}
