import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { ListLocator } from '@gamepark/react-game'

class PremierMovieCardsRowLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: -10, y: -4 }
  gap = { x: 7.5 }
}

export const premierMovieCardsRowLocator = new PremierMovieCardsRowLocator()
