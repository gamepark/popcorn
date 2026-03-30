import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils'

export const StartFinalRoundLogComponent: FC = () => (
  <div css={ruleLogContainerCss}>
    <Trans i18nKey="log.finalROundStart" defaults="The final showing card is revealed. The last Round begins." />
  </div>
)
