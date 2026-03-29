import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { movieCardCharacteristics, MovieColor, PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { LocationHelpProps, Picture, usePlayerId, useRules } from '@gamepark/react-game'
import { isSameLocationArea } from '@gamepark/rules-api'
import { countBy } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { MaterialComponentWithHelp } from '../../logs/components/utils/MaterialComponentWithHelp'
import { colorSymbols } from '../../material/utils/movieCard.utils'
import { MovieCardDeckHelp } from './MovieCardDeckHelp'

export const PlayerMovieArchiveHelp: FC<LocationHelpProps<PlayerColor, LocationType>> = ({ location, closeDialog }) => {
  const rules = useRules<PopcornRules>()
  const me = usePlayerId<PlayerColor>()
  const isMe = location.player === me
  if (isMe) {
    const movieCards =
      rules
        ?.material(MaterialType.MovieCards)
        .location((l) => isSameLocationArea(l, location))
        .getItems<Required<PlayableMovieCardId>>() ?? []
    const numberOfMoviesByColor = countBy(movieCards, (card) => movieCardCharacteristics[card.id.front].color)
    return (
      <div
        css={css`
          min-width: 50em;
        `}
      >
        <h2>
          <Trans i18nKey="" defaults="Your movie archive" />
        </h2>
        <p>
          <Trans
            i18nKey=""
            defaults="When you buy a new movie, the replaced movie is sent here, in this archive. There {numberOfMovies, plural, =0{are currently no Movies} =1{is currently # Movie} other{are currently # Movies}} in your archive."
            values={{ numberOfMovies: movieCards?.length }}
          />
        </p>
        <table>
          <tbody>
            <tr>
              {Object.entries(numberOfMoviesByColor).map(([movieColor, numberOfMoviesForColor]) => {
                const mColor = parseInt(movieColor) as MovieColor
                return (
                  <td>
                    <Picture
                      src={colorSymbols[mColor]}
                      css={css`
                        width: 1.25em;
                        vertical-align: middle;
                      `}
                    />
                    : {numberOfMoviesForColor}
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
        <div
          css={css`
            display: grid;
            grid-auto-columns: 1fr;
            grid-auto-rows: 1fr;
          `}
        >
          {movieCards?.map((card, index) => (
            <MaterialComponentWithHelp
              key={`archive-help-card-${index}`}
              itemType={MaterialType.MovieCards}
              item={card}
              displayHelp
              extraCss={css`
                font-size: 1.5em;
              `}
            />
          ))}
        </div>
      </div>
    )
  }
  return <MovieCardDeckHelp location={location} closeDialog={closeDialog} />
}
