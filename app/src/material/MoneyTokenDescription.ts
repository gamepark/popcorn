import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MoneyToken, moneyTokens } from '@gamepark/popcorn/material/MoneyToken'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { MaterialContext, RoundTokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { random } from 'lodash'
import money1Back from '../images/Tokens/Money/Money1Back.jpg'
import money1Front from '../images/Tokens/Money/Money1Front.jpg'
import money5Back from '../images/Tokens/Money/Money5Back.jpg'
import money5Front from '../images/Tokens/Money/Money5Front.jpg'

class MoneyTokenDescription extends RoundTokenDescription<PlayerColor, MaterialType, LocationType, MoneyToken> {
  private moneyTokensNumber = {
    [MoneyToken.Money1]: random(5, 10, false),
    [MoneyToken.Money5]: random(5, 10, false)
  }

  diameter = 2.2
  thickness = 0.2

  stockLocation = {
    type: LocationType.MoneyPileSpot
  }

  images = {
    [MoneyToken.Money1]: money1Front,
    [MoneyToken.Money5]: money5Front
  }

  backImages = {
    [MoneyToken.Money1]: money1Back,
    [MoneyToken.Money5]: money5Back
  }

  public getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<PlayerColor, LocationType>[] {
    return moneyTokens.map((id) => ({
      id: id,
      quantity: this.moneyTokensNumber[id],
      location: this.stockLocation
    }))
  }
}

export const moneyTokenDescription = new MoneyTokenDescription()
