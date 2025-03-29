import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { DeckLocator } from '@gamepark/react-game'

class TwoSeatTheaterTilesDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: 29, y: -7 }
}

export const twoSeatTheaterTilesDeckLocator = new TwoSeatTheaterTilesDeckLocator()
