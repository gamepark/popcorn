import { FC } from 'react'
import { Trans } from 'react-i18next'

export const FeaturesTileHelp: FC = () => (
  <>
    <h2>
      <Trans i18nKey="help.material.featureTile.title" />
    </h2>
    <Trans i18nKey="help.material.featuretile.description" components={{ br: <br />, p: <p></p> }} />
  </>
)
