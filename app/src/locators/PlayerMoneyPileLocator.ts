import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { getPlayerItemRotateZ, offsetPlayerCinemaBoardCoordinates } from './utils/PlayerItemsUtils'

class PlayerMoneyPileLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  radius = 2

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return offsetPlayerCinemaBoardCoordinates(context, location.player, -16, -6)
  }

  public getPileId(item: MaterialItem<PlayerColor, LocationType>, _context: ItemContext<PlayerColor, MaterialType, LocationType>): string {
    return `${item.location.player}-${item.id}`
  }

  public getRotateZ(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    return super.getRotateZ(location, context) + getPlayerItemRotateZ(location, context)
  }
}

export const playerMoneyPileLocator = new PlayerMoneyPileLocator()
