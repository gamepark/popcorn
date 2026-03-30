import { isPassCurrentActionCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { PopcornMove } from '@gamepark/popcorn/material/PopcornMoves'
import { HeaderText, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const PickTheaterTileToActivateHeader: FC = () => {
  const passMove = useLegalMove<PopcornMove>(isPassCurrentActionCustomMove)
  return (
    <HeaderText
      code="header.actionRules.pickTheaterTileToActivate"
      defaults={{ you: 'You must pick a theater tile to activate or <pass/>', player: '{player} must pick a theater tile to activate or pass' }}
      components={{
        pass: (
          <PlayMoveButton move={passMove}>
            <Trans i18nKey="header.button.passMove" defaults="pass" />
          </PlayMoveButton>
        )
      }}
    />
  )
}
