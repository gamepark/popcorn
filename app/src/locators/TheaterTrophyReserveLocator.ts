import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ListLocator } from '@gamepark/react-game'

class TheaterTrophyReserveLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  gap = { y: -7 }
  coordinates = { x: -30, y: -5 }
}

export const theaterTrophyReserveLocator = new TheaterTrophyReserveLocator()
