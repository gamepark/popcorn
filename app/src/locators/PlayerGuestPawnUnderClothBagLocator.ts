import { css } from '@emotion/react'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { DropAreaDescription, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { clothBagDescription } from '../material/ClothBagDescription.ts'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed.ts'
import { offsetPlayerCinemaBoardCoordinates } from './utils/offsetLocatorCoordinates.ts'

class PlayerGuestPawnUnderClothBagLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  locationDescription = new PlayerGuestPawnUnderClothBagLocationDescription()
  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    return offsetPlayerCinemaBoardCoordinates(context, location.player, -16, 2)
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

class PlayerGuestPawnUnderClothBagLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, GuestPawn> {
  width = 0.75 * clothBagDescription.width
  height = 0.9 * clothBagDescription.height
  extraCss = css`
    margin-top: 2em;
  `
}

export const playerGuestPawnUnderClothBagLocator = new PlayerGuestPawnUnderClothBagLocator()
