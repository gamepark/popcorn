import { PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MovieCard, MovieCardType } from '../../material/MovieCard'
import { PopcornMove } from '../../material/PopcornMoves'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export class EndOfRoundPhaseNewLineUpRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  public getActivePlayerLegalMoves(_player: PlayerColor): PopcornMove[] {
    return []
  }

  public getMovesAfterPlayersDone(): PopcornMove[] {
    return []
  }

  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): PopcornMove[] {
    return this.getNewLineupConsequences().concat(this.startSimultaneousRule(RuleId.EndOfRoundPendingActionsNextPhaseTransitionRule, []))
  }

  private getNewLineupConsequences(): PopcornMove[] {
    const movieCardMaterial = this.material(MaterialType.MovieCards)
    const movieCardDeck = movieCardMaterial.location(LocationType.MovieCardDeckSpot).deck()
    const numberOfCardsToDealInFeaturesRow = 3 - movieCardMaterial.location(LocationType.PremiersRowSpot).length
    const currentFirstPlayer = this.material(MaterialType.FirstPlayerMarker).getItem()!.location.player!
    const nextPLayer = this.game.players[(this.game.players.indexOf(currentFirstPlayer) + 1) % this.game.players.length]
    const featuresMaterial = movieCardMaterial.location(LocationType.FeaturesRowSpot)
    const deleteFeaturesMoves: PopcornMove[] = featuresMaterial.exists ? [featuresMaterial.deleteItemsAtOnce()] : []
    const premiersMoves = movieCardMaterial.location(LocationType.PremiersRowSpot).moveItems((item) => ({
      ...item.location,
      type: LocationType.FeaturesRowSpot
    }))
    const dealMoves = [
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
    ]
    const finalShowingsMove =
      movieCardDeck.length <= (this.game.players.length === 2 ? 10 : 5)
        ? movieCardMaterial.createItem({
            id: { front: MovieCard.FinalShowing, back: MovieCardType.Movie },
            location: { type: LocationType.FinalShowingCardSpot }
          })
        : []
    return deleteFeaturesMoves.concat(
      premiersMoves,
      dealMoves,
      this.material(MaterialType.FirstPlayerMarker).moveItem({
        type: LocationType.FirstPlayerMarkerSpot,
        player: nextPLayer
      }),
      finalShowingsMove
    )
  }
}
