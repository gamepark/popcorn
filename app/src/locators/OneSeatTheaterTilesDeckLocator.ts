import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { DeckLocator } from '@gamepark/react-game'

class OneSeatTheaterTilesDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: 23, y: -6 }
}

export const oneSeatTheaterTilesDeckLocator = new OneSeatTheaterTilesDeckLocator()
