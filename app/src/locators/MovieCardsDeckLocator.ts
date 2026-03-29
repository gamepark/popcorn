import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { DeckLocator, DropAreaDescription } from '@gamepark/react-game'
import { MovieCardDeckHelp } from './help/MovieCardDeckHelp'

class MovieCardsDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  limit = 45
  gap = { x: -0.02, y: -0.02 }
  coordinates = { x: -2.5, y: -12.5 }

  locationDescription = new MovieCardDeckLocationDescription()
}

class MovieCardDeckLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, MovieCardId> {
  width = 7
  height = 7

  help = MovieCardDeckHelp
}

export const movieCardsDeckLocator = new MovieCardsDeckLocator()
