import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { topCinemaBoardDescription } from '../material/TopCinemaBoardDescription'

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

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return {
      x: this.coordinates.x + this.gap.x * (location.x ?? 0),
      y: this.coordinates.y + this.gap.y * (location.y ?? 0)
    }
  }
}

export const lobbySliderOnTopCinemaBoardLocator = new LobbySliderOnTopCinemaBoardLocator()
