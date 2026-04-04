import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PopcornAnimationPredicate, PopcornMaterialAnimationContext } from '../popcornAnimationTypes.util.ts'
import { and, isFromLocation, isToLocation, not } from '@gamepark/react-game'
import {
  isPopcornCreateItem,
  isPopcornCreateItemType,
  isPopcornDeleteItem,
  isPopcornDeleteItemsAtOnce,
  isPopcornDeleteItemType,
  isPopcornMoveItem,
  isPopcornMoveItemsAtOnce
} from '@gamepark/popcorn/material/PopcornMoves.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { getDisplayedPlayerFromContext } from '../getDisplayedPlayerFromContext.util.ts'
import { isCreateItemsAtOnce } from '@gamepark/rules-api'

export const isFromPopcornLocation = isFromLocation<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>

export const isToPopcornLocation = isToLocation<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>

export const isDestinationViewableByDisplayedPlayer: PopcornAnimationPredicate = (move, context) => {
  const displayedPlayer = getDisplayedPlayerFromContext(context)
  if (isPopcornMoveItem(move) || isPopcornMoveItemsAtOnce(move)) {
    return move.location.player === undefined || move.location.player === displayedPlayer
  }
  if (isPopcornCreateItem(move)) {
    return move.item.location.player === undefined || move.item.location.player === displayedPlayer
  }
  if (isCreateItemsAtOnce(move)) {
    return move.items.every((item) => item.location.player === undefined || item.location.player === displayedPlayer)
  }
  return false
}

export const isOriginViewableViewableByDisplayedPlayer: PopcornAnimationPredicate = (move, context: PopcornMaterialAnimationContext) => {
  const displayedPlayer = getDisplayedPlayerFromContext(context)
  if (isPopcornDeleteItem(move) || isPopcornDeleteItemsAtOnce(move) || isPopcornMoveItem(move) || isPopcornMoveItemsAtOnce(move)) {
    const items = context.rules
      .material(move.itemType)
      .index('indexes' in move ? move.indexes : move.itemIndex)
      .getItems()
    return items.every((item) => item.location.player === undefined || item.location.player === displayedPlayer)
  }
  return false
}

export const isCreateItemMoveNotViewableByDisplayedPlayer: (type: MaterialType) => PopcornAnimationPredicate = (type) =>
  and(isPopcornCreateItemType(type), not(isDestinationViewableByDisplayedPlayer))

export const isDeleteItemTypeNotViewableByDisplayedPlayer: (type: MaterialType) => PopcornAnimationPredicate = (type) =>
  and(isPopcornDeleteItemType(type), not(isOriginViewableViewableByDisplayedPlayer))

export const areOriginAndDestinationOwnedByDifferentPlayers: PopcornAnimationPredicate = (move, context: PopcornMaterialAnimationContext) => {
  if (!isPopcornMoveItem(move)) {
    return false
  }
  const itemMoved = context.rules.material(move.itemType).index(move.itemIndex).getItem()!
  const originPlayer = itemMoved.location.player
  const destinationPlayer = move.location.player
  return originPlayer !== undefined && destinationPlayer !== undefined && originPlayer !== destinationPlayer
}
