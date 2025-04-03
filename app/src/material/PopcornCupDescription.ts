import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { FlatMaterialDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import cyanPopcornCup from '../images/Cups/BlueCup.png'
import greenPopcornCup from '../images/Cups/GreenCup.png'
import orangePopcornCup from '../images/Cups/OrangeCup.png'
import purplePopcornCup from '../images/Cups/PurpleCup.png'

class PopcornCupDescription extends FlatMaterialDescription<PlayerColor, MaterialType, LocationType, PlayerColor> {
  width = 6.15
  height = 5.35

  images = {
    [PlayerColor.Cyan]: cyanPopcornCup,
    [PlayerColor.Green]: greenPopcornCup,
    [PlayerColor.Orange]: orangePopcornCup,
    [PlayerColor.Purple]: purplePopcornCup
  }

  public getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<PlayerColor, LocationType>[] {
    return _context.rules.players.map((player) => ({
      id: player,
      location: {
        type: LocationType.PlayerPopcornBucketSpot,
        player: player
      }
    }))
  }
}

export const popcornCupDescription = new PopcornCupDescription()
