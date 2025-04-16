import { BuyMovieCardCustomMoveData } from './material/CustomMoveType'
import { RuleId } from './rules/RuleId'

export enum Memorize {
  IsFirstTurn = 1,
  PlayerActions,
  PlayerDiscardingAwardCards,
  GuestPawnColorToDraw,
  CurrentPhase
}

export type PlayerActionMemory = {
  [RuleId.BuyingPhaseRule]: {
    filmBought: boolean
    theaterTileBought: boolean
    buyingCardCustomMoveData?: BuyMovieCardCustomMoveData
  }
  [RuleId.ShowingsPhaseRule]: {
    guestPlaced: boolean
    theaterTilesActivated: boolean[]
  }
}

export const defaultPlayerActionMemory: PlayerActionMemory = {
  [RuleId.BuyingPhaseRule]: {
    filmBought: false,
    theaterTileBought: false
  },
  [RuleId.ShowingsPhaseRule]: {
    guestPlaced: false,
    theaterTilesActivated: [false, false, false]
  }
}
