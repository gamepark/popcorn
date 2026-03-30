import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import featureTile from '../images/Tiles/MovieTiles/FeaturesTile.png'
import { FeaturesTileHelp } from './help/FeaturesTileHelp'

class FeaturesTileDescription extends TokenDescription<PlayerColor, MaterialType, LocationType, undefined, RuleId, PlayerColor> {
  image = featureTile
  width = 5
  height = 7
  thickness = 0.2
  transparency = true

  staticItem = {
    location: {
      type: LocationType.FeaturesTileSpot
    }
  } as MaterialItem<PlayerColor, LocationType, undefined>

  help = FeaturesTileHelp
}

export const featuresTileDescription = new FeaturesTileDescription()
