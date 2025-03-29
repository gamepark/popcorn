import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { ListLocator } from '@gamepark/react-game'

class OneSeatTheaterTilesRowLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: 23, y: -2 }
  gap = { y: 4.5 }
}

export const oneSeatTheaterTilesRowLocator = new OneSeatTheaterTilesRowLocator()
