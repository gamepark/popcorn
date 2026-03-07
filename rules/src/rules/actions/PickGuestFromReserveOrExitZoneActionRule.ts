import { isMoveItemType, ItemMove, MaterialMove, MoveItem, PlayMoveContext } from '@gamepark/rules-api'
import { GamePhase } from '../../GamePhase'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { PickReserveOrExitZoneGuestAction } from '../../material/Actions/PickReserveOrExitZoneGuestAction'
import { GuestPawn, guestPawns } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayableMovieCardId } from '../../material/MovieCard'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'
import { getBuyingFilmCardConsequences } from './utils/movieOrSeatActionConsequences.util'

export class PickGuestFromReserveOrExitZoneActionRule extends ActionRule<PickReserveOrExitZoneGuestAction> {
  public getActivePlayerLegalMoves(currentPlayer: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const guestColor = this.guestPawnColorFromMemory
    if (guestColor === GuestPawn.White) {
      return this.game.players.flatMap((player) =>
        this.material(MaterialType.GuestPawns)
          .id(GuestPawn.White)
          .location(
            (location) =>
              (location.player !== currentPlayer && location.type === LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard) ||
              (location.player === currentPlayer && location.type !== LocationType.PlayerGuestPawnsUnderClothBagSpot) ||
              location.type === LocationType.GuestPawnReserveSpot
          )
          .moveItems({
            type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
            player: player
          })
      )
    }
    if (guestColor !== undefined) {
      const reserveGuestMaterial = this.material(MaterialType.GuestPawns).location(LocationType.GuestPawnReserveSpot).id<GuestPawn>(guestColor)
      if (reserveGuestMaterial.length > 0) {
        return reserveGuestMaterial.moveItems({
          type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
          player: currentPlayer
        })
      }
      const exitZoneGuestsMaterial = this.material(MaterialType.GuestPawns)
        .location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard)
        .player((player) => player !== currentPlayer)
        .id<GuestPawn>(guestColor)
      return exitZoneGuestsMaterial.moveItems({
        type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
        player: currentPlayer
      })
    } else {
      const reservePawnMaterial = this.material(MaterialType.GuestPawns).location(LocationType.GuestPawnReserveSpot)
      const exitZonePawnMaterial = this.material(MaterialType.GuestPawns)
        .location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard)
        .player((player) => player !== currentPlayer)
      const playerBagLocation = { type: LocationType.PlayerGuestPawnsUnderClothBagSpot, player: currentPlayer }
      return guestPawns
        .filter((color) => color !== GuestPawn.White)
        .flatMap((color) => {
          const guestInReserve = reservePawnMaterial.id(color)
          if (guestInReserve.length > 0) {
            return guestInReserve.moveItems(playerBagLocation)
          }
          return exitZonePawnMaterial.id(color).moveItems(playerBagLocation)
        })
    }
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) &&
      move.location.type === LocationType.PlayerGuestPawnsUnderClothBagSpot
    ) {
      const playerDoingAction = this.getPlayerDoingAction(move)
      this.removeCurrentActionForPlayer(playerDoingAction)
      if (this.currentPhase === GamePhase.BuyingPhase && this.action.boughtCardData !== undefined) {
        const boughtCard = this.material(MaterialType.MovieCards).index(this.action.boughtCardData.boughtCardIndex).getItem<Required<PlayableMovieCardId>>()
        if (boughtCard === undefined) {
          throw new Error('Invalid buying card move')
        }
        this.memorize<Actions[]>(
          Memory.PendingActions,
          (pendingActions) => pendingActions.filter((action) => action.type !== ActionType.BuyMovieCard),
          this.action.boughtCardData.player
        )
        return getBuyingFilmCardConsequences(this, playerDoingAction, boughtCard, this.action.boughtCardData.destinationSpot)
      }
    }
    return super.afterItemMove(move, context)
  }

  public consequencesBeforeRuleForPlayer(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }

  private get guestPawnColorFromMemory(): GuestPawn | undefined {
    return this.action.guest
  }

  private getPlayerDoingAction(move: MoveItem<PlayerColor, MaterialType, LocationType>): PlayerColor {
    if (this.currentPhase === GamePhase.BuyingPhase && this.game.rule?.player !== undefined) {
      return this.game.rule.player
    } else if (this.currentPhase === GamePhase.ShowingsPhase && move.location.player !== undefined) {
      return move.location.player
    }
    throw new Error('Invalid game state')
  }
}
