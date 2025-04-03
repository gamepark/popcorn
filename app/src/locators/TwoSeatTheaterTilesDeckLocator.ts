import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { DeckLocator } from '@gamepark/react-game'

class TwoSeatTheaterTilesDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: 29, y: -7 }
}

export const twoSeatTheaterTilesDeckLocator = new TwoSeatTheaterTilesDeckLocator()
