import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { PileLocator } from '@gamepark/react-game'

class PopcornTokenPileLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  limit = 30
  coordinates = { x: -33, y: 0 }
  radius = { x: 4, y: 4 }
}

export const popcornTokenPileLocator = new PopcornTokenPileLocator()
