import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { bottomCinemaBoardDescription } from '../material/BottomCinemaBoardDescription'
import { movieCardDescription } from '../material/MovieCardDescription'

class TopCinemaBoardOnBottomCinemaBoardLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  parentItemType = MaterialType.BottomCinemaBoard
  coordinates = { z: movieCardDescription.thickness }

  public getParentItem(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): MaterialItem<PlayerColor, LocationType> | undefined {
    return bottomCinemaBoardDescription.getStaticItems(context).find((boardItem) => boardItem.location.player === location.player)
  }
}

export const topCinemaBoardOnBottomCinemaBoardLocator = new TopCinemaBoardOnBottomCinemaBoardLocator()
