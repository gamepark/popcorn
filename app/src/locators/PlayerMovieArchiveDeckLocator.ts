import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MovieCardId } from '@gamepark/popcorn/material/MovieCard.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { DeckLocator, DropAreaDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { MovieCardDeckHelp } from './help/MovieCardDeckHelp.tsx'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed.ts'
import { offsetPlayerCinemaBoardCoordinates } from './utils/offsetLocatorCoordinates.ts'

class PlayerMovieArchiveDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  locationDescription = new PlayerMovieArchiveDeckLocationDescription()

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return offsetPlayerCinemaBoardCoordinates(context, location.player, 25, 4)
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

class PlayerMovieArchiveDeckLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, MovieCardId> {
  width = 7
  height = 7

  help = MovieCardDeckHelp
}

export const playerMovieArchiveDeckLocator = new PlayerMovieArchiveDeckLocator()
