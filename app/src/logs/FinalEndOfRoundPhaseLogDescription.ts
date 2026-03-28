import { isAwardCardPopcornCustomMove } from '@gamepark/popcorn/material/CustomMoveType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PopcornMove } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { FinalEndOfRoundPhaseMoneyRule } from '@gamepark/popcorn/rules/FinalEndOfRoundPhase/FinalEndOfRoundPhaseMoneyRule.ts'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType } from '@gamepark/rules-api'
import { AwardCardPopcornGivenLogComponent } from './components/FinalEndOfRoundPhaseComponents/AwardCardPopcornGivenLogComponent.tsx'
import { MoneyPopcornGainLogComponent } from './components/FinalEndOfRoundPhaseComponents/MoneyPopcornGainLogComponent.tsx'
import { TheaterTrophyAwardedLogComponent } from './components/FinalEndOfRoundPhaseComponents/TheaterTrophyAwardedLogComponent.tsx'
import { playerLogBackground } from './utils/logCss.utils.ts'

import { PopcornGame } from './utils/PopcornTypes.util.ts'

export class FinalEndOfRoundPhaseLogDescription implements LogDescription<PopcornMove, PlayerColor, PopcornGame> {
  public getMovePlayedLogDescription(
    move: PopcornMove,
    context: MoveComponentContext<PopcornMove, PlayerColor, PopcornGame>
  ): MovePlayedLogDescription | undefined {
    if (context.game.rule?.id === RuleId.FinalEndOfRoundMoneyRule) {
      if (isDeleteItemType<MaterialType>(MaterialType.MoneyTokens)(move)) {
        const rule = new FinalEndOfRoundPhaseMoneyRule(context.game)
        const player = rule.material(MaterialType.MoneyTokens).index(move.itemIndex).getItem()!.location.player!
        return { Component: MoneyPopcornGainLogComponent, player: player, css: playerLogBackground(player) }
      }
    }
    if (context.game.rule?.id === RuleId.FinalEndOfRoundPhaseTheaterTrophyRule) {
      if (isCreateItemType(MaterialType.TheaterTrophies)(move)) {
        return { Component: TheaterTrophyAwardedLogComponent, player: move.item.location.player, css: playerLogBackground(move.item.location.player!) }
      }
    }
    if (context.game.rule?.id === RuleId.FinalEndOfRoundPhaseAwardCardPointsRule) {
      if (isAwardCardPopcornCustomMove(move)) {
        return { Component: AwardCardPopcornGivenLogComponent, player: move.data.player, css: playerLogBackground(move.data.player) }
      }
    }
    return undefined
  }
}
