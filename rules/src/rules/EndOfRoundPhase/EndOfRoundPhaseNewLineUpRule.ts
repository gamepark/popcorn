import { MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export class EndOfRoundPhaseNewLineUpRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId> {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return this.getNewLineupConsequences().concat(this.startPlayerTurn(RuleId.EndOfRoundPendingActionsNextPhaseTransitionRule, this.player))
  }

  private getNewLineupConsequences(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const movieCardMaterial = this.material(MaterialType.MovieCards)
    const movieCardDeck = movieCardMaterial.location(LocationType.MovieCardDeckSpot).deck()
    const numberOfCardsToDealInFeaturesRow = 3 - movieCardMaterial.location(LocationType.PremiersRowSpot).length
    return ([movieCardMaterial.location(LocationType.FeaturesRowSpot).deleteItemsAtOnce()] as MaterialMove<PlayerColor, MaterialType, LocationType>[])
      .concat(
        movieCardMaterial.location(LocationType.PremiersRowSpot).moveItems((item) => ({
          ...item.location,
          type: LocationType.FeaturesRowSpot
        }))
      )
      .concat(
        movieCardDeck.dealAtOnce(
          {
            type: LocationType.FeaturesRowSpot
          },
          numberOfCardsToDealInFeaturesRow
        ),
        movieCardDeck.dealAtOnce(
          {
            type: LocationType.PremiersRowSpot
          },
          3
        )
      )
      .concat(
        this.material(MaterialType.FirstPlayerMarker).moveItem({
          type: LocationType.FirstPlayerMarkerSpot,
          player: this.nextPlayer
        })
      )
  }
}
