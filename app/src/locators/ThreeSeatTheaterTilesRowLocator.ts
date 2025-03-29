import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { ListLocator } from '@gamepark/react-game'

class ThreeSeatTheaterTilesRowLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: 35, y: -2 }
  gap = { y: 4.5 }
}

export const threeSeatTheaterTilesRowLocator = new ThreeSeatTheaterTilesRowLocator()
