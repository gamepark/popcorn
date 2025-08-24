import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'

export const dealAwardCardsToPlayers = (
  players: PlayerColor[],
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>
): MaterialMove<PlayerColor, MaterialType, LocationType>[] => {
  const deck = rule.material(MaterialType.AwardCards).location(LocationType.AwardCardDeckSpot).deck()
  return players.map((player) =>
    deck.dealAtOnce(
      {
        type: LocationType.PlayerAwardCardHand,
        player: player
      },
      2
    )
  )
}
