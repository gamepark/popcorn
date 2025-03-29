import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { getRelativePlayerIndex, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export const getPlayerItemRotateZ = (
  location: Location<PlayerColor, LocationType>,
  context: MaterialContext<PlayerColor, MaterialType, LocationType>
): number => {
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
