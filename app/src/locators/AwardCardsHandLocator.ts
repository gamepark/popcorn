import { AwardCard } from '@gamepark/popcorn/material/AwardCard.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { DropAreaDescription, HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { awardCardDescription } from '../material/AwardCardDescription.tsx'
import { AwardCardDeckHelp } from './help/AwardCardDeckHelp.tsx'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed.ts'
import { offsetPlayerCinemaBoardCoordinates } from './utils/offsetLocatorCoordinates.ts'

class AwardCardsHandLocator extends HandLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  radius = 100
  maxAngle = 5
  gapMaxAngle = 2
  clockwise = true
  baseAngle = 90

  locationDescription = new AwardCardHandLocationDescription()

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    return offsetPlayerCinemaBoardCoordinates(context, location.player, 16, 0)
  }

  public getItemRotateZ(): number {
    return 0
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

class AwardCardHandLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, AwardCard | undefined> {
  width = awardCardDescription.width
  height = awardCardDescription.height
  borderRadius = awardCardDescription.borderRadius

  help = AwardCardDeckHelp
}

export const awardCardsHandLocator = new AwardCardsHandLocator()
