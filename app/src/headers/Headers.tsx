import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { ComponentType } from 'react'
import { DiscardAwardCardHeader } from './actions/DiscardAwardCardHeader'
import { BuyingPhaseHeader } from './BuyingPhaseHeader'
import { EndOfRoundPhaseNewLineupHeader } from './EndOfRoundPhaseNewLineupHeader'
import { EndOfRoundPhaseTheatricalRunHeader } from './EndOfRoundPhaseTheatricalRunHeader'
import { FinalEndOfRoundPhaseAdvertisingTokenMovesHeader } from './FinalEndOfRoundPhaseAdvertisingTokenMovesHeader'
import { ShowingsPhaseHeader } from './ShowingsPhaseHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DealAndDiscardAwardCards]: DiscardAwardCardHeader,
  [RuleId.BuyingPhaseRule]: BuyingPhaseHeader,
  [RuleId.ShowingsPhaseRule]: ShowingsPhaseHeader,
  [RuleId.EndOfRoundPhaseTheatricalRunRule]: EndOfRoundPhaseTheatricalRunHeader,
  [RuleId.EndOfRoundPhaseNewLineUpRule]: EndOfRoundPhaseNewLineupHeader,
  [RuleId.FinalEndOfRoundPhaseAdvertisingTokenMovesRule]: FinalEndOfRoundPhaseAdvertisingTokenMovesHeader
}
