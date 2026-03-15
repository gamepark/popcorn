import { isPassCurrentActionCustomMove } from '@gamepark/popcorn/material/CustomMoveType.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { HeaderText, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const ChooseSeatActionHeader: FC = () => {
  const passMove = useLegalMove<MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>>(isPassCurrentActionCustomMove)
  return (
    <HeaderText
      code="header.actionRules.chooseSeatAction"
      defaults={{
        you: 'You must choose whether to perform the seat action or <pass/>',
        player: '{player} must choose whether to perform the seat action or pass'
      }}
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
