import { GuestPawn } from '@gamepark/game-template/material/GuestPawn'
import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

class GuestPawnReserveLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  gap = { x: 1.5 }
  public getCoordinates(
    _location: Location<PlayerColor, LocationType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    let y = 0
    switch (_location.x) {
      case GuestPawn.Blue:
        y = -5
        break
      case GuestPawn.Green:
        y = -2
        break
      case GuestPawn.Red:
        y = 1
        break
      case GuestPawn.White:
        y = 4
        break
      case GuestPawn.Yellow:
        y = 7
        break
      default:
        throw new Error('Unknown Location x value')
    }
    return { x: 39, y }
  }

  public getItemIndex(item: MaterialItem<PlayerColor, LocationType>, _context: ItemContext<PlayerColor, MaterialType, LocationType>): number {
    return item.location.y ?? 0
  }
}

export const guestPawnReserveLocator = new GuestPawnReserveLocator()
