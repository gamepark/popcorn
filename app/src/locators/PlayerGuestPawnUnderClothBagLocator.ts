import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'

const coordinates: Record<number, Record<number, XYCoordinates>> = {
  2: {
    0: { x: -12.5, y: 28 },
    1: { x: 12.5, y: -28 }
  },
  3: {
    0: { x: -12.5, y: 28 },
    1: { x: -13, y: -28 },
    2: { x: 52, y: -28 }
  },
  4: {
    0: { x: 13, y: 28 },
    1: { x: -47, y: 28 },
    2: { x: -13, y: -28 },
    3: { x: 47, y: -28 }
  }
}

class PlayerGuestPawnUnderClothBagLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinates[context.rules.players.length][getRelativePlayerIndex(context, location.player)]
  }
}

export const playerGuestPawnUnderClothBagLocator = new PlayerGuestPawnUnderClothBagLocator()
