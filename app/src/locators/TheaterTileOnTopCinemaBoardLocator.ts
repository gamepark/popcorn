import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { topCinemaBoardDescription } from '../material/TopCinemaBoardDescription'

class TheaterTileOnTopCinemaBoardLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  parentItemType = MaterialType.TopCinemaBoard
  coordinates = { x: -6.9, y: -1.15 }
  gap = { x: 7.7, z: 0 }

  public getParentItem(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): MaterialItem<PlayerColor, LocationType> | undefined {
    return topCinemaBoardDescription.getStaticItems(context).find((topBoardItem) => topBoardItem.location.player === location.player)
  }
}

export const theaterTileOnCinemaBoardLocator = new TheaterTileOnTopCinemaBoardLocator()
