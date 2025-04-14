import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { SeatsNumber, TheaterTileId, theaterTilesCharacteristics } from '@gamepark/popcorn/material/TheaterTile'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'

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

class GuestPawnOnTheaterTileLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  parentItemType = MaterialType.TheaterTiles

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    if (location.parent !== undefined) {
      const parentTile = context.rules.material(MaterialType.TheaterTiles).index(location.parent).getItem<Required<TheaterTileId>>()
      if (parentTile === undefined || parentTile.location.type !== LocationType.TheaterTileSpotOnTopPlayerCinemaBoard) {
        throw new Error('Cannot locate a non-existing tile')
      }
      const frontId = parentTile.id.front
      const seatsNumber = theaterTilesCharacteristics[frontId].getSeatsNumber()
      return this.getCoordinatesOnTile(location, seatsNumber)
    }
    return { x: 0, y: 0 }
  }

  private getCoordinatesOnTile(location: Location<PlayerColor, LocationType>, backId: Exclude<SeatsNumber, SeatsNumber.Default>): Partial<Coordinates> {
    if (location.x === undefined) {
      throw new Error('Location cannot have a missing x')
    }
    return coordinatesOnTile[backId][location.x]
  }
}

export const guestPawnOnTheaterTileLocator = new GuestPawnOnTheaterTileLocator()
