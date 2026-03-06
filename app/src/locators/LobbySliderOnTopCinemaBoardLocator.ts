import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { topCinemaBoardDescription } from '../material/TopCinemaBoardDescription'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed.ts'

class LobbySliderOnTopCinemaBoardLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  parentItemType = MaterialType.TopCinemaBoard

  public getParentItem(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): MaterialItem<PlayerColor, LocationType> | undefined {
    return topCinemaBoardDescription.getStaticItems(context).find((boardItem) => boardItem.location.player === location.player)
  }

  coordinates = { x: -10.075, y: -2.37 }
  gap = { x: 7.72, y: -1.275, z: 0 }

  public getCoordinates(location: Location<PlayerColor, LocationType>): Partial<Coordinates> {
    return {
      x: this.coordinates.x + this.gap.x * (location.x ?? 0),
      y: this.coordinates.y + this.gap.y * (location.y ?? 0)
    }
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

export const lobbySliderOnTopCinemaBoardLocator = new LobbySliderOnTopCinemaBoardLocator()
