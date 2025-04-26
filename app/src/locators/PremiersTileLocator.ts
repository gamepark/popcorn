import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { Locator } from '@gamepark/react-game'

class PremiersTileLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: -17, y: -4 }
}

export const premiersTileLocator = new PremiersTileLocator()
