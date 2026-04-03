import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { getRelativePlayerIndex, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

class BesidePlayerPanelLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    if (!context.rules.isOver()) {
      const panelIndex = getRelativePlayerIndex(context, location.player)
      return { x: 31.75, y: panelIndex === 0  ? -16 : (context.player === undefined ? -15.25 : -14.25) + panelIndex * 3.5 }
    }
    return super.getCoordinates(location, context)
  }

  public placeItem(
    item: MaterialItem<PlayerColor, LocationType>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): string[] {
    return super.placeItem(item, context).concat(context.type === MaterialType.MovieCards ? 'scale(0.5)' : 'scale(1)')
  }
}

export const besidePlayerPanelLocator = new BesidePlayerPanelLocator()
