import { BuyMovieCardCustomMoveData } from './material/CustomMoveType'
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
    buyingCardCustomMoveData?: BuyMovieCardCustomMoveData
  }
}

export const defaultPlayerActionMemory: PlayerActionMemory = {
  [RuleId.BuyingPhaseRule]: {
    filmBought: false,
    theaterTileBought: false
  }
}
