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
        <Trans
          i18nKey=""
          defaults="{player}'s {theater, select, 0{left} 1{center} 2{right} other{}} theater lobby slider"
          values={{ player: playerName, theater: item.location?.x }}
        />
      </h2>
      <p>
        <Trans
          i18nKey=""
          defaults="During the theatrical run (part of the End of Round), this Lobby Sider will move 1 space up {isMovieAvailable, select, true{on <movieLink/>} other{on the Movie Card in the {theater, select, 0{center} 1{left} 2{right} other{}} theater when there will be one}}, covering 1 more action. Covered actions are no longer available in future rounds."
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
                <Trans i18nKey={`movieCard.title.${camelCase(MovieCard[movieCard.id.front])}`} defaults={movieTitleDefaults[movieCard.id.front]} />
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
