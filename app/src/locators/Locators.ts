import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { featureMovieCardsRowLocator } from './FeatureMovieCardsRowLocator'
import { featuresTilesLocator } from './FeaturesTilesLocator'
import { movieCardsDeckLocator } from './MovieCardsDeckLocator'
import { premierMovieCardsRowLocator } from './PremierMovieCardsRowLocator'
import { premiersTileLocator } from './PremiersTileLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.MovieCardDeckSpot]: movieCardsDeckLocator,
  [LocationType.FeaturesTileSpot]: featuresTilesLocator,
  [LocationType.PremiersTileSpot]: premiersTileLocator,
  [LocationType.FeaturesRowSpot]: featureMovieCardsRowLocator,
  [LocationType.PremiersRowSpot]: premierMovieCardsRowLocator
}
