import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import premiersTile from '../images/Tiles/MovieTiles/PremiersTile.png'
import { PremiersTileHelp } from './help/PremiersTileHelp.tsx'

class PremiersTileDescription extends TokenDescription<PlayerColor, MaterialType, LocationType> {
  width = 5
  height = 7
  thickness = 0.2
  transparency = true

  image = premiersTile

  staticItem = {
    location: {
      type: LocationType.PremiersTileSpot
    }
  }

  help = PremiersTileHelp
}

export const premiersTileDescription = new PremiersTileDescription()
