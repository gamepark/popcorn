import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'

export enum CustomMoveType {
  BuyMovieCard = 1,
  PassBuyingPhase,
  BuyTheaterTile,
  PassSeatAction
}

export type BuyMovieCardCustomMoveData = {
  boughtCardIndex: number
  player: PlayerColor
  destinationSpot: 0 | 1 | 2
}

export type BuyMovieCardCustomMove = Omit<CustomMove, 'data'> & {
  data: BuyMovieCardCustomMoveData
}

export type PassBuyingPhaseCustomMove = Omit<CustomMove, 'data'>

export type BuyTheaterTileCustomMoveData = {
  boughtTileIndex: number
  player: PlayerColor
  destinationSpot: 0 | 1 | 2
}

export type BuyTheaterTileCustomMove = Omit<CustomMove, 'data'> & {
  data: BuyTheaterTileCustomMoveData
}

export type PassSeatActionCustomMoveData = {
  player: PlayerColor
  guestPawnIndex: number
}

export type PassSeatActionCustomMove = Omit<CustomMove, 'data'> & {
  data: PassSeatActionCustomMoveData
}

export const isBuyMovieCardCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is BuyMovieCardCustomMove =>
  isCustomMoveType<CustomMoveType, PlayerColor, MaterialType, LocationType>(CustomMoveType.BuyMovieCard)(move)

export const isPassBuyingPhaseCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is PassBuyingPhaseCustomMove =>
  isCustomMoveType<CustomMoveType, PlayerColor, MaterialType, LocationType>(CustomMoveType.PassBuyingPhase)(move)

export const isBuyTheaterTileCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is BuyTheaterTileCustomMove =>
  isCustomMoveType<CustomMoveType, PlayerColor, MaterialType, LocationType>(CustomMoveType.BuyTheaterTile)(move)

export const isPassSeatActionCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is PassSeatActionCustomMove =>
  isCustomMoveType<CustomMoveType, PlayerColor, MaterialType, LocationType>(CustomMoveType.PassSeatAction)(move)
