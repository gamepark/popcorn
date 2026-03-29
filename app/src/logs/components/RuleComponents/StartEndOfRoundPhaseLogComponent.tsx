import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils'

export const StartEndOfRoundPhaseLogComponent: FC = () => (
  <div css={ruleLogContainerCss}>
    <Trans i18nKey="log.startEndOfRoundPhase" defaults="Beginning of the End of Round phase" />
  </div>
)
