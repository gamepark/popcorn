import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { getRelativePlayerIndex, HandLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'
import { getPlayerItemRotateZ } from './utils/PlayerItemsUtils'

const handCoordinates: Record<number, Record<number, XYCoordinates>> = {
  2: {
    0: { x: 19, y: 20 },
    1: { x: -19, y: -20 }
  },
  3: {
    0: { x: 19, y: 20 },
    1: { x: -49, y: -20 },
    2: { x: 11, y: -20 }
  },
  4: {
    0: { x: 49, y: 20 },
    1: { x: -11, y: 20 },
    2: { x: -49, y: -20 },
    3: { x: 11, y: -20 }
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
    return getPlayerItemRotateZ(location, context)
  }
}

export const awardCardsHandLocator = new AwardCardsHandLocator()
