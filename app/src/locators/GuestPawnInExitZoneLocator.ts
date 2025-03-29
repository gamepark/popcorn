import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { ItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { topCinemaBoardDescription } from '../material/TopCinemaBoardDescription'

class GuestPawnInExitZoneLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  parentItemType = MaterialType.TopCinemaBoard

  coordinates = { x: 8.5, y: 5 }
  radius = { x: 2.75, y: 2 }

  limit = 15

  maxAngle = 90

  public getParentItem(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): MaterialItem<PlayerColor, LocationType> | undefined {
    return topCinemaBoardDescription.getStaticItems(context).find((boardItem) => boardItem.location.player === location.player)
  }

  public getPileId(item: MaterialItem<PlayerColor, LocationType>, _context: ItemContext<PlayerColor, MaterialType, LocationType>): string {
    return `guest-exit-${item.id}-${item.location.player}`
  }
}

export const guestPawnInExitZoneLocator = new GuestPawnInExitZoneLocator()
