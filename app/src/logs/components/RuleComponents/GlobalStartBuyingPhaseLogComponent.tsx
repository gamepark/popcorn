import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { isPopcornCreateItemType } from '@gamepark/popcorn/material/PopcornMoves'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'

export const GlobalStartBuyingPhaseLogComponent: FC<PopcornMoveComponentProps> = ({ context }) => {
  const isFinalRound = context.action.consequences.some(isPopcornCreateItemType(MaterialType.MovieCards))
  return (
    <div css={ruleLogContainerCss}>
      <Trans i18nKey="log.buyingAndAdvertisingPhase.startPhase" values={{ isFinalRound: isFinalRound }} components={{ s: <strong></strong> }} />
    </div>
  )
}
