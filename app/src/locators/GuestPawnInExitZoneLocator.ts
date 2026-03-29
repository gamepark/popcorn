import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { ItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { topCinemaBoardDescription } from '../material/TopCinemaBoardDescription'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed'

class GuestPawnInExitZoneLocator extends PileLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  parentItemType = MaterialType.TopCinemaBoard

  coordinates = { x: 8.5, y: 5 }
  radius = { x: 2.75, y: 2 }

  limit = 15

  maxAngle = 90

  minimumDistance = 0.75

  public getParentItem(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): MaterialItem<PlayerColor, LocationType> | undefined {
    return topCinemaBoardDescription.getStaticItems(context).find((boardItem) => boardItem.location.player === location.player)
  }

  public getPileId(item: MaterialItem<PlayerColor, LocationType>): string {
    return `guest-exit-${item.id}-${item.location.player}`
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

export const guestPawnInExitZoneLocator = new GuestPawnInExitZoneLocator()
