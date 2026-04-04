import { FC } from 'react'
import { Trans } from 'react-i18next'

export const FirstPlayerMarkerHelp: FC = () => (
  <>
    <h2>
      <Trans i18nKey="help.firstPlayerToken.title" defaults="First player token" />
    </h2>
    <p>
      <Trans i18nKey="help.firstPlayerToken.description" components={{ s: <strong></strong> }} />
    </p>
  </>
)
