import { isMovieActionCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import {
  isPopcornMoveItemType,
  isPopcornMoveItemTypeAtOnce,
  isPopcornSelectItemType,
  isPopcornShuffleItemType,
  PopcornMove
} from '@gamepark/popcorn/material/PopcornMoves'
import { TheaterTileId } from '@gamepark/popcorn/material/TheaterTile'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ChooseMovieActionRule } from '@gamepark/popcorn/rules/actions/ChooseMovieActionRule'
import { PlaceGuestsActionRule } from '@gamepark/popcorn/rules/actions/PlaceGuestsActionRule'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { ShowingsPhaseRule } from '@gamepark/popcorn/rules/ShowingsPhaseRule'
import { LogDescription, MovePlayedLogDescription } from '@gamepark/react-game'
import { DrawGuestsLogComponent } from './components/ShowingsPhaseComponents/DrawGuestsLogComponent'
import { GuestPlacedOnTheaterTileLogComponent } from './components/ShowingsPhaseComponents/GuestPlacedOnTheaterTileLogComponent'
import { GuestSentToExitZoneLogComponent } from './components/ShowingsPhaseComponents/GuestSentToExitZoneLogComponent'
import { GuestsSentToExitZoneLogComponent } from './components/ShowingsPhaseComponents/GuestsSentToExitZoneLogComponent'
import { MovieActionTakenLogComponent } from './components/ShowingsPhaseComponents/MovieActionTakenLogComponent'
import { SeatActionTakenLogComponent } from './components/ShowingsPhaseComponents/SeatActionTakenLogComponent'
import { ShuffleGuestsLogComponent } from './components/ShowingsPhaseComponents/ShuffleGuestsLogComponent'
import { TheaterTileActivatedLogComponent } from './components/ShowingsPhaseComponents/TheaterTileActivatedLogComponent'
import { playerLogBackground } from './utils/logCss.utils'
import { isPopcornMoveFromLocation } from './utils/PopcornMove.utils'
import { PopcornGame, PopcornMoveComponentContext } from './utils/PopcornTypes.util'

export class ShowingPhaseLogDescription implements LogDescription<PopcornMove, PlayerColor, PopcornGame> {
  public getMovePlayedLogDescription(move: PopcornMove, context: PopcornMoveComponentContext): MovePlayedLogDescription<PopcornMove, PlayerColor> | undefined {
    if (context.game.rule?.id === RuleId.ShowingsPhaseRule) {
      return (
        this.getStartRoundDrawGuestLogDescription(move) ??
        this.getPlaceGuestOnTheaterTileLogDescription(move, context) ??
        this.getTheaterTileActivatedLogDescription(move, context) ??
        this.getChooseSeatActionLogDescription(move, context) ??
        this.getChooseMovieActionLogDescription(move, context) ??
        this.getSeatOrMovieActionConsequencesLogDescription(move, context) ??
        this.getGuestPawnMovesToExitZone(move, context) ??
        this.getSuffleGuestMovesLogDescription(move, context)
      )
    }
    return undefined
  }

  private getStartRoundDrawGuestLogDescription(move: PopcornMove): MovePlayedLogDescription<PopcornMove, PlayerColor> | undefined {
    if (isPopcornMoveItemTypeAtOnce(MaterialType.GuestPawns)(move) && move.location.type === LocationType.PlayerShowingsDrawnGuestSpot) {
      return { Component: DrawGuestsLogComponent, player: move.location.player, css: playerLogBackground(move.location.player!) }
    }
    return
  }

  private getPlaceGuestOnTheaterTileLogDescription(
    move: PopcornMove,
    context: PopcornMoveComponentContext
  ): MovePlayedLogDescription<PopcornMove, PlayerColor> | undefined {
    if (
      isPopcornMoveItemType(MaterialType.GuestPawns)(move) &&
      move.location.type === LocationType.GuestPawnSpotOnTheaterTile &&
      isPopcornMoveFromLocation(move, LocationType.PlayerShowingsDrawnGuestSpot, context)
    ) {
      const rule = new PlaceGuestsActionRule(context.game, move.location.player)
      return {
        Component: GuestPlacedOnTheaterTileLogComponent,
        player: rule.action.placeOneGuest ? undefined : move.location.player,
        css: playerLogBackground(move.location.player!),
        depth: rule.action.placeOneGuest ? 1 : undefined
      }
    }
    return undefined
  }

