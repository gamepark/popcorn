import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { ComponentType } from 'react'
import { DiscardAwardCardHeader } from './actions/DiscardAwardCardHeader.tsx'
import { BuyingPhaseHeader } from './BuyingPhaseHeader'
import { FinalEndOfRoundPhaseAdvertisingTokenMovesHeader } from './FinalEndOfRoundPhaseAdvertisingTokenMovesHeader.tsx'
import { ShowingsPhaseHeader } from './ShowingsPhaseHeader.tsx'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DealAndDiscardAwardCards]: DiscardAwardCardHeader,
  [RuleId.BuyingPhaseRule]: BuyingPhaseHeader,
  [RuleId.ShowingsPhaseRule]: ShowingsPhaseHeader,
  [RuleId.FinalEndOfRoundPhaseAdvertisingTokenMovesRule]: FinalEndOfRoundPhaseAdvertisingTokenMovesHeader
}
