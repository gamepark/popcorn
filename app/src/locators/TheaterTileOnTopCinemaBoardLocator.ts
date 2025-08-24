import { isBuyTheaterTileCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { theaterTileDescription } from '../material/TheaterTileDescription'
import { topCinemaBoardDescription } from '../material/TopCinemaBoardDescription'

class TheaterTileOnTopCinemaBoardLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  parentItemType = MaterialType.TopCinemaBoard
  coordinates = { x: -6.9, y: -1.15 }
  gap = { x: 7.7, z: 0 }
  locationDescription = new TheaterTileOnTopCinemaBoardLocatorDescription()

  public getParentItem(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): MaterialItem<PlayerColor, LocationType> | undefined {
    return topCinemaBoardDescription.getStaticItems(context).find((topBoardItem) => topBoardItem.location.player === location.player)
  }
}

class TheaterTileOnTopCinemaBoardLocatorDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType> {
  constructor() {
    super(theaterTileDescription)
  }

  public isMoveToLocation(
    move: MaterialMove<PlayerColor, MaterialType, LocationType>,
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): boolean {
    if (isBuyTheaterTileCustomMove(move)) {
      return location.player === move.data.player && location.x === move.data.destinationSpot
    }
    return super.isMoveToLocation(move, location, context)
  }
}

export const theaterTileOnCinemaBoardLocator = new TheaterTileOnTopCinemaBoardLocator()
