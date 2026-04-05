import { Actions } from '@gamepark/popcorn/material/Actions/Actions'
import { ActionType } from '@gamepark/popcorn/material/Actions/ActionType'
import { PopcornMove } from '@gamepark/popcorn/material/PopcornMoves'
import { Memory } from '@gamepark/popcorn/Memory'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { isFirstTurn } from '@gamepark/popcorn/rules/utils/isFirstTurn.util'
import { HeaderText, PlayMoveButton, useLegalMoves, useRules } from '@gamepark/react-game'
import { isStartPlayerTurn, isStartSimultaneousRule } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getPendingActionHeader } from './utils/getPendingActionHeader'

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
        components={{
          pass: (
            <PlayMoveButton move={passMove} {...(isPassOnlyMove ? { auto: 10 } : {})}>
              <Trans i18nKey="button.header.passMove" defaults="pass" />
            </PlayMoveButton>
          )
        }}
      />
    )
  }
  return (
    <HeaderText
      code="buyingPhase"
      components={{
        pass: (
          <PlayMoveButton move={passMove} {...(isPassOnlyMove ? { auto: 10 } : {})}>
            <Trans i18nKey="button.header.passMove" defaults="pass" />
          </PlayMoveButton>
        )
      }}
    />
  )
}
