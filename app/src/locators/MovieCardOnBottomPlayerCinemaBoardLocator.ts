import { isBuyMovieCardCustomMove } from '@gamepark/game-template/material/CustomMoveType'
import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { bottomCinemaBoardDescription } from '../material/BottomCinemaBoardDescription'
import { movieCardDescription } from '../material/MovieCardDescription'

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
  locationDescription = new MovieCardOnBottomPlayerCinemaBoardLocationDescription()
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
      const cardMove = move.data.move
      return location.player === cardMove.location.player && location.x === cardMove.location.x
    }
    return super.isMoveToLocation(move, location, context)
  }
}

export const movieCardOnBottomPlayerCinemaBoardLocator = new MovieCardOnBottomPlayerCinemaBoardLocator()
