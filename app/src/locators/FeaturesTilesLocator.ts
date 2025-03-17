import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { Locator } from '@gamepark/react-game'

class FeaturesTilesLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: -17, y: 4 }
}

export const featuresTilesLocator = new FeaturesTilesLocator()
