import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { advertisingBoardDescription } from './AdvertisingBoardDescription'
import { advertisingTokenDescription } from './AdvertisingTokenDescription'
import { audienceCubeDescription } from './AudienceCubeDescription'
import { awardCardDescription } from './AwardCardDescription'
import { bottomCinemaBoardDescription } from './BottomCinemaBoardDescription'
import { clothBagDescription } from './ClothBagDescription'
import { featuresTileDescription } from './FeaturesTileDescription'
import { firstPlayerMarkerDescription } from './FirstPlayerMarkerDescription'
import { frenchMovieCardDescription } from './FrenchMovieCardDescription'
import { guestPawnDescription } from './GuestPawnDescription'
import { lobbySliderDescription } from './LobbySliderDescription'
import { moneyTokenDescription } from './MoneyTokenDescription'
import { movieCardDescription } from './MovieCardDescription'
import { popcornCupDescription } from './PopcornCupDescription'
import { popcornTokenDescription } from './PopcornTokenDescription'
import { premiersTileDescription } from './PremiersTileDescription'
import { theaterTileDescription } from './TheaterTileDescription'
import { theaterTrophyDescription } from './TheaterTrophyDescription'
import { topCinemaBoardDescription } from './TopCinemaBoardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.MovieCards]: movieCardDescription,
  [MaterialType.AwardCards]: awardCardDescription,
  [MaterialType.BottomCinemaBoard]: bottomCinemaBoardDescription,
  [MaterialType.TopCinemaBoard]: topCinemaBoardDescription,
  [MaterialType.LobbySliders]: lobbySliderDescription,
  [MaterialType.FeaturesTile]: featuresTileDescription,
  [MaterialType.PremiersTile]: premiersTileDescription,
  [MaterialType.PopcornTokens]: popcornTokenDescription,
  [MaterialType.MoneyTokens]: moneyTokenDescription,
  [MaterialType.AdvertisingBoard]: advertisingBoardDescription,
  [MaterialType.AdvertisingTokens]: advertisingTokenDescription,
  [MaterialType.TheaterTiles]: theaterTileDescription,
  [MaterialType.GuestPawns]: guestPawnDescription,
  [MaterialType.AudienceCubes]: audienceCubeDescription,
  [MaterialType.TheaterTrophies]: theaterTrophyDescription,
  [MaterialType.FirstPlayerMarker]: firstPlayerMarkerDescription,
  [MaterialType.ClothBag]: clothBagDescription,
  [MaterialType.PopcornCup]: popcornCupDescription
}

export const popcornMaterialI18n: Record<string, Partial<Record<MaterialType, MaterialDescription>>> = {
  fr: {
    [MaterialType.MovieCards]: frenchMovieCardDescription
  }
}
