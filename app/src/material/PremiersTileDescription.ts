import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import premiersTile from '../images/Tiles/MovieTiles/PremiersTile.png'
import { PremiersTileHelp } from './help/PremiersTileHelp'

class PremiersTileDescription extends TokenDescription<PlayerColor, MaterialType, LocationType, undefined, RuleId, PlayerColor> {
  width = 5
  height = 7
  thickness = 0.2
  transparency = true

  image = premiersTile

  staticItem = {
    location: {
      type: LocationType.PremiersTileSpot
    }
  } as MaterialItem<PlayerColor, LocationType, undefined>

  help = PremiersTileHelp
}

export const premiersTileDescription = new PremiersTileDescription()
