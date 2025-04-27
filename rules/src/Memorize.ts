import { BuyMovieCardCustomMoveData } from './material/CustomMoveType'
import { RuleId } from './rules/RuleId'
import { SeatActionSubRules } from './rules/ShowingsPhaseSubRules'

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
    currentTheaterTileIndex: number | undefined
    seatActionSubRule: SeatActionSubRules | undefined
  }
}

export const defaultPlayerActionMemory: PlayerActionMemory = {
  [RuleId.BuyingPhaseRule]: {
    filmBought: false,
    theaterTileBought: false
  },
  [RuleId.ShowingsPhaseRule]: {
    guestPlaced: false,
    theaterTilesActivated: [false, false, false],
    currentTheaterTileIndex: undefined,
    seatActionSubRule: undefined
  }
}
