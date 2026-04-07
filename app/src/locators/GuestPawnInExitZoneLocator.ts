import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { DropAreaDescription, ItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { topCinemaBoardDescription } from '../material/TopCinemaBoardDescription'
import { ExitZoneHelp } from './help/ExitZoneHelp'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed'

class GuestPawnInExitZoneLocator extends PileLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  parentItemType = MaterialType.TopCinemaBoard

  coordinates = { x: 8.5, y: 5 }

  zFromY = true
  radius = { x: 2.75, y: 2 }

  limit = 20

  maxAngle = 90

  minimumDistance = 1

  locationDescription = new GuestPawnInExitZoneLocationDescription()

  public getParentItem(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): MaterialItem<PlayerColor, LocationType> | undefined {
    return topCinemaBoardDescription.getStaticItems(context).find((boardItem) => boardItem.location.player === location.player)
  }

  // public getPileId(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): string {
  //   return super.getPileId(item, context) + '-' + item.id
  // }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

class GuestPawnInExitZoneLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, GuestPawn, RuleId, PlayerColor> {
  help = ExitZoneHelp
  width = 5.5
  height = 4
  borderRadius = 2
}

export const guestPawnInExitZoneLocator = new GuestPawnInExitZoneLocator()
