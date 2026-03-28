import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils.ts'

export const StartFinalEndOfRoundPhaseLogComponent: FC = () => (
  <div css={ruleLogContainerCss}>
    <Trans i18nKey="log.startFinalEndOfRoundPhase" defaults="The final End of Round phase begins" />
  </div>
)
