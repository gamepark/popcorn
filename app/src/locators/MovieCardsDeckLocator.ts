import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { DeckLocator } from '@gamepark/react-game'

class MovieCardsDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: -25, y: -3 }
  limit = 45
  gap = { x: -0.02, y: -0.02 }
}

export const movieCardsDeckLocator = new MovieCardsDeckLocator()
