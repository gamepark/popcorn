import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MovieCard, movieCardCharacteristics, PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { linkButtonCss, Picture, PlayMoveButton, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { colorSymbols, movieTitleDefaults } from '../utils/movieCard.utils'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const LobbySliderHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }) => {
  const playerName = usePlayerName(item.location?.player)
  const rules = useRules<PopcornRules>()
  const movieCard = rules
    ?.material(MaterialType.MovieCards)
    .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
    .player(item.location?.player)
    .location((l) => l.x === item.location?.x)
    .getItem<Required<PlayableMovieCardId>>()
  return (
    <>
      <h2>
        <Trans i18nKey="help.material.lobbySlider.title" values={{ player: playerName, theater: item.location?.x }} />
      </h2>
      <p>
        <Trans
          i18nKey="help.material.lobbySlider.description"
          values={{ isMovieAvailable: movieCard !== undefined, theater: item.location?.x }}
          components={{
            movieLink: movieCard ? (
              <PlayMoveButton move={displayMaterialHelp(MaterialType.MovieCards, movieCard)} local transient css={linkButtonCss}>
                <Picture
                  src={colorSymbols[movieCardCharacteristics[movieCard.id.front].color]}
                  css={css`
                    min-height: 1.5em;
                    display: inline-block;
                    vertical-align: middle;
                  `}
                />{' '}
                <Trans i18nKey={`material.movieCard.title.${camelCase(MovieCard[movieCard.id.front])}`} defaults={movieTitleDefaults[movieCard.id.front]} />
              </PlayMoveButton>
            ) : (
              <></>
            )
          }}
        />
      </p>
    </>
  )
}
