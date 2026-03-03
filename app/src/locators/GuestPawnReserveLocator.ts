import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { offsetAdvertisingBoardCoordinates } from './utils/PlayerItemsUtils.ts'

const yOffsetByGuestColor = {
  [GuestPawn.Blue]: -7.5,
  [GuestPawn.Green]: -4.5,
  [GuestPawn.Red]: -1.5,
  [GuestPawn.Yellow]: 1.5,
  [GuestPawn.White]: 4.5
}

class GuestPawnReserveLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  gap = { x: 1.5 }
  public getCoordinates(
    location: Location<PlayerColor, LocationType, GuestPawn>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    if (location.id === undefined) {
      throw new Error('Cannot have ')
    }
    return offsetAdvertisingBoardCoordinates(_context, 21, yOffsetByGuestColor[location.id])
  }
}

export const guestPawnReserveLocator = new GuestPawnReserveLocator()
