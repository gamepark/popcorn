import { PopcornAnimationPredicate } from '../popcornAnimationTypes.util.ts'
import { and, not, or } from '@gamepark/react-game'
import { isPopcornMoveItemType } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import {
  isDestinationViewableByDisplayedPlayer,
  isFromPopcornLocation,
  isOriginViewableViewableByDisplayedPlayer,
  isToPopcornLocation
} from './commonAnimationPredicates.util.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'

export const isNotViewableBuyTheaterTileMove: PopcornAnimationPredicate = and(
  isPopcornMoveItemType(MaterialType.TheaterTiles),
  or(
    isFromPopcornLocation(LocationType.OneSeatTheaterTileRowSpot),
    isFromPopcornLocation(LocationType.TwoSeatTheaterTileRowSpot),
    isFromPopcornLocation(LocationType.ThreeSeatTheaterTileRowSpot)
  ),
  not(isDestinationViewableByDisplayedPlayer)
)

export const isNotViewableReturnTheaterTileToDeckOrRowMove: PopcornAnimationPredicate = and(
  isPopcornMoveItemType(MaterialType.TheaterTiles),
  or(
    isToPopcornLocation(LocationType.OneSeatTheaterTileDeckSpot),
    isToPopcornLocation(LocationType.TwoSeatTheaterTileDeckSpot),
    isToPopcornLocation(LocationType.ThreeSeatTheaterTileDeckSpot),
    isToPopcornLocation(LocationType.OneSeatTheaterTileRowSpot),
    isToPopcornLocation(LocationType.TwoSeatTheaterTileRowSpot),
    isToPopcornLocation(LocationType.ThreeSeatTheaterTileRowSpot)
  ),
  not(isOriginViewableViewableByDisplayedPlayer)
)
