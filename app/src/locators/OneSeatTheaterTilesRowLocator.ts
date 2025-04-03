import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ListLocator } from '@gamepark/react-game'

class OneSeatTheaterTilesRowLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: 23, y: -2 }
  gap = { y: 4.5 }
}

export const oneSeatTheaterTilesRowLocator = new OneSeatTheaterTilesRowLocator()
