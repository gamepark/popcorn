import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { MoneyToken, moneyTokens } from '@gamepark/game-template/material/MoneyToken'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { MaterialContext, RoundTokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { random } from 'lodash'
import money1Front from '../images/Tokens/Money/Money1Front.jpg'
import money5Front from '../images/Tokens/Money/Money5Front.jpg'
import money1Back from '../images/Tokens/Money/Money1Back.jpg'
import money5Back from '../images/Tokens/Money/Money5Back.jpg'

class MoneyTokenDescription extends RoundTokenDescription<PlayerColor, MaterialType, LocationType, MoneyToken> {
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
      quantity: random(8, 15, false),
      location: this.stockLocation
    }))
  }
}

export const moneyTokenDescription = new MoneyTokenDescription()
