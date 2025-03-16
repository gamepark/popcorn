import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { BoardDescription } from '@gamepark/react-game'
import advertisingBoard from '../images/Boards/AdvertisingBoard.png'

class AdvertisingBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType> {
  width = 7.38
  height = 18.96

  image = advertisingBoard

  staticItem = {
    location: {
      type: LocationType.AdvertisingBoardSpot
    }
  }
}

export const advertisingBoardDescription = new AdvertisingBoardDescription()
