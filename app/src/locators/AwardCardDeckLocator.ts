import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { DeckLocator } from '@gamepark/react-game'

class AwardCardDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: -2.52, y: -5 }
  gap = { x: -0.02, y: -0.02 }
}

export const awardCardDeckLocator = new AwardCardDeckLocator()
