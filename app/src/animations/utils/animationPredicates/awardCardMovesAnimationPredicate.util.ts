import { PopcornAnimationPredicate } from '../popcornAnimationTypes.util.ts'
import { and, not } from '@gamepark/react-game'
import { isPopcornMoveItemType, isPopcornMoveItemTypeAtOnce } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { isDestinationViewableByDisplayedPlayer, isOriginViewableViewableByDisplayedPlayer } from './commonAnimationPredicates.util.ts'

export const isNotViewableDrawAwardCardMove: PopcornAnimationPredicate = and(
  isPopcornMoveItemTypeAtOnce(MaterialType.AwardCards),
  not(isDestinationViewableByDisplayedPlayer)
)

export const isNotViewableDiscardAwardCardMove: PopcornAnimationPredicate = and(
  isPopcornMoveItemType(MaterialType.AwardCards),
  not(isOriginViewableViewableByDisplayedPlayer)
)
