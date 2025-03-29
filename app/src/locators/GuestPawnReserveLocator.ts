import { GuestPawn } from '@gamepark/game-template/material/GuestPawn'
import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class GuestPawnReserveLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  gap = { x: 1.5 }
  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    let y = 0
    switch (location.id) {
      case GuestPawn.Blue:
        y = -6
        break
      case GuestPawn.Green:
        y = -3
        break
      case GuestPawn.Red:
        y = 0
        break
      case GuestPawn.Yellow:
        y = 3
        break
      case GuestPawn.White:
        y = 6
        break
      default:
        throw new Error('Unknown Location x value')
    }
    return { x: 39, y }
  }
}

export const guestPawnReserveLocator = new GuestPawnReserveLocator()
