import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { offsetAdvertisingBoardCoordinates } from './utils/offsetLocatorCoordinates'

const yOffsetByGuestColor = {
  [GuestPawn.Blue]: -7.5,
  [GuestPawn.Green]: -4.5,
  [GuestPawn.Red]: -1.5,
  [GuestPawn.Yellow]: 1.5,
  [GuestPawn.White]: 4.5
}

class GuestPawnReserveLocator extends FlexLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  gap = { x: 1.5 }
  lineSize = 3
  lineGap = { y: 1 }
  maxLines = 3

  public getCoordinates(
    location: Location<PlayerColor, LocationType, GuestPawn>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    if (location.id === undefined) {
      throw new Error('Cannot have ')
    }
    return offsetAdvertisingBoardCoordinates(context, 21, yOffsetByGuestColor[location.id])
  }
}

export const guestPawnReserveLocator = new GuestPawnReserveLocator()
