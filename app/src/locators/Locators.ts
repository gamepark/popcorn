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
import { oneSeatTheaterTilesDeckLocator } from './OneSeatTheaterTilesDeckLocator'
import { oneSeatTheaterTilesRowLocator } from './OneSeatTheaterTilesRowLocator'
import { premierMovieCardsRowLocator } from './PremierMovieCardsRowLocator'
import { premiersTileLocator } from './PremiersTileLocator'
import { threeSeatTheaterTilesDeckLocator } from './ThreeSeatTheaterTilesDeckLocator'
import { twoSeatTheaterTilesDeckLocator } from './TwoSeatTheaterTilesDeckLocator'
import { twoSeatTheaterTilesRowLocator } from './TwoSeatTheaterTilesRowLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.MovieCardDeckSpot]: movieCardsDeckLocator,
  [LocationType.FeaturesTileSpot]: featuresTilesLocator,
  [LocationType.PremiersTileSpot]: premiersTileLocator,
  [LocationType.FeaturesRowSpot]: featureMovieCardsRowLocator,
  [LocationType.PremiersRowSpot]: premierMovieCardsRowLocator,
  [LocationType.AwardCardDeckSpot]: awardCardDeckLocator,
  [LocationType.AdvertisingBoardSpot]: advertisingBoardLocator,
  [LocationType.AdvertisingTokenSpotOnAdvertisingBoard]: advertisingTokenSpotOnAdvertisingBoardLocator,
  [LocationType.OneSeatTheaterTileDeckSpot]: oneSeatTheaterTilesDeckLocator,
  [LocationType.TwoSeatTheaterTileDeckSpot]: twoSeatTheaterTilesDeckLocator,
  [LocationType.ThreeSeatTheaterTileDeckSpot]: threeSeatTheaterTilesDeckLocator,
  [LocationType.OneSeatTheaterTileRowSpot]: oneSeatTheaterTilesRowLocator,
  [LocationType.TwoSeatTheaterTileRowSpot]: twoSeatTheaterTilesRowLocator
}
