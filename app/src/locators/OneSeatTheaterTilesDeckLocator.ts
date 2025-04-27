import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { DeckLocator } from '@gamepark/react-game'

class OneSeatTheaterTilesDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: 23, y: -7 }
}

export const oneSeatTheaterTilesDeckLocator = new OneSeatTheaterTilesDeckLocator()
