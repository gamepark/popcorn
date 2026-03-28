import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export const hideItemIfOwningPlayerIsNotDisplayed = <ItemId extends number = number>(
  item: MaterialItem<PlayerColor, LocationType, ItemId>,
  context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
): boolean => {
  const displayedPlayer = (context.rules.game.view as PlayerColor) ?? context.player ?? context.rules.players[0]
  return item.location.player !== displayedPlayer
}
