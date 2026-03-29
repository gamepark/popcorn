import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { DropAreaDescription, ItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerMoneyPileHelp } from './help/PlayerMoneyPileHelp.tsx'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed.ts'
import { offsetPlayerCinemaBoardCoordinates } from './utils/offsetLocatorCoordinates.ts'

class PlayerMoneyPileLocator extends PileLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  radius = 2
  locationDescription = new PlayerMoneyPileLocationDescription()

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    return offsetPlayerCinemaBoardCoordinates(context, location.player, -16, -6)
  }

  public getPileId(item: MaterialItem<PlayerColor, LocationType>): string {
    return `${item.location.player}-${item.id}`
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

class PlayerMoneyPileLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, PlayerColor, RuleId, PlayerColor> {
  help = PlayerMoneyPileHelp
  width = 4
  ratio = 1
  borderRadius = 2
}

export const playerMoneyPileLocator = new PlayerMoneyPileLocator()
