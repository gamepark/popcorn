import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { DeckLocator } from '@gamepark/react-game'

class MovieCardsDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  limit = 45
  gap = { x: -0.02, y: -0.02 }
  coordinates = { x: -2.5, y: -12.5 }
}

export const movieCardsDeckLocator = new MovieCardsDeckLocator()
