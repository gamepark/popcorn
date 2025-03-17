import { AdvertisingTokenSpot } from '@gamepark/game-template/material/AdvertisingTokenSpot'
import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'

const spotCoordinates: Record<AdvertisingTokenSpot, XYCoordinates> = {
  [AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag]: { x: 1, y: -6.25 },
  [AdvertisingTokenSpot.YellowGuestPawn]: { x: 1, y: -3.5 },
  [AdvertisingTokenSpot.GreenGuestPawn]: { x: 1, y: -0.75 },
  [AdvertisingTokenSpot.RedGuestPawn]: { x: 1, y: 2 },
  [AdvertisingTokenSpot.BlueGuestPawn]: { x: 1, y: 4.75 },
  [AdvertisingTokenSpot.AnyGuestPawn]: { x: 1, y: 7.5 }
}

class AdvertisingTokenSpotOnAdvertisingBoardLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  parentItemType = MaterialType.AdvertisingBoard
  radius = { x: 2, y: 0.4 }
  limit = 24

  public getCoordinates(
    location: Location<PlayerColor, LocationType, AdvertisingTokenSpot>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    if (location.id === undefined) {
      throw new Error('Advertising tokens cannot have an undefined location.id')
    }
    return spotCoordinates[location.id]
  }
}

export const advertisingTokenSpotOnAdvertisingBoardLocator = new AdvertisingTokenSpotOnAdvertisingBoardLocator()
