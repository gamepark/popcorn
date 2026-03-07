import { CustomMove, Material, MaterialMove, MoveItem, PlayMoveContext } from '@gamepark/rules-api'
import { cloneDeep } from 'es-toolkit'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { ChooseMovieActionAction } from '../../material/Actions/ChooseMovieActionAction'
import { PlaceCinemaGuestInReserveAction } from '../../material/Actions/PlaceCinemaGuestInReserveAction'
import { PlaceExitZoneGuestInBagAction } from '../../material/Actions/PlaceExitZoneGuestInBagAction'
import { CustomMoveType, isMovieActionCustomMove, isPassCurrentActionCustomMove } from '../../material/CustomMoveType'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MovieAction, MovieCard, movieCardCharacteristics, MovieCardId, PlayableMovieCardId } from '../../material/MovieCard'
import { TheaterTileId } from '../../material/TheaterTile'
import { AvailableMovieActionsMemory, Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'
import { addPendingActionForPlayer } from './utils/addPendingActionForPlayer.util'
import {
  canPlayerPlaceAGuestAfterSeatOrMovieAction,
  getAdvertisingTokenMove,
  getAudienceTrackMove,
  getDrawGuestMovesAndAddPendingActionIfNecessary,
  getMoneyMove
} from './utils/movieOrSeatActionConsequences.util'

const MOVIE_ACTIONS_NOT_NEEDING_GUEST_MOVE = [
  MovieAction.PlaceGuestInReserve,
  MovieAction.PlaceExitZoneGuestInBag,
  MovieAction.DrawGuestAndPlaceThem,
  MovieAction.DrawAwardCard
]

export class ChooseMovieActionRule extends ActionRule<ChooseMovieActionAction> {
  public consequencesBeforeRuleForPlayer(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }
  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const guestPawn = this.material(MaterialType.GuestPawns).index(this.action.guestIndex).getItems<GuestPawn>()[0]
    const currentTile = this.material(MaterialType.TheaterTiles).index(guestPawn.location.parent).getItems<Required<TheaterTileId>>()[0]
    const currentMovieMaterial = this.material(MaterialType.MovieCards)
      .player(player)
      .location((location) => location.type === LocationType.MovieCardSpotOnBottomPlayerCinemaBoard && location.x === currentTile.location.x)
    const currentMovie = currentMovieMaterial.getItems<Required<MovieCardId>>()[0]
    const currentMovieIndex = currentMovieMaterial.getIndex()
    const availableMovieActions = this.remind<AvailableMovieActionsMemory>(Memory.AvailableMovieActions)
    return (
      availableMovieActions[currentMovie.id.front]
        ?.map((isAvailable, index) => [index, isAvailable])
        .filter(([_, isAvailable]) => isAvailable)
        .map(([actionIndex, _]) =>
          this.customMove<CustomMoveType>(CustomMoveType.MovieAction, {
            movieCardIndex: currentMovieIndex,
            movieActionNumber: actionIndex
          })
        )
        .concat(this.customMove<CustomMoveType>(CustomMoveType.PassCurrentAction, { player: player })) ?? []
    )
  }

  public onCustomMove(move: CustomMove, context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const pawnMaterial = this.material(MaterialType.GuestPawns).index(this.action.guestIndex)
    const pawnToExitZoneMove = pawnMaterial.moveItem({
      type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
      player: move.data.player
    })
    if (isPassCurrentActionCustomMove(move)) {
      return [pawnToExitZoneMove]
    }
    if (isMovieActionCustomMove(move)) {
      const movieCard = this.material(MaterialType.MovieCards).index(move.data.movieCardIndex).getItems<Required<PlayableMovieCardId>>()[0]
      const player = movieCard.location.player
      if (player === undefined) {
        throw new Error(`The movie card was not found: ${MovieCard[movieCard.id.front]}`)
      }
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
      this.removeCurrentActionForPlayer(player)
      this.memorize<AvailableMovieActionsMemory>(Memory.AvailableMovieActions, (previousValue) => {
        const newValue = cloneDeep(previousValue)
        const movieActionsAvailabilities = newValue[movieCard.id.front]
        if (movieActionsAvailabilities === undefined) {
          throw new Error('Error with memory handling')
        }
        movieActionsAvailabilities[move.data.movieActionNumber] = false
        return newValue
      })
      const movieAction = movieCardCharacteristics[movieCard.id.front].getAction(move.data.movieActionNumber)
      consequences.push(...this.processMovieActionAndBuildConsequences(movieAction, player))
      const pendingActions = this.remind<Actions[]>(Memory.PendingActions, player)
      if (!pendingActions.some((action) => action.type === ActionType.ChooseMovieAction && action.guestIndex === this.action.guestIndex)) {
        consequences.push(...this.addMovePawnConsequence(movieAction, player, pawnMaterial, pendingActions, pawnToExitZoneMove))
      }
      return consequences
    }
    return super.onCustomMove(move, context)
  }

  private addMovePawnConsequence(
    movieAction: MovieAction | undefined,
    player: PlayerColor,
    pawnMaterial: Material<PlayerColor, MaterialType, LocationType>,
    pendingActions: Actions[],
    pawnToExitZoneMove: MoveItem<PlayerColor, MaterialType, LocationType>
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      movieAction === undefined ||
      (movieAction === MovieAction.DrawGuestAndPlaceThem && !canPlayerPlaceAGuestAfterSeatOrMovieAction(this, player)) ||
      !MOVIE_ACTIONS_NOT_NEEDING_GUEST_MOVE.includes(movieAction)
    ) {
      const currentTileIndex = pawnMaterial.getItem()!.location.parent
      const otherGuestsOnSameTile = this.material(MaterialType.GuestPawns)
        .location(LocationType.GuestPawnSpotOnTheaterTile)
        .player(player)
        .parent(currentTileIndex)
        .index((i) => i !== this.action.guestIndex)
        .getIndexes()
      const guestIndexesToMove = otherGuestsOnSameTile.reduce(
        (accumulator, currentIndex) => {
          if (!accumulator.firstGuestWithActionFound) {
            accumulator.firstGuestWithActionFound = pendingActions.some((a) => 'guestIndex' in a && a.guestIndex === currentIndex)
            if (!accumulator.firstGuestWithActionFound) {
              accumulator.indexesToMove.push(currentIndex)
            }
          }
          return accumulator
        },
        { firstGuestWithActionFound: false, indexesToMove: [] as number[] }
      ).indexesToMove
      return [
        guestIndexesToMove.length === 0
          ? pawnToExitZoneMove
          : this.material(MaterialType.GuestPawns).index(guestIndexesToMove.concat(this.action.guestIndex)).moveItemsAtOnce({
              type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
              player: player
            })
      ]
    }
    return []
  }

  private processMovieActionAndBuildConsequences(
    movieAction: MovieAction | undefined,
    player: PlayerColor
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    switch (movieAction) {
      case MovieAction.AdvertisingTokenOnAnyGuest:
      case MovieAction.AdvertisingTokenOnBlueGuest:
      case MovieAction.AdvertisingTokenOnGreenGuest:
      case MovieAction.AdvertisingTokenOnRedGuest:
      case MovieAction.AdvertisingTokenOnYellowGuest:
      case MovieAction.AdvertisingTokenOnWhiteGuestToBag:
        return getAdvertisingTokenMove(this, player, movieAction)
      case MovieAction.AudienceTrackAdvance:
        return getAudienceTrackMove(this, player)
      case MovieAction.DrawAwardCard:
        addPendingActionForPlayer(
          this,
          {
            type: ActionType.DiscardAwardCard,
            guestIndexToMove: this.action.guestIndex
          },
          player
        )
        return [
          this.material(MaterialType.AwardCards).location(LocationType.AwardCardDeckSpot).deck().dealAtOnce(
            {
              type: LocationType.PlayerAwardCardHand,
              player: player
            },
            2
          )
        ]
      case MovieAction.DrawGuestAndPlaceThem: {
        const guestIndex = this.existRemainingChooseMovieActionForGuest(this.action.guestIndex, player) ? undefined : this.action.guestIndex
        return getDrawGuestMovesAndAddPendingActionIfNecessary(this, player, guestIndex)
      }
      case MovieAction.Get1Popcorn:
        return getMoneyMove(this, player, MaterialType.PopcornTokens, 1)
      case MovieAction.Get2Popcorn:
        return getMoneyMove(this, player, MaterialType.PopcornTokens, 2)
      case MovieAction.Get3Popcorn:
        return getMoneyMove(this, player, MaterialType.PopcornTokens, 3)
      case MovieAction.Get4Popcorn:
        return getMoneyMove(this, player, MaterialType.PopcornTokens, 4)
      case MovieAction.Get1Money:
        return getMoneyMove(this, player, MaterialType.MoneyTokens, 1)
      case MovieAction.Get2Money:
        return getMoneyMove(this, player, MaterialType.MoneyTokens, 2)
      case MovieAction.Get3Money:
        return getMoneyMove(this, player, MaterialType.MoneyTokens, 3)
      case MovieAction.Get4Money:
        return getMoneyMove(this, player, MaterialType.MoneyTokens, 4)
      case MovieAction.PlaceGuestInReserve: {
        const action: PlaceCinemaGuestInReserveAction = { type: ActionType.PlaceCinemaGuestInReserve }
        if (!this.existRemainingChooseMovieActionForGuest(this.action.guestIndex, player)) {
          action.guestIndexToMoveToExitZone = this.action.guestIndex
        }
        addPendingActionForPlayer(this, action, player)
        return []
      }
      case MovieAction.PlaceExitZoneGuestInBag: {
        const action: PlaceExitZoneGuestInBagAction = { type: ActionType.PlaceExitZoneGuestInBag }
        if (!this.existRemainingChooseMovieActionForGuest(this.action.guestIndex, player)) {
          action.guestIndexToMoveToExitZone = this.action.guestIndex
        }
        addPendingActionForPlayer(this, action, player)
        return []
      }
      default:
        return []
    }
  }

  private existRemainingChooseMovieActionForGuest(guestIndex: number, player: PlayerColor): boolean {
    return this.remind<Actions[]>(Memory.PendingActions, player).some((a) => a.type === ActionType.ChooseMovieAction && a.guestIndex === guestIndex)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }
}