  private getTheaterTileActivatedLogDescription(
    move: PopcornMove,
    context: PopcornMoveComponentContext
  ): MovePlayedLogDescription<PopcornMove, PlayerColor> | undefined {
    if (isPopcornSelectItemType(MaterialType.TheaterTiles)(move)) {
      const rule = new ShowingsPhaseRule(context.game)
      const selectedTile = rule.material(MaterialType.TheaterTiles).index(move.itemIndex).getItem<Required<TheaterTileId>>()!
      return { Component: TheaterTileActivatedLogComponent, player: selectedTile.location.player, css: playerLogBackground(selectedTile.location.player!) }
    }
    return undefined
  }

  private getChooseSeatActionLogDescription(
    move: PopcornMove,
    context: PopcornMoveComponentContext
  ): MovePlayedLogDescription<PopcornMove, PlayerColor> | undefined {
    if (
      isPopcornSelectItemType(MaterialType.GuestPawns)(move) &&
      isPopcornMoveFromLocation(move, LocationType.GuestPawnSpotOnTheaterTile, context) &&
      move.selected !== false
    ) {
      const rule = new ShowingsPhaseRule(context.game)
      const guest = rule.material(MaterialType.GuestPawns).index(move.itemIndex).getItem<GuestPawn>()!
      return { Component: SeatActionTakenLogComponent, player: guest.location.player, css: playerLogBackground(guest.location.player!) }
    }
    return undefined
  }

  private getChooseMovieActionLogDescription(
    move: PopcornMove,
    context: PopcornMoveComponentContext
  ): MovePlayedLogDescription<PopcornMove, PlayerColor> | undefined {
    if (isMovieActionCustomMove(move)) {
      const rule = new ChooseMovieActionRule(context.game, context.action.playerId)
      const guest = rule.material(MaterialType.GuestPawns).index(rule.action.guestIndex).getItem<GuestPawn>()!
      return {
        Component: MovieActionTakenLogComponent,
        player: rule.action.isSeatAction ? undefined : guest.location.player,
        css: playerLogBackground(guest.location.player!),
        depth: rule.action.isSeatAction ? 1 : undefined
      }
    }
    return undefined
  }

  private getSeatOrMovieActionConsequencesLogDescription(
    move: PopcornMove,
    context: PopcornMoveComponentContext
  ): MovePlayedLogDescription<PopcornMove, PlayerColor> | undefined {
    if (isPopcornMoveItemType(MaterialType.GuestPawns)(move) && isPopcornMoveFromLocation(move, LocationType.PlayerGuestPawnsUnderClothBagSpot, context)) {
      return { Component: DrawGuestsLogComponent, css: playerLogBackground(move.location.player!), depth: 1 }
    }
    return undefined
  }

  private getGuestPawnMovesToExitZone(move: PopcornMove, context: PopcornMoveComponentContext): MovePlayedLogDescription<PopcornMove, PlayerColor> | undefined {
    if (
      isPopcornMoveItemType(MaterialType.GuestPawns)(move) &&
      move.location.type === LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard &&
      isPopcornMoveFromLocation(move, LocationType.GuestPawnSpotOnTheaterTile, context)
    ) {
      const rule = new ShowingsPhaseRule(context.game)
      const locationBeforeMove = rule.material(MaterialType.GuestPawns).index(move.itemIndex).getItem<GuestPawn>()!.location
      const actionMove = context.action.move
      const isAnotherGuestReplacement =
        isPopcornMoveItemType(MaterialType.GuestPawns)(actionMove) &&
        actionMove.location.type === LocationType.GuestPawnSpotOnTheaterTile &&
        actionMove.location.player === locationBeforeMove.player &&
        actionMove.location.x === locationBeforeMove.x &&
        actionMove.itemIndex !== move.itemIndex
      return {
        Component: GuestSentToExitZoneLogComponent,
        player: isAnotherGuestReplacement ? undefined : move.location.player,
        css: playerLogBackground(move.location.player!),
        depth: isAnotherGuestReplacement ? 1 : undefined
      }
    }
    if (
      isPopcornMoveItemTypeAtOnce(MaterialType.GuestPawns)(move) &&
      move.location.type === LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard &&
      move.indexes.length > 0
    ) {
      return { Component: GuestsSentToExitZoneLogComponent, css: playerLogBackground(move.location.player!), depth: 1 }
    }
    return undefined
  }

  private getSuffleGuestMovesLogDescription(
    move: PopcornMove,
    context: PopcornMoveComponentContext
  ): MovePlayedLogDescription<PopcornMove, PlayerColor> | undefined {
    if (isPopcornShuffleItemType(MaterialType.GuestPawns)(move)) {
      const rule = new ShowingsPhaseRule(context.game)
      const player = rule.material(MaterialType.GuestPawns).index(move.indexes[0]).getItem()!.location.player
      return { Component: ShuffleGuestsLogComponent, player: player, css: playerLogBackground(player!) }
    }
    return undefined
  }
}
