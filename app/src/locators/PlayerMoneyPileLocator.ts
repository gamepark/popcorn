import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { getRelativePlayerIndex, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'

const coordinates: Record<number, Record<number, XYCoordinates>> = {
  2: {
    0: { x: -20, y: 20 },
    1: { x: 20, y: -20 }
  },
  3: {
    0: { x: -20, y: 20 },
    1: { x: -14, y: -20 },
    2: { x: 56, y: -20 }
  },
  4: {
    0: { x: 14, y: 20 },
    1: { x: -56, y: 20 },
    2: { x: -14, y: -20 },
    3: { x: 56, y: -20 }
  }
}

class PlayerMoneyPileLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  radius = 2

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return coordinates[context.rules.players.length][getRelativePlayerIndex(context, location.player)]
  }
}

export const playerMoneyPileLocator = new PlayerMoneyPileLocator()
