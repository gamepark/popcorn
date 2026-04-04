import { FC } from 'react'
import { Trans } from 'react-i18next'

export const PremiersTileHelp: FC = () => (
  <>
    <h2>
      <Trans i18nKey="help.material.premiersTile.title" />
    </h2>
    <Trans
      i18nKey="help.premierstile.description"
      components={{
        s: <strong></strong>,
        p: <p></p>
      }}
    />
  </>
)
