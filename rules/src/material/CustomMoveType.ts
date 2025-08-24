import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'

export enum CustomMoveType {
  BuyMovieCard = 1,
  BuyTheaterTile,
  MovieAction,
  PassCurrentAction
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

export type MovieActionCustomeMoveData = {
  player: PlayerColor
  movieCardIndex: number
  movieActionNumber: 0 | 1 | 2 | 3
}

export type MovieActionCustomMove = Omit<CustomMove, 'data'> & {
  data: MovieActionCustomeMoveData
}

export type PassCurrentActionCustomeMoveData = {
  player: PlayerColor
}

export type PassCurrentActionCustomMove = Omit<CustomMove, 'data'> & {
  data: PassCurrentActionCustomeMoveData
}

export const isBuyMovieCardCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is BuyMovieCardCustomMove =>
  isCustomMoveType<CustomMoveType, PlayerColor, MaterialType, LocationType>(CustomMoveType.BuyMovieCard)(move)

export const isBuyTheaterTileCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is BuyTheaterTileCustomMove =>
  isCustomMoveType<CustomMoveType, PlayerColor, MaterialType, LocationType>(CustomMoveType.BuyTheaterTile)(move)

export const isMovieActionCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is MovieActionCustomMove =>
  isCustomMoveType<CustomMoveType, PlayerColor, MaterialType, LocationType>(CustomMoveType.MovieAction)(move)

export const isPassCurrentActionCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is PassCurrentActionCustomMove =>
  isCustomMoveType<CustomMoveType, PlayerColor, MaterialType, LocationType>(CustomMoveType.PassCurrentAction)(move)
