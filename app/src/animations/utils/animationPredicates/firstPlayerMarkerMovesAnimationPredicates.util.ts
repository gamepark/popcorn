import { PopcornAnimationPredicate } from '../popcornAnimationTypes.util.ts'
import { and, not } from '@gamepark/react-game'
import { isPopcornMoveItemType } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { isDestinationViewableByDisplayedPlayer, isOriginViewableViewableByDisplayedPlayer } from './commonAnimationPredicates.util.ts'

export const isFirstPlayerMarkerFromDisplayedPlayerToNotDisplayedPlayerMove: PopcornAnimationPredicate = and(
  isPopcornMoveItemType(MaterialType.FirstPlayerMarker),
  isOriginViewableViewableByDisplayedPlayer,
  not(isDestinationViewableByDisplayedPlayer)
)

export const isFirstPlayerMarkerBetweenTwoNotDisplayedPlayersMove: PopcornAnimationPredicate = and(
  isPopcornMoveItemType(MaterialType.FirstPlayerMarker),
  not(isOriginViewableViewableByDisplayedPlayer),
  not(isDestinationViewableByDisplayedPlayer)
)

export const isFirstPlayerMarkerFromNotDisplayedPlayerToDisplayedPlayerMove: PopcornAnimationPredicate = and(
  isPopcornMoveItemType(MaterialType.FirstPlayerMarker),
  not(isOriginViewableViewableByDisplayedPlayer),
  isDestinationViewableByDisplayedPlayer
)
