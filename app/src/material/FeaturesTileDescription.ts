import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import featureTile from '../images/Tiles/MovieTiles/FeaturesTile.png'

class FeaturesTileDescription extends TokenDescription<PlayerColor, MaterialType, LocationType> {
  image = featureTile
  width = 5
  height = 7
  thickness = 0.2

  staticItem = {
    location: {
      type: LocationType.FeaturesTileSpot
    }
  }
}

export const featuresTileDescription = new FeaturesTileDescription()
