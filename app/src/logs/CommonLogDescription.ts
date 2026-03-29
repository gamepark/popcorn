import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { isPopcornCreateItem, isPopcornMoveItemType, isPopcornMoveItemTypeAtOnce, PopcornMove } from '@gamepark/popcorn/material/PopcornMoves'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { LogDescription, MovePlayedLogDescription } from '@gamepark/react-game'
import { isDeleteItemType } from '@gamepark/rules-api'
import { AudienceCubeMoveLogComponent } from './components/common/AudienceCubeMoveLogComponent'
import { DiscardAwardCardLogComponent } from './components/common/DiscardAwardCardLogComponent'
import { DrawAwardCardLogComponent } from './components/common/DrawAwardCardLogComponent'
import { GetMoneyOrPopcornLogComponent } from './components/common/GetMoneyOrPopcornLogComponent'
import { GuestSentToReserveLogComponent } from './components/common/GuestSentToReserveLogComponent'
import { PlaceAdvertisingTokenLogComponent } from './components/common/PlaceAdvertisingTokenLogComponent'
import { playerLogBackground } from './utils/logCss.utils'
import { isPopcornMoveFromLocation } from './utils/PopcornMove.utils'
import { PopcornGame, PopcornMoveComponentContext } from './utils/PopcornTypes.util'

export class CommonLogDescription implements LogDescription<PopcornMove, PlayerColor, PopcornGame> {
  public getMovePlayedLogDescription(move: PopcornMove, context: PopcornMoveComponentContext): MovePlayedLogDescription<PopcornMove, PlayerColor> | undefined {
    if (
      context.game.rule?.id !== RuleId.FinalEndOfRoundMoneyRule &&
      context.game.rule?.id !== RuleId.FinalEndOfRoundPhaseTheaterTrophyRule &&
      context.game.rule?.id !== RuleId.FinalEndOfRoundPhaseAwardCardPointsRule &&
      isPopcornCreateItem(move) &&
      (move.itemType === MaterialType.PopcornTokens ||
        (move.itemType === MaterialType.MoneyTokens &&
          ((context.consequenceIndex ?? 0) < 1 ||
            !isDeleteItemType<MaterialType>(MaterialType.MoneyTokens)(context.action.consequences[(context.consequenceIndex ?? 0) - 1]))))
    ) {
      return { Component: GetMoneyOrPopcornLogComponent, css: playerLogBackground(move.item.location.player!), depth: 1 }
    }
    if (isPopcornMoveItemType(MaterialType.GuestPawns)(move) && move.location.type === LocationType.GuestPawnReserveSpot) {
      return { Component: GuestSentToReserveLogComponent, css: playerLogBackground(context.action.playerId), depth: 1 }
    }
    if (
      isPopcornMoveItemType(MaterialType.AwardCards)(move) &&
      move.location.type === LocationType.AwardCardDeckSpot &&
      move.location.x === 0 &&
      isPopcornMoveFromLocation(move, LocationType.PlayerAwardCardHand, context)
    ) {
      const rule = new PopcornRules(context.game)
      const card = rule.material(MaterialType.AwardCards).index(move.itemIndex).getItem()!
      return {
        Component: DiscardAwardCardLogComponent,
        player: context.game.rule?.id === RuleId.DealAndDiscardAwardCards ? card.location.player : undefined,
        css: playerLogBackground(card.location.player!),
        depth: context.game.rule?.id === RuleId.DealAndDiscardAwardCards ? undefined : 1
      }
    }
    if (
      isPopcornMoveItemType(MaterialType.AdvertisingTokens)(move) &&
      move.location.type === LocationType.AdvertisingTokenSpotOnAdvertisingBoard &&
      isPopcornMoveFromLocation(move, LocationType.PlayerAdvertisingTokenSpot, context)
    ) {
      return { Component: PlaceAdvertisingTokenLogComponent, css: playerLogBackground(context.action.playerId), depth: 1 }
    }
    if (isPopcornMoveItemType(MaterialType.AudienceCubes)(move)) {
      return { Component: AudienceCubeMoveLogComponent, css: playerLogBackground(move.location.player!), depth: 1 }
    }
    if (
      isPopcornMoveItemTypeAtOnce(MaterialType.AwardCards)(move) &&
      move.location.type === LocationType.PlayerAwardCardHand &&
      isPopcornMoveFromLocation(move, LocationType.AwardCardDeckSpot, context)
    ) {
      return { Component: DrawAwardCardLogComponent, css: playerLogBackground(move.location.player!), depth: 1 }
    }
    return undefined
  }
}
