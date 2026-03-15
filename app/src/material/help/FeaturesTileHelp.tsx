import { FC } from 'react'
import { Trans } from 'react-i18next'

export const FeaturesTileHelp: FC = () => (
  <>
    <h2>
      <Trans i18nKey="help.featureTile.title" defaults="Features tile" />
    </h2>
    <Trans
      i18nKey="help.featuretile.description"
      defaults="<p>If you buy a movie from the Features row, its cost is as shown on the card.</p><p>During the end of the round, movies in the features row are discarded.</p>"
      components={{
        br: <br />,
        p: <p></p>
      }}
    />
  </>
)
