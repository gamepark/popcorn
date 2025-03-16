import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { DeckLocator } from '@gamepark/react-game'

class MovieCardsDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: -25, y: -2 }
  limit = 45
}

export const movieCardsDeckLocator = new MovieCardsDeckLocator()
