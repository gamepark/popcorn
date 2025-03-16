import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { advertisingBoardDescription } from './AdvertisingBoardDescription'
import { advertisingTokenDescription } from './AdvertisingTokenDescription'
import { awardCardDescription } from './AwardCardDescription'
import { bottomCinemaBoardDescription } from './BottomCinemaBoardDescription'
import { featuresTileDescription } from './FeaturesTileDescription'
import { lobbySliderDescription } from './LobbySliderDescription'
import { moneyTokenDescription } from './MoneyTokenDescription'
import { movieCardDescription } from './MovieCardDescription'
import { popcornTokenDescription } from './PopcornTokenDescription'
import { premiersTileDescription } from './PremiersTileDescription'
import { theaterTileDescription } from './TheaterTileDescription'
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
  [MaterialType.TheaterTiles]: theaterTileDescription
}
