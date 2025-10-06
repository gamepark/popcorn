import { MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { Actions } from '../material/Actions/Actions'
import { ActionType } from '../material/Actions/ActionType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayableMovieCardId } from '../material/MovieCard'
import { AvailableMovieActionsMemory, Memory } from '../Memory'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class EndOfRoundPhaseRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId> {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    this.initializePlayersPendingActions()
    return this.unselectTheaterTiles()
      .concat(this.getTheatricalRunConsequences())
      .concat(this.getNewLineupConsequences())
      .concat(
        this.material(MaterialType.FirstPlayerMarker).moveItem({
          type: LocationType.FirstPlayerMarkerSpot,
          player: this.nextPlayer
        })
      )
      .concat(this.startPlayerTurn(RuleId.BuyingPhaseRule, this.nextPlayer))
  }

  private getTheatricalRunConsequences(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const sliderMaterial = this.material(MaterialType.LobbySliders).location(LocationType.LobbySliderSpotOnTopPlayerCinemaBoard)
    this.memorize<AvailableMovieActionsMemory>(Memory.AvailableMovieActions, (availableMovieActionMemory) => {
      Object.values(availableMovieActionMemory).forEach((array) => {
        if (array.length > 0) {
          array.pop()
          array.fill(true)
        }
      })
      return availableMovieActionMemory
    })
    return this.material(MaterialType.MovieCards)
      .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
      .getItems<Required<PlayableMovieCardId>>()
      .map((movieCard) =>
        sliderMaterial
          .player(movieCard.location.player)
          .location((l) => l.x === movieCard.location.x)
          .moveItem((item) => ({
            ...item.location,
            y: Math.min(4, (item.location.y ?? 0) + 1)
          }))
      )
  }

  private getNewLineupConsequences(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const movieCardMaterial = this.material(MaterialType.MovieCards)
    const movieCardDeck = movieCardMaterial.location(LocationType.MovieCardDeckSpot).deck()
    const numberOfCardsToDealInFeaturesRow = 3 - movieCardMaterial.location(LocationType.PremiersRowSpot).length
    return [movieCardMaterial.location(LocationType.FeaturesRowSpot).deleteItemsAtOnce() as MaterialMove<PlayerColor, MaterialType, LocationType>]
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
  }

  private initializePlayersPendingActions(): void {
    const advertisingTokenOnAdvertisingBoardMaterial = this.material(MaterialType.AdvertisingTokens).location(
      LocationType.AdvertisingTokenSpotOnAdvertisingBoard
    )
    this.game.players.forEach((player) => {
      const playerPendingActions: Actions[] = [{ type: ActionType.BuyMovieCard }, { type: ActionType.BuyTheaterTile }]
      if (advertisingTokenOnAdvertisingBoardMaterial.player(player).length > 0) {
        playerPendingActions.push({ type: ActionType.UseAdvertisingToken })
      }
      this.memorize<Actions[]>(Memory.PendingActions, playerPendingActions, player)
    })
  }

  private unselectTheaterTiles(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.TheaterTiles).selected(true).unselectItems()
  }
}
