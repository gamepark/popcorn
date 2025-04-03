import { isBuyMovieCardCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { bottomCinemaBoardDescription } from '../material/BottomCinemaBoardDescription'
import { movieCardDescription } from '../material/MovieCardDescription'

class MovieCardOnBottomPlayerCinemaBoardLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  parentItemType = MaterialType.BottomCinemaBoard
  coordinates = { x: -7.7, y: -7.5 }
  gap = { x: 7.7, z: 0 }
  locationDescription = new MovieCardOnBottomPlayerCinemaBoardLocationDescription()

  public getParentItem(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): MaterialItem<PlayerColor, LocationType> | undefined {
    return bottomCinemaBoardDescription.getStaticItems(context).find((boardItem) => boardItem.location.player === location.player)
  }

  // public getItemCoordinates(
  //   item: MaterialItem<PlayerColor, LocationType>,
  //   context: ItemContext<PlayerColor, MaterialType, LocationType>
  // ): Partial<Coordinates> {
  //   const originalCoordinates = super.getItemCoordinates(item, context) as Coordinates
  //   if (item.location.y === 1) {
  //     originalCoordinates.y -= 4.5
  //   }
  //   return originalCoordinates
  // }
}

class MovieCardOnBottomPlayerCinemaBoardLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType> {
  constructor() {
    super(movieCardDescription)
  }
  public isMoveToLocation(
    move: MaterialMove<PlayerColor, MaterialType, LocationType>,
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): boolean {
    if (isBuyMovieCardCustomMove(move)) {
      return location.player === move.data.player && location.x === move.data.destinationSpot
    }
    return super.isMoveToLocation(move, location, context)
  }
}

export const movieCardOnBottomPlayerCinemaBoardLocator = new MovieCardOnBottomPlayerCinemaBoardLocator()
