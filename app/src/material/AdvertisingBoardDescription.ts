import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { BoardDescription } from '@gamepark/react-game'
import advertisingBoard from '../images/Boards/AdvertisingBoard.png'

class AdvertisingBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType> {
  width = 7.38
  height = 18.96
  thickness = 0.2
  transparency = true

  image = advertisingBoard

  staticItem = {
    location: {
      type: LocationType.AdvertisingBoardSpot
    }
  }
}

export const advertisingBoardDescription = new AdvertisingBoardDescription()
