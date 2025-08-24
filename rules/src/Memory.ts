import { BuyMovieCardCustomMoveData } from './material/CustomMoveType'
import { GuestPawn } from './material/GuestPawn'
import { MovieCard } from './material/MovieCard'
import { PlayerColor } from './PlayerColor'
import { PickGuestFromReserveOrExitZoneActionRule } from './rules/actions/PickGuestFromReserveOrExitZoneActionRule'
import { PlaceCinemaGuestInReserveActionRule } from './rules/actions/PlaceCinemaGuestInReserveActionRule'
import { RuleId } from './rules/RuleId'

export enum Memory {
  PlayerActions = 1,
  GuestPawnColorToDraw,
  CurrentPhase,
  AvailableMovieActions,
  PendingActions
}

export type PendingActions = {
  player: PlayerColor
} & (
  | {
      rule: PickGuestFromReserveOrExitZoneActionRule
      guestColor: GuestPawn
    }
  | {
      rule: PlaceCinemaGuestInReserveActionRule
    }
)

export type PlayerActionMemory = {
  [RuleId.BuyingPhaseRule]: {
    filmBought: boolean
    theaterTileBought: boolean
    buyingCardCustomMoveData?: BuyMovieCardCustomMoveData
  }
}

export type AvailableMovieActionsMemory = Partial<Record<MovieCard, boolean[]>>

export const defaultPlayerActionMemory: PlayerActionMemory = {
  [RuleId.BuyingPhaseRule]: {
    filmBought: false,
    theaterTileBought: false
  }
}
