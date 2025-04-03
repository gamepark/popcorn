import { RuleId } from './rules/RuleId'

export enum Memorize {
  IsFirstTurn = 1,
  PlayerActions,
  PlayerDiscardingAwardCards,
  GuestPawnColorToDraw
}

export type PlayerActionMemory = {
  [RuleId.BuyingPhaseRule]: {
    filmBought: boolean
    theaterTileBought: boolean
  }
}

export const defaultPlayerActionMemory: PlayerActionMemory = {
  [RuleId.BuyingPhaseRule]: {
    filmBought: false,
    theaterTileBought: false
  }
}
