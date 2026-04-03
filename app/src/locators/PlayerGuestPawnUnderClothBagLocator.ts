import { css } from '@emotion/react'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { DropAreaDescription, ItemContext, LocationContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { clothBagDescription } from '../material/ClothBagDescription'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed'
import { offsetPlayerCinemaBoardCoordinates } from './utils/offsetLocatorCoordinates'

class PlayerGuestPawnUnderClothBagLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  locationDescription = new PlayerGuestPawnUnderClothBagLocationDescription()
  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    const coordinates = offsetPlayerCinemaBoardCoordinates(context, location.player, -16, 2)
    coordinates.y += location.y ?? 0
    return coordinates
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

class PlayerGuestPawnUnderClothBagLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, GuestPawn> {
  width = 0.75 * clothBagDescription.width
  height = 0.45 * clothBagDescription.height
  extraCss = css`
    margin-top: 2em;
  `
  public getLocationTransform(
    location: Location<PlayerColor, LocationType>,
    context: LocationContext<PlayerColor, MaterialType, LocationType, number, number>
  ): string[] {
    return super.getLocationTransform(location, context).concat('translateY(-4em)')
  }
}

export const playerGuestPawnUnderClothBagLocator = new PlayerGuestPawnUnderClothBagLocator()
