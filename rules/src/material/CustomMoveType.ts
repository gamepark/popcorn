import { isCustomMoveType, MaterialMove, MoveItem, MoveKind } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'

export enum CustomMoveType {
  BuyMovieCard = 1,
  PassBuyingPhase
}

export type BuyMovieCardCustomMoveData = {
  previousMovieIndex?: number
  move: MoveItem<PlayerColor, MaterialType, LocationType>
}

export type BuyMovieCardCustomMove = {
  kind: typeof MoveKind.CustomMove
  type: typeof CustomMoveType.BuyMovieCard
  data: BuyMovieCardCustomMoveData
}

export type PassBuyingPhaseCustomMove = {
  kind: typeof MoveKind.CustomMove
  type: typeof CustomMoveType.PassBuyingPhase
}

export const isBuyMovieCardCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is BuyMovieCardCustomMove =>
  isCustomMoveType<CustomMoveType>(CustomMoveType.BuyMovieCard)(move)

export const isPassBuyingPhaseCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is PassBuyingPhaseCustomMove =>
  isCustomMoveType<CustomMoveType>(CustomMoveType.PassBuyingPhase)(move)
