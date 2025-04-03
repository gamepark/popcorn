import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ListLocator } from '@gamepark/react-game'

class TheaterTrophyReserveLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: 0, y: 10 }
  gap = { x: -7 }

  rotateZ = -90
}

export const theaterTrophyReserveLocator = new TheaterTrophyReserveLocator()
