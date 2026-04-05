import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils'

export const StartFinalEndOfRoundPhaseLogComponent: FC = () => (
  <div css={ruleLogContainerCss}>
    <Trans i18nKey="log.finalEndOfRoundPhase.startPhase" />
  </div>
)
