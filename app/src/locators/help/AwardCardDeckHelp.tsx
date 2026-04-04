import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { fontSizeCss, LocationHelpProps, MaterialComponent, Picture, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import drawAwardCardSymbol from '../../images/Symbols/MovieActionDrawAwardCard.png'
import { awardCardDescription } from '../../material/AwardCardDescription'

export const AwardCardDeckHelp: FC<LocationHelpProps<PlayerColor, LocationType>> = ({ location }) => {
  const rules = useRules<PopcornRules>()
  const count = rules?.material(MaterialType.AwardCards).location(LocationType.AwardCardDeckSpot).length ?? 0
  const handCount = rules?.material(MaterialType.AwardCards).location(LocationType.PlayerAwardCardHand).player(location.player).length ?? 0
  const playerName = usePlayerName(location.player)
  return (
    <div css={containerCss}>
      <MaterialComponent
        type={MaterialType.AwardCards}
        itemId={undefined}
        css={[fontSizeCss(Math.min(50 / awardCardDescription.height, 50 / awardCardDescription.width, 3)), testCss]}
      />

      <div css={helpTextCss}>
        <h2>
          {location.player !== undefined ? (
            <Trans i18nKey="help.location.awardCard.otherHand.title" values={{ name: playerName }} />
          ) : (
            <Trans i18nKey="help.location.awardCard.deck.title" />
          )}
        </h2>
        <p>
          {location.player !== undefined ? (
            <Trans i18nKey="help.location.awardCard.otherHand.description" values={{ name: playerName, count: handCount }} />
          ) : (
            <Trans
              i18nKey="help.location.awardCard.deck.description"
              values={{ count: count }}
              components={{
                action: <Picture src={drawAwardCardSymbol} css={actionPictureCss} />
              }}
            />
          )}
        </p>
      </div>
    </div>
  )
}

const containerCss = css`
  display: flex;
  min-height: ${awardCardDescription.height * 2.5}em;
  position: relative;
`

const testCss = css`
  flex-shrink: 0;
  transform: rotateY(180deg);
  max-width: 40%;
  padding: 0.125em;
  min-height: ${awardCardDescription.height + 0.2}em;
`

const actionPictureCss = css`
  height: 3em;
`

const helpTextCss = css`
  min-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 0.5;
`
