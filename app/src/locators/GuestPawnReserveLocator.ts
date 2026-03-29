import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { DropAreaDescription, FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { GuestReserveHelp } from './help/GuestReserveHelp'
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
  locationDescription = new GuestPawnReserveLocationDescription()

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

class GuestPawnReserveLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, GuestPawnReserveLocator, RuleId, PlayerColor> {
  width = 7
  height = 4
  help = GuestReserveHelp
}

export const guestPawnReserveLocator = new GuestPawnReserveLocator()
