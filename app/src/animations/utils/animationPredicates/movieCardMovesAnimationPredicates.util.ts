import { PopcornAnimationPredicate } from '../popcornAnimationTypes.util.ts'
import { and, not, or } from '@gamepark/react-game'
import { isPopcornMoveItemType, isPopcornMoveItemTypeAtOnce } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import {
  isDestinationViewableByDisplayedPlayer,
  isFromPopcornLocation,
  isOriginViewableViewableByDisplayedPlayer,
  isToPopcornLocation
} from './commonAnimationPredicates.util.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'

export const isNotViewableMovieCardMove: PopcornAnimationPredicate = and(
  isPopcornMoveItemType(MaterialType.MovieCards),
  not(isDestinationViewableByDisplayedPlayer),
  not(isOriginViewableViewableByDisplayedPlayer)
)

export const isMovieCardToPlayerPanelMove: PopcornAnimationPredicate = and(
  isPopcornMoveItemType(MaterialType.MovieCards),
  or(isFromPopcornLocation(LocationType.PremiersRowSpot), isFromPopcornLocation(LocationType.FeaturesRowSpot)),
  not(isDestinationViewableByDisplayedPlayer)
)

export const isViewableBuyMovieCardMove = and(
  isPopcornMoveItemType(MaterialType.MovieCards),
  or(isFromPopcornLocation(LocationType.PremiersRowSpot), isFromPopcornLocation(LocationType.FeaturesRowSpot)),
  isToPopcornLocation(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard),
  isDestinationViewableByDisplayedPlayer
)

export const isViewableMovieCardToArchiveMove = and(
  or(isPopcornMoveItemType(MaterialType.MovieCards), isPopcornMoveItemTypeAtOnce(MaterialType.MovieCards)),
  isToPopcornLocation(LocationType.PlayerMovieCardArchiveSpot),
  isDestinationViewableByDisplayedPlayer
)