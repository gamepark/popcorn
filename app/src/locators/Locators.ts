import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { advertisingBoardLocator } from './AdvertisingBoardLocator'
import { advertisingTokenSpotOnAdvertisingBoardLocator } from './AdvertisingTokenSpotOnAdvertisingBoardLocator'
import { awardCardDeckLocator } from './AwardCardDeckLocator'
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
  [LocationType.PremiersRowSpot]: premierMovieCardsRowLocator,
  [LocationType.AwardCardDeckSpot]: awardCardDeckLocator,
  [LocationType.AdvertisingBoardSpot]: advertisingBoardLocator,
  [LocationType.AdvertisingTokenSpotOnAdvertisingBoard]: advertisingTokenSpotOnAdvertisingBoardLocator
}
