import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { Locator } from '@gamepark/react-game'

class AdvertisingBoardLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: 15, y: 0 }
}

export const advertisingBoardLocator = new AdvertisingBoardLocator()
