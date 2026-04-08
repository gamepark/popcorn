import { CustomMove, Material, MaterialItem, MoveItem, PlayMoveContext } from '@gamepark/rules-api'
import { cloneDeep } from 'es-toolkit'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { ChooseMovieActionAction } from '../../material/Actions/ChooseMovieActionAction'
import { CustomMoveType, isMovieActionCustomMove, isPassCurrentActionCustomMove, MovieActionCustomMove } from '../../material/CustomMoveType'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import {
  MOVIE_ACTIONS_NEEDING_AVAILABLE_ADVERTISING_TOKEN,
  MOVIE_ACTIONS_NOT_NEEDING_GUEST_MOVE,
  MovieAction,
  MovieCard,
  movieCardCharacteristics,
  PlayableMovieCardId
} from '../../material/MovieCard'
import { PopcornMove } from '../../material/PopcornMoves'
import { TheaterTileId } from '../../material/TheaterTile'
import { AvailableMovieActionsMemory, Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { AudienceMoveOrMovieOrSeatActionRule } from './AudienceMoveOrMovieOrSeatActionRule'

export class ChooseMovieActionRule extends AudienceMoveOrMovieOrSeatActionRule<ChooseMovieActionAction> {
  public consequencesBeforeRuleForPlayer(): PopcornMove[] {
    return []
  }
  public getActivePlayerLegalMoves(player: PlayerColor): PopcornMove[] {
    const guestPawn = this.material(MaterialType.GuestPawns).index(this.action.guestIndex).getItems<GuestPawn>()[0]
    if (guestPawn.location.type !== LocationType.GuestPawnSpotOnTheaterTile) {
      return []
    }
    const currentTile = this.material(MaterialType.TheaterTiles).index(guestPawn.location.parent).getItems<Required<TheaterTileId>>()[0]
    const currentMovieMaterial = this.material(MaterialType.MovieCards)
      .player(player)
      .location(
        (location) =>
          location.type === LocationType.MovieCardSpotOnBottomPlayerCinemaBoard && currentTile !== undefined && location.x === currentTile.location.x
      )
    const currentMovie = currentMovieMaterial.getItems<Required<PlayableMovieCardId>>()[0]
    const currentMovieIndex = currentMovieMaterial.getIndex()
    const availableMovieActions = this.remind<AvailableMovieActionsMemory>(Memory.AvailableMovieActions)
    const isPlayerAdvertisingTokenAvailable = this.material(MaterialType.AdvertisingTokens)
      .location(LocationType.PlayerAdvertisingTokenSpot)
      .player(player).exists
    return (
      availableMovieActions[currentMovie.id.front]
        ?.map((isAvailable, index) => [index, isAvailable] as [number, boolean])
        .filter(([index, isAvailable]) => this.isMovieActionAvailable(currentMovie.id.front, index, isAvailable, isPlayerAdvertisingTokenAvailable))
        .map(([actionIndex, _]) =>
          this.customMove<CustomMoveType>(CustomMoveType.MovieAction, {
            movieCardIndex: currentMovieIndex,
            movieActionNumber: actionIndex
          })
        )
        .concat(this.customMove<CustomMoveType>(CustomMoveType.PassCurrentAction, { player: player })) ?? []
    )
  }

  public onCustomMove(move: CustomMove, context?: PlayMoveContext): PopcornMove[] {
    if (!isMovieActionCustomMove(move) && !isPassCurrentActionCustomMove(move)) {
      throw new Error(`Unexpected move type: ${CustomMoveType[move.type]}`)
    }
    const pawnMaterial = this.material(MaterialType.GuestPawns).index(this.action.guestIndex)
    const pawnToExitZoneMove = pawnMaterial.moveItem({
      type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
      player: pawnMaterial.getItem()!.location.player!
    })
    if (isPassCurrentActionCustomMove(move)) {
      this.removeCurrentActionForPlayer(move.data.player)
      return this.existsPendingActionForPlayer(move.data.player, (a) => a.type === ActionType.ChooseMovieAction && a.guestIndex === this.action.guestIndex)
        ? []
        : [pawnToExitZoneMove]
    }
    if (isMovieActionCustomMove(move)) {
      const movieCard = this.material(MaterialType.MovieCards).index(move.data.movieCardIndex).getItems<Required<PlayableMovieCardId>>()[0]
      const player = movieCard.location.player
      if (player === undefined) {
        throw new Error(`The movie card was not found: ${MovieCard[movieCard.id.front]}`)
      }
      const consequences: PopcornMove[] = []
      this.removeCurrentActionForPlayer(player)
      this.removeAvailableActionFromMemory(movieCard, move)
      const movieAction = movieCardCharacteristics[movieCard.id.front].getAction(move.data.movieActionNumber)
      const existsAnotherPendingActionForGuest = this.existsPendingActionForPlayer(
        player,
        (a) => a.type === ActionType.ChooseMovieAction && a.guestIndex === this.action.guestIndex
      )
      const guestIndex = existsAnotherPendingActionForGuest ? undefined : this.action.guestIndex
      consequences.push(...this.processMovieActionAndBuildConsequences(movieAction, player, guestIndex))
      const pendingActions = this.getPendingActionsForPlayer(player)
      const existsAvailableMovieAction = this.remind<AvailableMovieActionsMemory>(Memory.AvailableMovieActions)[movieCard.id.front]!.some(
        (available) => available
      )
      if (
        !pendingActions.some((action) => action.type === ActionType.ChooseMovieAction && action.guestIndex === this.action.guestIndex) ||
        !existsAvailableMovieAction
      ) {
        consequences.push(...this.addMovePawnConsequence(movieAction, player, pawnMaterial, pendingActions, pawnToExitZoneMove))
        if (!existsAvailableMovieAction) {
          this.removeChooseMovieActionIfNoActionsAvailable(player)
        }
      }
      return consequences
    }
    return super.onCustomMove(move, context)
  }

  private removeChooseMovieActionIfNoActionsAvailable = (player: PlayerColor): void => {
    this.updatePendingActionsForPlayer(player, (pendingActions) =>
      pendingActions.filter((action) => !(action.type === ActionType.ChooseMovieAction && action.guestIndex === this.action.guestIndex))
    )
  }
  private removeAvailableActionFromMemory = (
    movieCard: MaterialItem<PlayerColor, LocationType, Required<PlayableMovieCardId>>,
    move: MovieActionCustomMove
  ): void => {
    this.memorize<AvailableMovieActionsMemory>(Memory.AvailableMovieActions, (previousValue) => {
      const newValue = cloneDeep(previousValue)
      const movieActionsAvailabilities = newValue[movieCard.id.front]
      if (movieActionsAvailabilities === undefined) {
        throw new Error('Error with memory handling')
      }
      movieActionsAvailabilities[move.data.movieActionNumber] = false
      return newValue
    })
  }

  private addMovePawnConsequence(
    movieAction: MovieAction | undefined,
    player: PlayerColor,
    pawnMaterial: Material<PlayerColor, MaterialType, LocationType>,
    pendingActions: Actions[],
    pawnToExitZoneMove: MoveItem<PlayerColor, MaterialType, LocationType>
  ): PopcornMove[] {
    if (
      movieAction === undefined ||
      (movieAction === MovieAction.DrawGuestAndPlaceThem && !this.canPlayerPlaceAGuestAfterSeatOrMovieAction(player, this.action.guestIndex)) ||
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

  public getMovesAfterPlayersDone(): PopcornMove[] {
    return []
  }

  private isMovieActionAvailable(
    front: Exclude<MovieCard, MovieCard.FinalShowing>,
    index: number,
    isAvailable: boolean,
    isPlayerAdvertisingTokenAvailable: boolean
  ): boolean {
    const action = movieCardCharacteristics[front].getAction(index)!
    return (
      isAvailable &&
      (!MOVIE_ACTIONS_NEEDING_AVAILABLE_ADVERTISING_TOKEN.includes(action) ||
        (MOVIE_ACTIONS_NEEDING_AVAILABLE_ADVERTISING_TOKEN.includes(movieCardCharacteristics[front].getAction(index)!) && isPlayerAdvertisingTokenAvailable))
    )
  }
}
