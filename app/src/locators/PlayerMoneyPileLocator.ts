import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed.ts'
import { offsetPlayerCinemaBoardCoordinates } from './utils/offsetLocatorCoordinates.ts'

class PlayerMoneyPileLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  radius = 2

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return offsetPlayerCinemaBoardCoordinates(context, location.player, -16, -6)
  }

  public getPileId(item: MaterialItem<PlayerColor, LocationType>): string {
    return `${item.location.player}-${item.id}`
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

export const playerMoneyPileLocator = new PlayerMoneyPileLocator()
