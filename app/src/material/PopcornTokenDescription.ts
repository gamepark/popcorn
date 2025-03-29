import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PopcornToken, popcornTokens } from '@gamepark/game-template/material/PopcornToken'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { ComponentSize, MaterialContext, TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { random } from 'lodash'
import popcorn1Back1 from '../images/Tokens/Popcorn/Popcorn1Back1.png'
import popcorn1Front1 from '../images/Tokens/Popcorn/Popcorn1Front1.png'
import popcorn3Back1 from '../images/Tokens/Popcorn/Popcorn3Back1.png'
import popcorn3Front1 from '../images/Tokens/Popcorn/Popcorn3Front1.png'
import popcorn5Back1 from '../images/Tokens/Popcorn/Popcorn5Back1.png'
import popcorn5Front1 from '../images/Tokens/Popcorn/Popcorn5Front1.png'

const tokenSizes = {
  [PopcornToken.Token1]: { width: 1.29, height: 1.66 },
  //  [PopcornToken.Token12]: { width: 1.6, height: 1.35 },
  //  [PopcornToken.Token13]: { width: 1.27, height: 1.51 },
  //  [PopcornToken.Token14]: { width: 1.63, height: 1.44 },
  [PopcornToken.Token3]: { width: 1.85, height: 2 },
  //  [PopcornToken.Token32]: { width: 1.82, height: 2.12 },
  //  [PopcornToken.Token33]: { width: 2.02, height: 2.12 },
  [PopcornToken.Token5]: { width: 2.49, height: 2.43 }
  //  [PopcornToken.Token52]: { width: 2.28, height: 2.48 },
  //  [PopcornToken.Token53]: { width: 2.62, height: 2.46 }
}

class PopcornTokenDescription extends TokenDescription<PlayerColor, MaterialType, LocationType, PopcornToken> {
  public getSize(id: PopcornToken): ComponentSize {
    return tokenSizes[id]
  }

  thickness = 0.2

  private popcornTokenNumber = popcornTokens.reduce(
    (previousValue, currentValue) => ({ ...previousValue, [currentValue]: random(5, 10, false) }),
    {} as Record<PopcornToken, number>
  )

  stockLocation = {
    type: LocationType.PopcornPileSpot
  }

  images = {
    [PopcornToken.Token1]: popcorn1Front1,
    [PopcornToken.Token3]: popcorn3Front1,
    [PopcornToken.Token5]: popcorn5Front1
  }

  backImages = {
    [PopcornToken.Token1]: popcorn1Back1,
    [PopcornToken.Token3]: popcorn3Back1,
    [PopcornToken.Token5]: popcorn5Back1
  }

  public getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<PlayerColor, LocationType>[] {
    return popcornTokens.map((id) => ({
      id: id,
      quantity: this.popcornTokenNumber[id],
      location: this.stockLocation
    }))
  }
}

export const popcornTokenDescription = new PopcornTokenDescription()
