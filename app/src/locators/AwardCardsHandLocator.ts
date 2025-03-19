import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { getRelativePlayerIndex, HandLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'

const handCoordinates: Record<number, Record<number, XYCoordinates>> = {
  2: {
    0: { x: 20, y: 20 },
    1: { x: -20, y: -20 }
  },
  3: {
    0: { x: 20, y: 20 },
    1: { x: -54, y: -20 },
    2: { x: 16, y: -20 }
  },
  4: {
    0: { x: 54, y: 20 },
    1: { x: -16, y: 20 },
    2: { x: -54, y: -20 },
    3: { x: 16, y: -20 }
  }
}

class AwardCardsHandLocator extends HandLocator<PlayerColor, MaterialType, LocationType> {
  radius = 100
  maxAngle = 15
  gapMaxAngle = 3
  clockwise = true

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return handCoordinates[context.rules.players.length][getRelativePlayerIndex(context, location.player)]
  }

  public getBaseAngle(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    switch (context.rules.players.length) {
      case 2:
      case 3:
        return getRelativePlayerIndex(context, location.player) === 0 ? 0 : 180
      case 4:
        return getRelativePlayerIndex(context, location.player) < 2 ? 0 : 180
      default:
        throw new Error('Invalid number of players')
    }
  }
}

export const awardCardsHandLocator = new AwardCardsHandLocator()
