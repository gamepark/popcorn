import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'

export enum CustomMoveType {
  BuyMovieCard = 1,
  PassBuyingPhase,
  BuyTheaterTile
}

export type BuyMovieCardCustomMoveData = {
  boughtCardIndex: number
  player: PlayerColor
  destinationSpot: 0 | 1 | 2
}

export type BuyMovieCardCustomMove = Omit<CustomMove, 'data'> & {
  data: BuyMovieCardCustomMoveData
}

export type BuyTheaterTileCustomMoveData = {
  boughtTileIndex: number
  player: PlayerColor
  destinationSpot: 0 | 1 | 2
}

export type BuyTheaterTileCustomMove = Omit<CustomMove, 'data'> & {
  data: BuyTheaterTileCustomMoveData
}

export type PassBuyingPhaseCustomMove = Omit<CustomMove, 'data'>

export const isBuyMovieCardCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is BuyMovieCardCustomMove =>
  isCustomMoveType<CustomMoveType>(CustomMoveType.BuyMovieCard)(move)

export const isPassBuyingPhaseCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is PassBuyingPhaseCustomMove =>
  isCustomMoveType<CustomMoveType>(CustomMoveType.PassBuyingPhase)(move)

export const isBuyTheaterTileCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is BuyTheaterTileCustomMove =>
  isCustomMoveType<CustomMoveType>(CustomMoveType.BuyTheaterTile)(move)
