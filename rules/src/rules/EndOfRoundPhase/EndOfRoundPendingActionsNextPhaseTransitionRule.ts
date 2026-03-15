import { MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MoneyToken, moneyTokens } from '../../material/MoneyToken'
import { MovieAction, MovieCard, movieCardCharacteristics, PlayableMovieCardId } from '../../material/MovieCard'
import { BuyableTheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { AvailableMovieActionsMemory, Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

const BUYABLE_THEATER_TILES_LOCATION_TYPES = [
  LocationType.OneSeatTheaterTileRowSpot,
  LocationType.TwoSeatTheaterTileRowSpot,
  LocationType.ThreeSeatTheaterTileRowSpot
]

export class EndOfRoundPendingActionsNextPhaseTransitionRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  public getActivePlayerLegalMoves(_player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const pendingActionsPerPlayer = this.buildPlayersPendingActions()
    pendingActionsPerPlayer.forEach(({ player, pendingActions }) => {
      this.memorize(Memory.PendingActions, pendingActions, player)
    })
    const movieCardIds = this.material(MaterialType.MovieCards)
      .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
      .getItems<Required<PlayableMovieCardId>>()
      .map((movieCard) => movieCard.id.front)
    this.memorize<AvailableMovieActionsMemory>(Memory.AvailableMovieActions, (previousAvailableMovieActionsMemory) => {
      return movieCardIds.reduce(
        (newAvailableMovieActions, movieCardId) => {
          return {
            ...newAvailableMovieActions,
            [movieCardId]: movieCardCharacteristics[movieCardId].actions
              .map((movieAction) => movieAction !== MovieAction.None)
              .slice(0, previousAvailableMovieActionsMemory[movieCardId]!.length - 1)
          }
        },
        {} as Partial<Record<MovieCard, boolean[]>>
      )
    })
    const nextPlayer = this.material(MaterialType.FirstPlayerMarker).getItem()!.location.player!
    const nextPlayerIndex = this.game.players.indexOf(nextPlayer)
    const playerTurnOrder = this.game.players.slice(nextPlayerIndex).concat(this.game.players.slice(0, nextPlayerIndex))
    const nextPlayerToPlay = playerTurnOrder.find((p) =>
      pendingActionsPerPlayer.find(({ player, pendingActions }) => player === p && pendingActions.length > 0)
    )
    if (nextPlayerToPlay === undefined) {
      return [this.startSimultaneousRule(RuleId.ShowingsPhaseRule)]
    } else {
      return [this.startPlayerTurn(RuleId.BuyingPhaseRule, nextPlayerToPlay)]
    }
  }

  private buildPlayersPendingActions(): { player: PlayerColor; pendingActions: Actions[] }[] {
    const advertisingTokenOnAdvertisingBoardMaterial = this.material(MaterialType.AdvertisingTokens).location(
      LocationType.AdvertisingTokenSpotOnAdvertisingBoard
    )
    const buyableTheaterTilesMaterial = this.material(MaterialType.TheaterTiles).location((location) =>
      BUYABLE_THEATER_TILES_LOCATION_TYPES.includes(location.type)
    )
    const buyableMovieCardsMaterial = this.material(MaterialType.MovieCards).location(
      (location) => LocationType.PremiersRowSpot === location.type || LocationType.FeaturesRowSpot === location.type
    )
    return this.game.players.map((player) => {
      const playerPendingActions: Actions[] = []
      const playerMoney = this.material(MaterialType.MoneyTokens).location(LocationType.PlayerMoneyPileSpot).player(player).money<MoneyToken>(moneyTokens).count
      const theaterTilePlayerCanAfford = buyableTheaterTilesMaterial.id<Required<BuyableTheaterTileId>>(
        (theaterTileId) => theaterTilesCharacteristics[theaterTileId.front].getPrice() <= playerMoney
      )
      const movieCardsPlayerCanAfford = buyableMovieCardsMaterial.filter<Required<PlayableMovieCardId>>(
        (movieCard) =>
          movieCardCharacteristics[movieCard.id.front].getPrice(movieCard.location.type as LocationType.PremiersRowSpot | LocationType.FeaturesRowSpot) <=
          playerMoney
      )
      if (movieCardsPlayerCanAfford.length > 0) {
        playerPendingActions.push({ type: ActionType.BuyMovieCard })
      }
      if (theaterTilePlayerCanAfford.length > 0) {
        playerPendingActions.push({ type: ActionType.BuyTheaterTile })
      }
      if (advertisingTokenOnAdvertisingBoardMaterial.id<PlayerColor>(player).length > 0) {
        playerPendingActions.push({ type: ActionType.UseAdvertisingToken })
      }
      return { player: player, pendingActions: playerPendingActions }
    })
  }
}
