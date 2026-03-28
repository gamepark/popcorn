import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { isPopcornStartPlayerTurn, isPopcornStartSimultaneousRule, PopcornMove } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { LogDescription, MovePlayedLogDescription } from '@gamepark/react-game'
import { isEndPlayerTurn } from '@gamepark/rules-api'
import { BuyingAndAdvertisingPhaseLogDescription } from './BuyingAndAdvertisingPhaseLogDescrioption.ts'
import { CommonLogDescription } from './CommonLogDescription.ts'
import { GlobalStartBuyingPhaseLogComponent } from './components/RuleComponents/GlobalStartBuyingPhaseLogComponent.tsx'
import { StartBuyingPhaseLogComponent } from './components/RuleComponents/StartBuyingPhaseLogComponent.tsx'
import { StartEndOfRoundPhaseLogComponent } from './components/RuleComponents/StartEndOfRoundPhaseLogComponent.tsx'
import { StartFinalEndOfRoundPhaseLogComponent } from './components/RuleComponents/StartFinalEndOfRoundPhaseLogComponent.tsx'
import { StartShowingsPhaseLogComponent } from './components/RuleComponents/StartShowingsPhaseLogComponent.tsx'
import { EndOfRoundPhaseLogDescription } from './EndOfRoundPhaseLogDescription.ts'
import { FinalEndOfRoundPhaseLogDescription } from './FinalEndOfRoundPhaseLogDescription.ts'
import { ShowingPhaseLogDescription } from './ShowingPhaseLogDescription.ts'
import { playerLogBackground } from './utils/logCss.utils.ts'
import { PopcornGame, PopcornMoveComponentContext } from './utils/PopcornTypes.util.ts'

export class PopcornLogDescription implements LogDescription<PopcornMove, PlayerColor, PopcornGame> {
  private readonly showingsPhaseDescriptions = new ShowingPhaseLogDescription()
  private readonly commonLogDescription = new CommonLogDescription()
  private readonly endOfRoundPhaseDescription = new EndOfRoundPhaseLogDescription()
  private readonly buyingAndAdvertisingPhaseDescriptions = new BuyingAndAdvertisingPhaseLogDescription()
  private readonly finalEndOfROundPhaseAwardCardDescription = new FinalEndOfRoundPhaseLogDescription()
  public getMovePlayedLogDescription(move: PopcornMove, context: PopcornMoveComponentContext): MovePlayedLogDescription | undefined {
    return (
      this.commonLogDescription.getMovePlayedLogDescription(move, context) ??
      this.showingsPhaseDescriptions.getMovePlayedLogDescription(move, context) ??
      this.buyingAndAdvertisingPhaseDescriptions.getMovePlayedLogDescription(move, context) ??
      this.getStartSimultaneousPhasesLogDescription(move, context) ??
      this.getStartBuyingPhaseDescription(move) ??
      this.endOfRoundPhaseDescription.getMovePlayedLogDescription(move, context) ??
      this.finalEndOfROundPhaseAwardCardDescription.getMovePlayedLogDescription(move, context)
    )
  }

  private getStartSimultaneousPhasesLogDescription(move: PopcornMove, context: PopcornMoveComponentContext): MovePlayedLogDescription | undefined {
    if (isPopcornStartSimultaneousRule(move)) {
      switch (move.id) {
        case RuleId.ShowingsPhaseRule:
          return { Component: StartShowingsPhaseLogComponent, css: ruleCss }
        case RuleId.EndOfRoundPhaseTheatricalRunRule:
          return { Component: StartEndOfRoundPhaseLogComponent, css: ruleCss }
        case RuleId.FinalEndOfRoundPhaseAdvertisingTokenMovesRule:
          return { Component: StartFinalEndOfRoundPhaseLogComponent, css: ruleCss }
        case RuleId.EndOfRoundPendingActionsNextPhaseTransitionRule:
          return { Component: GlobalStartBuyingPhaseLogComponent, css: ruleCss }
      }
    }
    if (
      isEndPlayerTurn<PlayerColor, MaterialType, LocationType>(move) &&
      context.game.rule?.id === RuleId.DealAndDiscardAwardCards &&
      context.game.rule.players?.length === 1
    ) {
      return { Component: GlobalStartBuyingPhaseLogComponent, css: ruleCss }
    }
    return
  }

  private getStartBuyingPhaseDescription(move: PopcornMove): MovePlayedLogDescription | undefined {
    if (isPopcornStartPlayerTurn(move) && move.id === RuleId.BuyingPhaseRule) {
      return { Component: StartBuyingPhaseLogComponent, player: move.player, css: playerLogBackground(move.player!) }
    }
    return
  }
}

const ruleCss = css`
  justify-content: center;
`
