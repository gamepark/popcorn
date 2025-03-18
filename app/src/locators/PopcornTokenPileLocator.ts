import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { PileLocator } from '@gamepark/react-game'

class PopcornTokenPileLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  limit = 30
  coordinates = { x: -35, y: 4 }
  radius = { x: 4, y: 2 }
}

export const popcornTokenPileLocator = new PopcornTokenPileLocator()
