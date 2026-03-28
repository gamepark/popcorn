import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { DeleteItem, DeleteItemsAtOnce, MaterialMoveBuilder, MoveItem, MoveItemsAtOnce, SelectItem, Shuffle } from '@gamepark/rules-api'
import { PopcornMoveComponentContext } from './PopcornTypes.util.ts'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp
export const isPopcornMoveFromLocations = (
  move:
    | MoveItem<PlayerColor, MaterialType, LocationType>
    | MoveItemsAtOnce<PlayerColor, MaterialType, LocationType>
    | SelectItem<MaterialType>
    | Shuffle<MaterialType>
    | DeleteItem<MaterialType>
    | DeleteItemsAtOnce<MaterialType>,
  locationTypes: LocationType[],
  context: PopcornMoveComponentContext
): boolean => {
  const rule = new PopcornRules(context.game)
  if ('itemIndex' in move) {
    return locationTypes.includes(rule.material(move.itemType).index(move.itemIndex).getItem()!.location.type)
  } else if ('indexes' in move) {
    return rule
      .material(move.itemType)
      .index(move.indexes)
      .getItems()!
      .some((item) => locationTypes.includes(item.location.type))
  }
  return false
}

export const isPopcornMoveFromLocation = (
  move:
    | MoveItem<PlayerColor, MaterialType, LocationType>
    | MoveItemsAtOnce<PlayerColor, MaterialType, LocationType>
    | SelectItem<MaterialType>
    | Shuffle<MaterialType>
    | DeleteItem<MaterialType>
    | DeleteItemsAtOnce<MaterialType>,
  locationType: LocationType,
  context: PopcornMoveComponentContext
): boolean => isPopcornMoveFromLocations(move, [locationType], context)

export const popcornDisplayMaterialHelp = displayMaterialHelp<PlayerColor, MaterialType, LocationType>
