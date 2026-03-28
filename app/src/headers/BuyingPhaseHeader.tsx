import { Actions } from '@gamepark/popcorn/material/Actions/Actions.ts'
import { ActionType } from '@gamepark/popcorn/material/Actions/ActionType.ts'
import { PopcornMove } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { Memory } from '@gamepark/popcorn/Memory.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { isFirstTurn } from '@gamepark/popcorn/rules/utils/isFirstTurn.util.ts'
import { HeaderText, PlayMoveButton, useLegalMoves, useRules } from '@gamepark/react-game'
import { isStartPlayerTurn, isStartSimultaneousRule } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getPendingActionHeader } from './utils/getPendingActionHeader.tsx'

export const BuyingPhaseHeader: FC = () => {
  const rules = useRules<PopcornRules>()
  const moves = useLegalMoves<PopcornMove>()
  const passMove = moves.find(isStartPlayerTurn) ?? moves.find(isStartSimultaneousRule)
  const isPassOnlyMove = moves.length === 1 && passMove !== undefined
  const pendingActions = rules?.remind<Actions[]>(Memory.PendingActions, rules?.activePlayer)
  if (pendingActions !== undefined && pendingActions.length > 0) {
    const pendingAction = pendingActions[0]
    if (
      pendingAction.type !== ActionType.BuyMovieCard &&
      pendingAction.type !== ActionType.BuyTheaterTile &&
      pendingAction.type !== ActionType.UseAdvertisingToken
    ) {
      return getPendingActionHeader(pendingAction)
    }
  }
  if (isFirstTurn(rules)) {
    return (
      <HeaderText
        code="buyingPhase.firstTurn"
        defaults={{
          you: 'You can buy a movie or <pass/>',
          player: '{player} can buy a movie or pass'
        }}
        components={{
          pass: (
            <PlayMoveButton move={passMove} {...(isPassOnlyMove ? { auto: 10 } : {})}>
              <Trans i18nKey="header.button.passMove" defaults="pass" />
            </PlayMoveButton>
          )
        }}
      />
    )
  }
  return (
    <HeaderText
      code="buyingPhase"
      defaults={{
        you: 'You can buy a movie, a theater, activate an advertising token or <pass/>',
        player: '{player} can buy a movie, a theater, activate an advertising token or pass'
      }}
      components={{
        pass: (
          <PlayMoveButton move={passMove} {...(isPassOnlyMove ? { auto: 10 } : {})}>
            <Trans i18nKey="header.button.passMove" defaults="pass" />
          </PlayMoveButton>
        )
      }}
    />
  )
}
