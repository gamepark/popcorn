import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PopcornToken, popcornTokens } from '@gamepark/game-template/material/PopcornToken'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { ComponentSize, MaterialContext, TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { random } from 'lodash'
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
import popcorn1Back1 from '../images/Tokens/Popcorn/Popcorn1Back1.png'
import popcorn1Back2 from '../images/Tokens/Popcorn/Popcorn1Back2.png'
import popcorn1Back3 from '../images/Tokens/Popcorn/Popcorn1Back3.png'
import popcorn1Back4 from '../images/Tokens/Popcorn/Popcorn1Back4.png'
import popcorn3Back1 from '../images/Tokens/Popcorn/Popcorn3Back1.png'
import popcorn3Back2 from '../images/Tokens/Popcorn/Popcorn3Back2.png'
import popcorn3Back3 from '../images/Tokens/Popcorn/Popcorn3Back3.png'
import popcorn5Back1 from '../images/Tokens/Popcorn/Popcorn5Back1.png'
import popcorn5Back2 from '../images/Tokens/Popcorn/Popcorn5Back2.png'
import popcorn5Back3 from '../images/Tokens/Popcorn/Popcorn5Back3.png'

const tokenSizes = {
  [PopcornToken.Token11]: { width: 1.66, height: 1.29 },
  [PopcornToken.Token12]: { width: 1.6, height: 1.35 },
  [PopcornToken.Token13]: { width: 1.27, height: 1.51 },
  [PopcornToken.Token14]: { width: 1.63, height: 1.44 },
  [PopcornToken.Token31]: { width: 1.85, height: 2 },
  [PopcornToken.Token32]: { width: 1.82, height: 2.12 },
  [PopcornToken.Token33]: { width: 2.02, height: 2.12 },
  [PopcornToken.Token51]: { width: 2.49, height: 2.43 },
  [PopcornToken.Token52]: { width: 2.28, height: 2.48 },
  [PopcornToken.Token53]: { width: 2.62, height: 2.46 }
}

class PopcornTokenDescription extends TokenDescription<PlayerColor, MaterialType, LocationType, PopcornToken> {
  public getSize(id: PopcornToken): ComponentSize {
    return tokenSizes[id]
  }

  stockLocation = {
    type: LocationType.PopcornPileSpot
  }

  images = {
    [PopcornToken.Token11]: popcorn1Front1,
    [PopcornToken.Token12]: popcorn1Front2,
    [PopcornToken.Token13]: popcorn1Front3,
    [PopcornToken.Token14]: popcorn1Front4,
    [PopcornToken.Token31]: popcorn3Front1,
    [PopcornToken.Token32]: popcorn3Front2,
    [PopcornToken.Token33]: popcorn3Front3,
    [PopcornToken.Token51]: popcorn5Front1,
    [PopcornToken.Token52]: popcorn5Front2,
    [PopcornToken.Token53]: popcorn5Front3
  }

  backImages = {
    [PopcornToken.Token11]: popcorn1Back1,
    [PopcornToken.Token12]: popcorn1Back2,
    [PopcornToken.Token13]: popcorn1Back3,
    [PopcornToken.Token14]: popcorn1Back4,
    [PopcornToken.Token31]: popcorn3Back1,
    [PopcornToken.Token32]: popcorn3Back2,
    [PopcornToken.Token33]: popcorn3Back3,
    [PopcornToken.Token51]: popcorn5Back1,
    [PopcornToken.Token52]: popcorn5Back2,
    [PopcornToken.Token53]: popcorn5Back3
  }

  public getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<PlayerColor, LocationType>[] {
    return popcornTokens.map((id) => ({
      id: id,
      quantity: random(3, 5, false),
      location: this.stockLocation
    }))
  }
}

export const popcornTokenDescription = new PopcornTokenDescription()
