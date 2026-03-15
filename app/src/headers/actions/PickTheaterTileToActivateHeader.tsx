import { isPassCurrentActionCustomMove } from '@gamepark/popcorn/material/CustomMoveType.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { HeaderText, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const PickTheaterTileToActivateHeader: FC = () => {
  const passMove = useLegalMove<MaterialMove<PlayerColor, MaterialType, LocationType>>(isPassCurrentActionCustomMove)
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
