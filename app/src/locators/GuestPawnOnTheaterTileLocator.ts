import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { SeatsNumber, TheaterTile, TheaterTileId } from '@gamepark/popcorn/material/TheaterTile'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { topCinemaBoardDescription } from '../material/TopCinemaBoardDescription'

const coordinatesOnTile: Record<Exclude<SeatsNumber, SeatsNumber.Default>, Record<number, XYCoordinates>> = {
  [SeatsNumber.One]: {
    0: { x: 0, y: -1.25 }
  },
  [SeatsNumber.Two]: {
    0: { x: -0.75, y: -0.8 },
    1: { x: 0.9, y: -0.8 }
  },
  [SeatsNumber.Three]: {
    0: { x: 0, y: -2 },
    1: { x: -0.75, y: -0.1 },
    2: { x: 0.9, y: -0.1 }
  }
}

const coordinatesOnCinemaBoard: Record<number, Record<number, XYCoordinates>> = {
  0: {
    0: {
      x: -6.9,
      y: -2.3
    }
  },
  1: {
    0: { x: -0.05, y: -2.4 },
    1: { x: 1.8, y: -2.4 }
  }
}

class GuestPawnOnTheaterTileLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  parentItemType = MaterialType.TheaterTiles

  public getParentItem(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): MaterialItem<PlayerColor, LocationType> | undefined {
    if (location.parent === undefined) {
      return topCinemaBoardDescription.getStaticItems(context).find((boardItem) => boardItem.location.player === location.player)
    }
    return super.getParentItem(location, context)
  }

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    //return location.parent !== undefined ? this.getCoordinatesOnTile(location, context) : this.getCoordinatesOnCinemaBoard(location)
    if (location.id !== undefined && location.player !== undefined) {
      return location.id === 0 || location.id === 1 ? this.getCoordinatesOnCinemaBoard(location) : this.getCoordinatesOnTile(location, context)
    }
    return { x: 0, y: 0 }
  }

  private getCoordinatesOnTile(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    if (location.x === undefined) {
      throw new Error('Location cannot have a missing x')
    }
    const parentTile = context.rules.material(MaterialType.TheaterTiles).index(location.parent).getItem<TheaterTileId>()
    if (parentTile === undefined || parentTile.location.type !== LocationType.TheaterTileSpotOnTopPlayerCinemaBoard) {
      throw new Error('Cannot locate a non-existing tile')
    }
    const frontId = parentTile.id.front
    const backId =
      frontId === TheaterTile.DefaultTwoSeatTile ? SeatsNumber.Two : frontId === TheaterTile.DefaultOneSeatTile ? SeatsNumber.One : parentTile.id.back
    if (backId === SeatsNumber.Default) {
      throw new Error('Issue with tile id')
    }
    return coordinatesOnTile[backId][location.x]
  }

  private getCoordinatesOnCinemaBoard(location: Location<PlayerColor, LocationType>): Partial<Coordinates> {
    if (location.x === undefined || location.id === undefined || typeof location.id !== 'number') {
      throw new Error('Location cannot have a missing x and id')
    }
    return coordinatesOnCinemaBoard[location.id][location.x]
  }
}

export const guestPawnOnTheaterTileLocator = new GuestPawnOnTheaterTileLocator()
