import { CustomMove, Material, MaterialItem, MaterialMove, MoveItem, PlayMoveContext } from '@gamepark/rules-api'
import { cloneDeep } from 'es-toolkit'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { ChooseMovieActionAction } from '../../material/Actions/ChooseMovieActionAction'
import { DiscardAwardCardAction } from '../../material/Actions/DiscardAwardCardAction'
import { PlaceCinemaGuestInReserveAction } from '../../material/Actions/PlaceCinemaGuestInReserveAction'
import { PlaceExitZoneGuestInBagAction } from '../../material/Actions/PlaceExitZoneGuestInBagAction'
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

export class ChooseMovieActionRule extends ActionRule<ChooseMovieActionAction> {
  public consequencesBeforeRuleForPlayer(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }
  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
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
    const isPlayerAdvertisingTokenAvailable =
      this.material(MaterialType.AdvertisingTokens).location(LocationType.PlayerAdvertisingTokenSpot).player(player).length > 0
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

  public onCustomMove(move: CustomMove, context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (!isMovieActionCustomMove(move) && !isPassCurrentActionCustomMove(move)) {
      throw new Error(`Unexpected move type: ${CustomMoveType[move.type]}`)
    }
    const pawnMaterial = this.material(MaterialType.GuestPawns).index(this.action.guestIndex)
    const pawnToExitZoneMove = pawnMaterial.moveItem({
      type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
      player: pawnMaterial.getItem()!.location.player!
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
      this.removeAvailableActionFromMemory(movieCard, move)
      const movieAction = movieCardCharacteristics[movieCard.id.front].getAction(move.data.movieActionNumber)
      consequences.push(...this.processMovieActionAndBuildConsequences(movieAction, player))
      const pendingActions = this.remind<Actions[]>(Memory.PendingActions, player)
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
    this.memorize<Actions[]>(
      Memory.PendingActions,
      (pendingActions) => pendingActions.filter((action) => !(action.type === ActionType.ChooseMovieAction && action.guestIndex === this.action.guestIndex)),
      player
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
      case MovieAction.DrawAwardCard: {
        this.addDrawAwardCardAction(player)
        return [
          this.material(MaterialType.AwardCards).location(LocationType.AwardCardDeckSpot).deck().dealAtOnce(
            {
              type: LocationType.PlayerAwardCardHand,
              player: player
            },
            2
          )
        ]
      }
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
        this.addPlaceGuestInReserveAction(player)
        return []
      }
      case MovieAction.PlaceExitZoneGuestInBag: {
        this.addPlaceExitGuestInBagAction(player)
        return []
      }
      default:
        return []
    }
  }

  private addPlaceExitGuestInBagAction = (player: PlayerColor): void => {
    const action = this.buildActionWithGuestToMoveIfNecessary(ActionType.PlaceExitZoneGuestInBag, player)
    addPendingActionForPlayer(this, action, player)
  }
  private addPlaceGuestInReserveAction = (player: PlayerColor): void => {
    const action = this.buildActionWithGuestToMoveIfNecessary(ActionType.PlaceCinemaGuestInReserve, player)
    addPendingActionForPlayer(this, action, player)
  }
  private addDrawAwardCardAction = (player: PlayerColor): void => {
    const action = this.buildActionWithGuestToMoveIfNecessary(ActionType.DiscardAwardCard, player)
    addPendingActionForPlayer(this, action, player)
  }

  private buildActionWithGuestToMoveIfNecessary(
    type: ActionType.DiscardAwardCard | ActionType.PlaceCinemaGuestInReserve | ActionType.PlaceExitZoneGuestInBag,
    player: PlayerColor
  ): Actions {
    const action: DiscardAwardCardAction | PlaceCinemaGuestInReserveAction | PlaceExitZoneGuestInBagAction = { type: type }
    if (!this.existRemainingChooseMovieActionForGuest(this.action.guestIndex, player)) {
      action.guestIndexToMoveToExitZone = this.action.guestIndex
    }
    return action
  }

  private existRemainingChooseMovieActionForGuest(guestIndex: number, player: PlayerColor): boolean {
    return this.remind<Actions[]>(Memory.PendingActions, player).some((a) => a.type === ActionType.ChooseMovieAction && a.guestIndex === guestIndex)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
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
