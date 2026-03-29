import { isBuyMovieCardCustomMove, isBuyTheaterTileCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { isPopcornMoveItemType, PopcornMove } from '@gamepark/popcorn/material/PopcornMoves'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { LogDescription, MovePlayedLogDescription } from '@gamepark/react-game'
import { BuyMovieCardLogComponent } from './components/BuyingAndAdvertisingPhaseComponents/BuyMovieCardLogComponent'
import { BuyTheaterTileLogComponent } from './components/BuyingAndAdvertisingPhaseComponents/BuyTheaterTileLogComponent'
import { ReserveOrExitZoneMoveToBagLogComponent } from './components/BuyingAndAdvertisingPhaseComponents/ReserveOrExitZoneMoveToBagLogComponent'
import { UseAdvertisingTokenLogComponent } from './components/BuyingAndAdvertisingPhaseComponents/UseAdvertisingTokenLogComponent'
import { playerLogBackground } from './utils/logCss.utils'
import { isPopcornMoveFromLocations } from './utils/PopcornMove.utils'
import { PopcornGame, PopcornMoveComponentContext } from './utils/PopcornTypes.util'

export class BuyingAndAdvertisingPhaseLogDescription implements LogDescription<PopcornMove, PlayerColor, PopcornGame> {
  public getMovePlayedLogDescription(move: PopcornMove, context: PopcornMoveComponentContext): MovePlayedLogDescription<PopcornMove, PlayerColor> | undefined {
    if (context.game.rule?.id === RuleId.BuyingPhaseRule) {
      if (isBuyTheaterTileCustomMove(move)) {
        return { Component: BuyTheaterTileLogComponent, player: move.data.player, css: playerLogBackground(move.data.player) }
      }
      if (isBuyMovieCardCustomMove(move)) {
        return { Component: BuyMovieCardLogComponent, player: move.data.player, css: playerLogBackground(move.data.player) }
      }
      if (isPopcornMoveItemType(MaterialType.AdvertisingTokens)(move) && move.location.type === LocationType.PlayerAdvertisingTokenSpot) {
        return { Component: UseAdvertisingTokenLogComponent, player: move.location.player, css: playerLogBackground(move.location.player!) }
      }
      if (
        isPopcornMoveItemType(MaterialType.GuestPawns)(move) &&
        move.location.type === LocationType.PlayerGuestPawnsUnderClothBagSpot &&
        isPopcornMoveFromLocations(move, [LocationType.GuestPawnReserveSpot, LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard], context)
      ) {
        return { Component: ReserveOrExitZoneMoveToBagLogComponent, css: playerLogBackground(context.action.playerId!), depth: 1 }
      }
    }
    return undefined
  }
}
