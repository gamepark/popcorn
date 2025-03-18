import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { ListLocator } from '@gamepark/react-game'

class TheaterTrophyReserveLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: 0, y: 10 }
  gap = { x: -7 }

  rotateZ = -90
}

export const theaterTrophyReserveLocator = new TheaterTrophyReserveLocator()
