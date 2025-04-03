import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { FlatMaterialDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import clothBag from '../images/Bag.png'

class ClothBagDescription extends FlatMaterialDescription<PlayerColor, MaterialType, LocationType> {
  image = clothBag
  width = 7.6
  height = 6.7

  public getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<PlayerColor, LocationType>[] {
    return _context.rules.players.map((playerColor) => ({
      location: {
        type: LocationType.PlayerClothBagSpot,
        player: playerColor
      }
    }))
  }
}

export const clothBagDescription = new ClothBagDescription()
