import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { BoardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import advertisingBoard from '../images/Boards/AdvertisingBoard.png'
import { AdvertisingBoardHelp } from './help/AdvertisingBoardHelp'

class AdvertisingBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType, undefined, RuleId, PlayerColor> {
  width = 7.5
  height = 18.96
  thickness = 0.2
  transparency = true

  image = advertisingBoard

  help = AdvertisingBoardHelp

  staticItem = {
    location: {
      type: LocationType.AdvertisingBoardSpot
    }
  } as MaterialItem<PlayerColor, LocationType, undefined>
}

export const advertisingBoardDescription = new AdvertisingBoardDescription()
