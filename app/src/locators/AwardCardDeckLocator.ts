import { AwardCard } from '@gamepark/popcorn/material/AwardCard.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { DeckLocator, DropAreaDescription } from '@gamepark/react-game'
import { awardCardDescription } from '../material/AwardCardDescription.tsx'
import { AwardCardDeckHelp } from './help/AwardCardDeckHelp.tsx'

class AwardCardDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  coordinates = { x: -2.52, y: -5 }
  gap = { x: -0.02, y: -0.02 }

  locationDescription = new AwardCardDeckLocationDescription()
}

class AwardCardDeckLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, AwardCard> {
  width = awardCardDescription.width
  height = awardCardDescription.height
  borderRadius = awardCardDescription.borderRadius

  help = AwardCardDeckHelp
}

export const awardCardDeckLocator = new AwardCardDeckLocator()
