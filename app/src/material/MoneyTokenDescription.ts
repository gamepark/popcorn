import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MoneyToken, moneyTokens } from '@gamepark/popcorn/material/MoneyToken'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { ItemContext, RoundTokenDescription } from '@gamepark/react-game'
import { MaterialItem, MaterialMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { randomInt } from 'es-toolkit'
import money1Back from '../images/Tokens/Money/Money1Back.jpg'
import money1Front from '../images/Tokens/Money/Money1Front.jpg'
import money5Back from '../images/Tokens/Money/Money5Back.jpg'
import money5Front from '../images/Tokens/Money/Money5Front.jpg'
import { MoneyTokenHelp } from './help/MoneyTokenHelp.tsx'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp

class MoneyTokenDescription extends RoundTokenDescription<PlayerColor, MaterialType, LocationType, MoneyToken, RuleId, PlayerColor> {
  private moneyTokensNumber = {
    [MoneyToken.Money1]: randomInt(5, 11),
    [MoneyToken.Money5]: randomInt(5, 11)
  }

  diameter = 2.2
  thickness = 0.2
  help = MoneyTokenHelp

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

  public getStaticItems(): MaterialItem<PlayerColor, LocationType, MoneyToken>[] {
    return moneyTokens.map((id) => ({
      id: id,
      quantity: this.moneyTokensNumber[id],
      location: this.stockLocation
    }))
  }

  public displayHelp(
    item: MaterialItem<PlayerColor, LocationType, MoneyToken>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> | undefined {
    if (item.location.type === LocationType.PlayerMoneyPileSpot) {
      return displayLocationHelp(item.location)
    }
    return super.displayHelp(item, context)
  }
}

export const moneyTokenDescription = new MoneyTokenDescription()
