import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { isPopcornCreateItemType } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'

export const GlobalStartBuyingPhaseLogComponent: FC<PopcornMoveComponentProps> = ({ context }) => {
  const isFinalRound = context.action.consequences.some(isPopcornCreateItemType(MaterialType.MovieCards))
  return (
    <div css={ruleLogContainerCss}>
      <Trans
        i18nKey="log.startPlayerBuyingPhase"
        defaults="Beginning of the {isFinalRound, select, true{<s>last} other{}} Buying & Advertising phase {isFinalRound, select, true{</s>} other{}}"
        values={{ isFinalRound: isFinalRound }}
        components={{ s: <strong></strong> }}
      />
    </div>
  )
}
