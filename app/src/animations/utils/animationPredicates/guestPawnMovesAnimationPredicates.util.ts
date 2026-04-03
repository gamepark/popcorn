import { PopcornAnimationPredicate } from '../popcornAnimationTypes.util.ts'
import { and, not, or } from '@gamepark/react-game'
import { isPopcornMoveItemType, isPopcornMoveItemTypeAtOnce } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import {
  areOriginAndDestinationOwnedByDifferentPlayers,
  isDestinationViewableByDisplayedPlayer,
  isFromPopcornLocation,
  isOriginViewableViewableByDisplayedPlayer,
  isToPopcornLocation
} from './commonAnimationPredicates.util.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'

export const isGuestMoveNotViewableByDisplayedPlayer: PopcornAnimationPredicate = and(
  or(isPopcornMoveItemType(MaterialType.GuestPawns), isPopcornMoveItemTypeAtOnce(MaterialType.GuestPawns)),
  not(isOriginViewableViewableByDisplayedPlayer),
  not(isDestinationViewableByDisplayedPlayer)
)

export const isViewableGuestPawnFromReserveOrExitZoneToBagMove = and(
  or(isPopcornMoveItemType(MaterialType.GuestPawns), isPopcornMoveItemTypeAtOnce(MaterialType.GuestPawns)),
  or(isFromPopcornLocation(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard), isFromPopcornLocation(LocationType.GuestPawnReserveSpot)),
  isToPopcornLocation(LocationType.PlayerGuestPawnsUnderClothBagSpot),
  isOriginViewableViewableByDisplayedPlayer,
  isDestinationViewableByDisplayedPlayer
)

export const isNotViewableGuestPawnFromReserveOrExitZoneToBagMove = and(
  or(isPopcornMoveItemType(MaterialType.GuestPawns), isPopcornMoveItemTypeAtOnce(MaterialType.GuestPawns)),
  or(isFromPopcornLocation(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard), isFromPopcornLocation(LocationType.GuestPawnReserveSpot)),
  isToPopcornLocation(LocationType.PlayerGuestPawnsUnderClothBagSpot),
  isOriginViewableViewableByDisplayedPlayer,
  not(isDestinationViewableByDisplayedPlayer)
)

export const isViewableGuestPawnFromBagToShowingsReserveMove = and(
  or(isPopcornMoveItemType(MaterialType.GuestPawns), isPopcornMoveItemTypeAtOnce(MaterialType.GuestPawns)),
  isToPopcornLocation(LocationType.PlayerShowingsDrawnGuestSpot),
  isDestinationViewableByDisplayedPlayer
)

export const isGuestPawnFromNotDisplayedPlayerToDisplayedBagMove = and(
  isPopcornMoveItemType(MaterialType.GuestPawns),
  isFromPopcornLocation(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard),
  isToPopcornLocation(LocationType.PlayerGuestPawnsUnderClothBagSpot),
  not(isOriginViewableViewableByDisplayedPlayer),
  isDestinationViewableByDisplayedPlayer
)

export const isGuestPawnFromNotDisplayedPlayerToReserveMove = and(
  isPopcornMoveItemType(MaterialType.GuestPawns),
  isFromPopcornLocation(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard),
  isToPopcornLocation(LocationType.GuestPawnReserveSpot),
  not(isOriginViewableViewableByDisplayedPlayer),
  isDestinationViewableByDisplayedPlayer
)

export const isGuestPawnMoveBetweenTwoNotDisplayedPlayers = and(
  isPopcornMoveItemType(MaterialType.GuestPawns),
  isFromPopcornLocation(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard),
  isToPopcornLocation(LocationType.PlayerGuestPawnsUnderClothBagSpot),
  not(isOriginViewableViewableByDisplayedPlayer),
  not(isDestinationViewableByDisplayedPlayer),
  areOriginAndDestinationOwnedByDifferentPlayers
)

export const isViewableGuestPawnFromBagToExitZoneMove = and(
  or(isPopcornMoveItemType(MaterialType.GuestPawns), isPopcornMoveItemTypeAtOnce(MaterialType.GuestPawns)),
  isFromPopcornLocation(LocationType.PlayerGuestPawnsUnderClothBagSpot),
  isToPopcornLocation(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard),
  isOriginViewableViewableByDisplayedPlayer,
  isDestinationViewableByDisplayedPlayer,
)
