import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { bottomCinemaBoardDescription } from '../material/BottomCinemaBoardDescription'

class MovieCardOnBottomPlayerCinemaBoardLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  parentItemType = MaterialType.BottomCinemaBoard

  public getParentItem(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): MaterialItem<PlayerColor, LocationType> | undefined {
    return bottomCinemaBoardDescription.getStaticItems(context).find((boardItem) => boardItem.location.player === location.player)
  }

  coordinates = { x: -7.7, y: -7.5 }
  gap = { x: 7.7, z: 0 }
}

export const movieCardOnBottomPlayerCinemaBoardLocator = new MovieCardOnBottomPlayerCinemaBoardLocator()
