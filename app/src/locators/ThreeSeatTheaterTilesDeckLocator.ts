import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { DeckLocator } from '@gamepark/react-game'

class ThreeSeatTheaterTilesDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: 35, y: -7 }
}

export const threeSeatTheaterTilesDeckLocator = new ThreeSeatTheaterTilesDeckLocator()
