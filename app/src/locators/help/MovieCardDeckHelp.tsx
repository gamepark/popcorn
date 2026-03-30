import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MovieCard, MovieCardType } from '@gamepark/popcorn/material/MovieCard'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { fontSizeCss, linkButtonCss, LocationHelpProps, MaterialComponent, PlayMoveButton, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { movieCardDescription } from '../../material/MovieCardDescription'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const MovieCardDeckHelp: FC<LocationHelpProps<PlayerColor, LocationType>> = ({ location }) => {
  const rules = useRules<PopcornRules>()
  const playerName = usePlayerName(location.player)
  const numberOfCards = rules?.material(MaterialType.MovieCards).location(location.type ?? LocationType.MovieCardDeckSpot).length ?? -1
  const finalShowingLocation = location.type === LocationType.PlayerMovieCardArchiveSpot ? 0 : rules?.game.players.length === 2 ? 10 : 5
  const { t } = useTranslation()
  return (
    <div css={containerCss}>
      <MaterialComponent
        type={MaterialType.MovieCards}
        itemId={{ back: MovieCardType.Movie }}
        css={[fontSizeCss(Math.min(50 / movieCardDescription.height, 50 / movieCardDescription.width, 4)), movieCardPictureCss]}
      />
      <div css={helpTextCss}>
        <h2>
          <Trans
            i18nKey={`help.movieCard.${location.type === LocationType.MovieCardDeckSpot ? 'deck' : location.type === LocationType.PlayerMovieCardArchiveSpot ? 'archive' : 'other'}.title`}
            defaults={
              location.type === LocationType.MovieCardDeckSpot
                ? 'Movie card deck'
                : location.type === LocationType.PlayerMovieCardArchiveSpot
                  ? "{name}'s archived movies"
                  : ''
            }
            values={{ name: playerName }}
          />
        </h2>
        <p>
          <Trans
            i18nKey="help.movieCard.deck.description"
            defaults={
              location.type === LocationType.MovieCardDeckSpot
                ? 'Deck of movie cards.{finalShowingsLocation, plural, =0{} other{ <link>The final showing card</link> is located # cards before the end.}}'
                : location.type === LocationType.PlayerMovieCardArchiveSpot
                  ? "{name}'s stack of archived movies."
                  : ''
            }
            values={{ finalShowingsLocation: numberOfCards <= finalShowingLocation ? 0 : finalShowingLocation, name: playerName }}
            components={{
              link: (
                <PlayMoveButton
                  move={displayMaterialHelp(MaterialType.MovieCards, {
                    id: { front: MovieCard.FinalShowing, back: MovieCardType.Movie },
                    location: { type: LocationType.FinalShowingCardSpot }
                  })}
                  css={linkButtonCss}
                  transient
                  content={t('help.movieCard.deck.finalShowing', 'The final showing card')}
                ></PlayMoveButton>
              )
            }}
          />
        </p>
      </div>
    </div>
  )
}

const containerCss = css`
  display: flex;
`

const movieCardPictureCss = css`
  min-width: ${movieCardDescription.width + 0.2}em;
  min-height: ${movieCardDescription.height + 0.2}em;
  transform: rotateY(180deg);
  padding: 0.125em;
`

const helpTextCss = css`
  max-width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
