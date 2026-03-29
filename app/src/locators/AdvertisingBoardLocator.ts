import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { Locator } from '@gamepark/react-game'

class AdvertisingBoardLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  coordinates = { x: -35, y: 12.5 }
}

export const advertisingBoardLocator = new AdvertisingBoardLocator()
