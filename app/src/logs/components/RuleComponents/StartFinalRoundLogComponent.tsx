import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils'

export const StartFinalRoundLogComponent: FC = () => (
  <div css={ruleLogContainerCss}>
    <Trans i18nKey="log.endOfRoundPhase.finalShowingsRevealed" />
  </div>
)
