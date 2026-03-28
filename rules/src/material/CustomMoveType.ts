import { CustomMove, MaterialMove } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from '../rules/RuleId'
import { AwardCard } from './AwardCard'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'
import { isPopcornCustomMoveType } from './PopcornMoves'

export enum CustomMoveType {
  BuyMovieCard = 1,
  BuyTheaterTile,
  MovieAction,
  PassCurrentAction,
  AwardCardPopcorn
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

export type MovieActionCustomMoveData = {
  movieCardIndex: number
  movieActionNumber: 0 | 1 | 2 | 3
}

export type MovieActionCustomMove = Omit<CustomMove, 'data'> & {
  data: MovieActionCustomMoveData
}

export type PassCurrentActionCustomMoveData = {
  player: PlayerColor
}

export type PassCurrentActionCustomMove = Omit<CustomMove, 'data'> & {
  data: PassCurrentActionCustomMoveData
}

export type AwardCardPopcornCustomMoveData = {
  cardId: AwardCard
  player: PlayerColor
  popcorn: number
}

export type AwardCardPopcornCustomMove = Omit<CustomMove, 'data'> & {
  data: AwardCardPopcornCustomMoveData
}

export const isBuyMovieCardCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>): move is BuyMovieCardCustomMove =>
  isPopcornCustomMoveType<BuyMovieCardCustomMoveData>(CustomMoveType.BuyMovieCard)(move)

export const isBuyTheaterTileCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>): move is BuyTheaterTileCustomMove =>
  isPopcornCustomMoveType<BuyTheaterTileCustomMoveData>(CustomMoveType.BuyTheaterTile)(move)

export const isMovieActionCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>): move is MovieActionCustomMove =>
  isPopcornCustomMoveType<MovieActionCustomMoveData>(CustomMoveType.MovieAction)(move)

export const isPassCurrentActionCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>): move is PassCurrentActionCustomMove =>
  isPopcornCustomMoveType<PassCurrentActionCustomMoveData>(CustomMoveType.PassCurrentAction)(move)

export const isAwardCardPopcornCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>): move is AwardCardPopcornCustomMove =>
  isPopcornCustomMoveType<AwardCardPopcornCustomMoveData>(CustomMoveType.AwardCardPopcorn)(move)
