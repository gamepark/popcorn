import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { DeckLocator, DropAreaDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerMovieArchiveHelp } from './help/PlayerMovieArchiveHelp'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed'
import { offsetPlayerCinemaBoardCoordinates } from './utils/offsetLocatorCoordinates'

class PlayerMovieArchiveDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  locationDescription = new PlayerMovieArchiveDeckLocationDescription()

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    return offsetPlayerCinemaBoardCoordinates(context, location.player, 25, 4)
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

class PlayerMovieArchiveDeckLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, MovieCardId> {
  width = 7
  height = 7

  help = PlayerMovieArchiveHelp
}

export const playerMovieArchiveDeckLocator = new PlayerMovieArchiveDeckLocator()
