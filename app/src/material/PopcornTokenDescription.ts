import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PopcornToken, popcornTokens } from '@gamepark/popcorn/material/PopcornToken'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { ComponentSize, TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { randomInt } from 'es-toolkit'
import popcorn1Front1 from '../images/Tokens/Popcorn/Popcorn1Front1.png'
import popcorn1Front2 from '../images/Tokens/Popcorn/Popcorn1Front2.png'
import popcorn1Front3 from '../images/Tokens/Popcorn/Popcorn1Front3.png'
import popcorn1Front4 from '../images/Tokens/Popcorn/Popcorn1Front4.png'
import popcorn3Front1 from '../images/Tokens/Popcorn/Popcorn3Front1.png'
import popcorn3Front2 from '../images/Tokens/Popcorn/Popcorn3Front2.png'
import popcorn3Front3 from '../images/Tokens/Popcorn/Popcorn3Front3.png'
import popcorn5Front1 from '../images/Tokens/Popcorn/Popcorn5Front1.png'
import popcorn5Front2 from '../images/Tokens/Popcorn/Popcorn5Front2.png'
import popcorn5Front3 from '../images/Tokens/Popcorn/Popcorn5Front3.png'
import { PopcornTokenHelp } from './help/PopcornTokenHelp'

const tokenSizes = {
  [PopcornToken.Token1]: { width: 1.29, height: 1.66 },
  [PopcornToken.Token3]: { width: 1.85, height: 2 },
  [PopcornToken.Token5]: { width: 2.49, height: 2.43 }
}

class PopcornTokenDescription extends TokenDescription<PlayerColor, MaterialType, LocationType, PopcornToken, RuleId, PlayerColor> {
  public getSize(id: PopcornToken): ComponentSize {
    return tokenSizes[id]
  }

  thickness = 0.2
  transparency = true

  help = PopcornTokenHelp

  private popcornTokenNumber = popcornTokens.reduce(
    (previousValue, currentValue) => ({ ...previousValue, [currentValue]: randomInt(5, 11) }),
    {} as Record<PopcornToken, number>
  )

  stockLocation = {
    type: LocationType.PopcornPileSpot
  }

  images = {
    [PopcornToken.Token1]: [popcorn1Front1, popcorn1Front2, popcorn1Front3, popcorn1Front4],
    [PopcornToken.Token3]: [popcorn3Front1, popcorn3Front2, popcorn3Front3],
    [PopcornToken.Token5]: [popcorn5Front1, popcorn5Front2, popcorn5Front3]
  }

  public getStaticItems(): MaterialItem<PlayerColor, LocationType, PopcornToken>[] {
    return popcornTokens.map((id) => ({
      id: id,
      quantity: this.popcornTokenNumber[id],
      location: this.stockLocation
    }))
  }
}

export const popcornTokenDescription = new PopcornTokenDescription()
