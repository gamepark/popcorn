import { RuleId } from '@gamepark/game-template/rules/RuleId'
import { ComponentType } from 'react'
import { BuyingPhaseHeader } from './BuyingPhaseHeader'
import { DealAndDiscardAwardCardsHeader } from './DealAndDiscardAwardCardsHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DealAndDiscardAwardCards]: DealAndDiscardAwardCardsHeader,
  [RuleId.BuyingPhaseRule]: BuyingPhaseHeader
}
