import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { topCinemaBoardDescription } from '../material/TopCinemaBoardDescription'

class AudienceCubeSpotOnTopCinemaBoardLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  parentItemType = MaterialType.TopCinemaBoard

  coordinates = { x: -9.25, y: 6.125 }
  gap = { x: 1.4 }

  public getParentItem(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): MaterialItem<PlayerColor, LocationType> | undefined {
    return topCinemaBoardDescription.getStaticItems(context).find((boardItem) => boardItem.location.player === location.player)
  }
}

export const audienceCubeSpotOnTopCinenaBoardLocator = new AudienceCubeSpotOnTopCinemaBoardLocator()
