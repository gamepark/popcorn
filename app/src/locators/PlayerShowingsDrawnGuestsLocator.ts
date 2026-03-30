import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { DropAreaDescription, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { guestPawnDescription } from '../material/GuestPawnDescription'
import { ShowingGuestHelp } from './help/ShowingGuestHelp'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed'
import { offsetPlayerCinemaBoardCoordinates } from './utils/offsetLocatorCoordinates'

class PlayerShowingsDrawnGuestsLocator extends ListLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  gap = { x: 2, y: 0, z: 0 }
  locationDescription = new PlayerShowingsDrawnGuestsLocationDescription()
  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    return offsetPlayerCinemaBoardCoordinates(context, location.player, -10, -13)
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

class PlayerShowingsDrawnGuestsLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, GuestPawn, RuleId, PlayerColor> {
  help = ShowingGuestHelp
  width = guestPawnDescription.width
  height = guestPawnDescription.height
}

export const playerShowingsDrawnGuestsLocator = new PlayerShowingsDrawnGuestsLocator()
