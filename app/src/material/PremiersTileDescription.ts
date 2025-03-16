import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import premiersTile from '../images/Tiles/MovieTiles/PremiersTile.png'

class PremiersTileDescription extends TokenDescription<PlayerColor, MaterialType, LocationType> {
  width = 5
  height = 7
  thickness = 0.2

  image = premiersTile

  staticItem = {
    location: {
      type: LocationType.PremiersTileSpot
    }
  }
}

export const premiersTileDescription = new PremiersTileDescription()
