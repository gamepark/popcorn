import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { advertisingBoardLocator } from './AdvertisingBoardLocator'
import { advertisingTokenSpotOnAdvertisingBoardLocator } from './AdvertisingTokenSpotOnAdvertisingBoardLocator'
import { audienceCubeSpotOnTopCinenaBoardLocator } from './AudienceCubeSpotOnTopCinemaBoardLocator'
import { awardCardDeckLocator } from './AwardCardDeckLocator'
import { bottomCinemaBoardLocator } from './BottomCinemaBoardLocator'
import { featureMovieCardsRowLocator } from './FeatureMovieCardsRowLocator'
import { featuresTilesLocator } from './FeaturesTilesLocator'
import { guestPawnInExitZoneLocator } from './GuestPawnInExitZoneLocator'
import { guestPawnOnTheaterTileLocator } from './GuestPawnOnTheaterTileLocator'
import { guestPawnReserveLocator } from './GuestPawnReserveLocator'
import { lobbySliderOnTopCinemaBoardLocator } from './LobbySliderOnTopCinemaBoardLocator'
import { moneyPileLocator } from './MoneyTokenPileLocator'
import { movieCardOnBottomPlayerCinemaBoardLocator } from './MovieCardOnBottomPlayerCinemaBoardLocator'
import { movieCardsDeckLocator } from './MovieCardsDeckLocator'
import { oneSeatTheaterTilesDeckLocator } from './OneSeatTheaterTilesDeckLocator'
import { oneSeatTheaterTilesRowLocator } from './OneSeatTheaterTilesRowLocator'
import { popcornTokenPileLocator } from './PopcornTokenPileLocator'
import { premierMovieCardsRowLocator } from './PremierMovieCardsRowLocator'
import { premiersTileLocator } from './PremiersTileLocator'
import { theaterTileOnCinemaBoardLocator } from './TheaterTileOnTopCinemaBoardLocator'
import { theaterTrophyReserveLocator } from './TheaterTrophyReserveLocator'
import { threeSeatTheaterTilesDeckLocator } from './ThreeSeatTheaterTilesDeckLocator'
import { threeSeatTheaterTilesRowLocator } from './ThreeSeatTheaterTilesRowLocator'
import { topCinemaBoardOnBottomCinemaBoardLocator } from './TopCinemaBoardOnBottomCinemaBoardLocator'
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
  [LocationType.TwoSeatTheaterTileRowSpot]: twoSeatTheaterTilesRowLocator,
  [LocationType.ThreeSeatTheaterTileRowSpot]: threeSeatTheaterTilesRowLocator,
  [LocationType.PopcornPileSpot]: popcornTokenPileLocator,
  [LocationType.MoneyPileSpot]: moneyPileLocator,
  [LocationType.TheaterTrophyReserveSpot]: theaterTrophyReserveLocator,
  [LocationType.GuestPawnReserveSpot]: guestPawnReserveLocator,
  [LocationType.BottomPlayerCinemaBoardSpot]: bottomCinemaBoardLocator,
  [LocationType.MovieCardSpotOnBottomPlayerCinemaBoard]: movieCardOnBottomPlayerCinemaBoardLocator,
  [LocationType.TopPlayerCinemaBoardSpotOnBottomPlayerCinemaBoard]: topCinemaBoardOnBottomCinemaBoardLocator,
  [LocationType.LobbySliderSpotOnTopPlayerCinemaBoard]: lobbySliderOnTopCinemaBoardLocator,
  [LocationType.TheaterTileSpotOnTopPlayerCinemaBoard]: theaterTileOnCinemaBoardLocator,
  [LocationType.GuestPawnSpotOnTheaterTile]: guestPawnOnTheaterTileLocator,
  [LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard]: guestPawnInExitZoneLocator,
  [LocationType.AudienceCubeSpotOnTopPlayerCinemaBoard]: audienceCubeSpotOnTopCinenaBoardLocator
}
