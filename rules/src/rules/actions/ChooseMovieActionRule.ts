import { CustomMove, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { cloneDeep } from 'es-toolkit'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { ChooseMovieActionAction } from '../../material/Actions/ChooseMovieActionAction'
import { CustomMoveType, isMovieActionCustomMove, isPassCurrentActionCustomMove } from '../../material/CustomMoveType'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MovieAction, MovieCard, movieCardCharacteristics, MovieCardId, PlayableMovieCardId } from '../../material/MovieCard'
import { TheaterTileId } from '../../material/TheaterTile'
import { AvailableMovieActionsMemory, Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { getAdvertisingTokenMove, getAudienceTrackMove, getMoneyMove } from '../utils/movieCardConsequences.util'
import { ActionRule } from './ActionRule'
import { addPendingActionForPlayer } from './utils/addPendingActionForPlayer.util'

const MOVIE_ACTIONS_NOT_NEEDING_GUEST_MOVE = [MovieAction.PlaceGuestInReserve, MovieAction.PlaceExitZoneGuestInBag, MovieAction.DrawGuestAndPlaceThem]

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
    return (
      this.remind<AvailableMovieActionsMemory>(Memory.AvailableMovieActions)
        [currentMovie.id.front]?.entries()
        .filter(([_, isAvailable]) => isAvailable)
        .map(([actionIndex, _]) =>
          this.customMove<CustomMoveType>(CustomMoveType.MovieAction, {
            movieCardIndex: currentMovieIndex,
            movieActionNumber: actionIndex
          })
        )
        .toArray()
        .concat(this.customMove<CustomMoveType>(CustomMoveType.PassCurrentAction, { player: player })) ?? []
    )
  }

  public onCustomMove(move: CustomMove, context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const pawnMaterial = this.material(MaterialType.GuestPawns).index(this.action.guestIndex)
    if (isPassCurrentActionCustomMove(move)) {
      return [
        pawnMaterial.moveItem({
          type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
          player: move.data.player
        })
      ]
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
      switch (movieAction) {
        case MovieAction.AdvertisingTokenOnAnyGuest:
        case MovieAction.AdvertisingTokenOnBlueGuest:
        case MovieAction.AdvertisingTokenOnGreenGuest:
        case MovieAction.AdvertisingTokenOnRedGuest:
        case MovieAction.AdvertisingTokenOnYellowGuest:
        case MovieAction.AdvertisingTokenOnWhiteGuestToBag:
          consequences.push(...getAdvertisingTokenMove(this, player, movieAction))
          break
        case MovieAction.AudienceTrackAdvance:
          consequences.push(...getAudienceTrackMove(this, player))
          break
        case MovieAction.DrawAwardCard:
          consequences.push(
            this.material(MaterialType.AwardCards).location(LocationType.AwardCardDeckSpot).deck().dealAtOnce(
              {
                type: LocationType.PlayerAwardCardHand,
                player: player
              },
              2
            )
          )
          addPendingActionForPlayer(this, { type: ActionType.DiscardAwardCard }, player)
          break
        case MovieAction.DrawGuestAndPlaceThem: {
          const guestPawnInBagMaterial = this.material(MaterialType.GuestPawns).player(player).location(LocationType.PlayerGuestPawnsUnderClothBagSpot)
          if (guestPawnInBagMaterial.length > 0) {
            consequences.push(
              guestPawnInBagMaterial.deck().dealOne({
                type: LocationType.PlayerShowingsDrawnGuestSpot,
                player: player
              })
            )
          } else {
            const exitZoneGuests = this.material(MaterialType.GuestPawns).player(player).location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard)
            consequences.push(
              exitZoneGuests.moveItemsAtOnce({
                type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
                player: player
              }),
              exitZoneGuests.shuffle()
            )
          }
          addPendingActionForPlayer(this, { type: ActionType.PlaceGuests, placeOneGuest: true, guestIndexToMoveToExitZone: this.action.guestIndex }, player)
          break
        }
        case MovieAction.Get1Popcorn:
          consequences.push(...getMoneyMove(this, player, MaterialType.PopcornTokens, 1))
          break
        case MovieAction.Get2Popcorn:
          consequences.push(...getMoneyMove(this, player, MaterialType.PopcornTokens, 2))
          break
        case MovieAction.Get3Popcorn:
          consequences.push(...getMoneyMove(this, player, MaterialType.PopcornTokens, 3))
          break
        case MovieAction.Get4Popcorn:
          consequences.push(...getMoneyMove(this, player, MaterialType.PopcornTokens, 4))
          break
        case MovieAction.Get1Money:
          consequences.push(...getMoneyMove(this, player, MaterialType.MoneyTokens, 1))
          break
        case MovieAction.Get2Money:
          consequences.push(...getMoneyMove(this, player, MaterialType.MoneyTokens, 2))
          break
        case MovieAction.Get3Money:
          consequences.push(...getMoneyMove(this, player, MaterialType.MoneyTokens, 3))
          break
        case MovieAction.Get4Money:
          consequences.push(...getMoneyMove(this, player, MaterialType.MoneyTokens, 4))
          break
        case MovieAction.PlaceGuestInReserve:
          addPendingActionForPlayer(this, { type: ActionType.PlaceCinemaGuestInReserve, guestIndexToMoveToExitZone: this.action.guestIndex }, player)
          break
        case MovieAction.PlaceExitZoneGuestInBag:
          addPendingActionForPlayer(this, { type: ActionType.PlaceExitZoneGuestInBag, guestIndexToMoveToExitZone: this.action.guestIndex }, player)
          break
        case MovieAction.None:
          break
      }
      if (
        !this.remind<Actions[]>(Memory.PendingActions, player).some(
          (action) => action.type === ActionType.ChooseMovieAction && action.guestIndex === this.action.guestIndex
        )
      ) {
        if (movieAction === undefined || !MOVIE_ACTIONS_NOT_NEEDING_GUEST_MOVE.includes(movieAction)) {
          consequences.push(
            pawnMaterial.moveItem({
              type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
              player: player
            })
          )
        }
      }
      return consequences
    }
    return super.onCustomMove(move, context)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }
}
