import { FC } from 'react'
import { Trans } from 'react-i18next'

export const PremiersTileHelp: FC = () => (
  <>
    <h2>
      <Trans i18nKey="help.premiersTile.title" defaults="Premiers tile" />
    </h2>
    <Trans
      i18nKey="help.premierstile.description"
      defaults="<p>This tile indicates movies that are Premier movie for this round. If you buy a movie from the Premiers row, the cost is +$2 to what is shown on the card. When you buy a Premier movie, <s>immediately gain 1 Guest of the movie's color from the reserve</s>, and add it to your bag. If the reserve is empty, take it from any other player’s exit zone. If there are none available, nothing happens.</p><p>Movies in this row move to the features row during the end of the round</p>"
      components={{
        s: <strong></strong>,
        p: <p></p>
      }}
    />
  </>
)
