import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { ItemContext, LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { GuestsInBagReminder } from './GuestsInBagReminder'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed'
import { offsetPlayerCinemaBoardCoordinates } from './utils/offsetLocatorCoordinates'

class PlayerClothBagLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  locationDescription = new PlayerClothBagLocationDescription()

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    return { ...offsetPlayerCinemaBoardCoordinates(context, location.player, -16, 4), z: 0.1 }
  }

  public getLocations(_context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): Partial<Location<PlayerColor, LocationType>>[] {
    if (_context.player !== undefined && (_context.rules.game.view === undefined || _context.player === _context.rules.game.view)) {
      return [{ type: LocationType.PlayerClothBagSpot, player: _context.player }]
    }
    return []
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

class PlayerClothBagLocationDescription extends LocationDescription<PlayerColor, MaterialType, LocationType> {
  width = 5
  height = 1.5
  borderRadius = 5

  content = GuestsInBagReminder
}

export const playerClothBagLocator = new PlayerClothBagLocator()
