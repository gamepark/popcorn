import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { FlatMaterialDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import clothBag from '../images/Bag.png'
import { ClothBagHelp } from './help/ClothBagHelp'

class ClothBagDescription extends FlatMaterialDescription<PlayerColor, MaterialType, LocationType, undefined, RuleId, PlayerColor> {
  image = clothBag
  width = 7.6
  height = 6.7
  transparency = true
  help = ClothBagHelp

  public getStaticItems(
    _context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): MaterialItem<PlayerColor, LocationType, undefined>[] {
    return _context.rules.players.map(
      (playerColor) =>
        ({
          location: {
            type: LocationType.PlayerClothBagSpot,
            player: playerColor
          }
        }) as MaterialItem<PlayerColor, LocationType, undefined>
    )
  }
}

export const clothBagDescription = new ClothBagDescription()
