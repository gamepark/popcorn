import { and, not } from '@gamepark/react-game'
import { isPopcornMoveItemType } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import {
  isDestinationViewableByDisplayedPlayer,
  isFromPopcornLocation,
  isOriginViewableViewableByDisplayedPlayer,
  isToPopcornLocation
} from './commonAnimationPredicates.util.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'

export const isNotViewableAdvertisingTokenFromPlayerToBoardMove = and(
  isPopcornMoveItemType(MaterialType.AdvertisingTokens),
  isFromPopcornLocation(LocationType.PlayerAdvertisingTokenSpot),
  isToPopcornLocation(LocationType.AdvertisingTokenSpotOnAdvertisingBoard),
  not(isOriginViewableViewableByDisplayedPlayer)
)

export const isNotViewableAdvertisingTokenFromBoardToPlayerMove = and(
  isPopcornMoveItemType(MaterialType.AdvertisingTokens),
  isFromPopcornLocation(LocationType.AdvertisingTokenSpotOnAdvertisingBoard),
  isToPopcornLocation(LocationType.PlayerAdvertisingTokenSpot),
  not(isDestinationViewableByDisplayedPlayer)
)