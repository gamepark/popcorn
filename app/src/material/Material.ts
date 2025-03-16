import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { awardCardDescription } from './AwardCardDescription'
import { bottomCinemaBoardDescription } from './BottomCinemaBoardDescription'
import { featuresTileDescription } from './FeaturesTileDescription'
import { lobbySliderDescription } from './LobbySliderDescription'
import { movieCardDescription } from './MovieCardDescription'
import { topCinemaBoardDescription } from './TopCinemaBoardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.MovieCards]: movieCardDescription,
  [MaterialType.AwardCards]: awardCardDescription,
  [MaterialType.BottomCinemaBoard]: bottomCinemaBoardDescription,
  [MaterialType.TopCinemaBoard]: topCinemaBoardDescription,
  [MaterialType.LobbySliders]: lobbySliderDescription,
  [MaterialType.FeaturesTile]: featuresTileDescription
}
