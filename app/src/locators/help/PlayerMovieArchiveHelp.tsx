import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { movieCardCharacteristics, MovieColor, PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { LocationHelpProps, Picture, usePlayerId, useRules } from '@gamepark/react-game'
import { isSameLocationArea, MaterialItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { MaterialComponentWithHelp } from '../../logs/components/utils/MaterialComponentWithHelp'
import { colorSymbols } from '../../material/utils/movieCard.utils'
import { colors } from '../../theme/colors'
import { MovieCardDeckHelp } from './MovieCardDeckHelp'

const COLOR_ORDER = [MovieColor.Blue, MovieColor.Green, MovieColor.Red, MovieColor.Yellow]

const colorBgs: Record<MovieColor, string> = {
  [MovieColor.Blue]: 'rgba(46,134,171,0.1)',
  [MovieColor.Green]: 'rgba(58,125,68,0.1)',
  [MovieColor.Red]: 'rgba(196,30,58,0.1)',
  [MovieColor.Yellow]: 'rgba(212,168,40,0.1)'
}

const colorBorders: Record<MovieColor, string> = {
  [MovieColor.Blue]: 'rgba(46,134,171,0.2)',
  [MovieColor.Green]: 'rgba(58,125,68,0.2)',
  [MovieColor.Red]: 'rgba(196,30,58,0.2)',
  [MovieColor.Yellow]: 'rgba(212,168,40,0.2)'
}

export const PlayerMovieArchiveHelp: FC<LocationHelpProps<PlayerColor, LocationType>> = ({ location, closeDialog }) => {
  const rules = useRules<PopcornRules>()
  const me = usePlayerId<PlayerColor>()
  const isMe = location.player === me
  if (!isMe) {
    return <MovieCardDeckHelp location={location} closeDialog={closeDialog} />
  }

  const movieCards =
    rules
      ?.material(MaterialType.MovieCards)
      .location((l) => isSameLocationArea(l, location))
      .getItems<Required<PlayableMovieCardId>>() ?? []

  const cardsByColor: Record<number, MaterialItem<PlayerColor, LocationType, Required<PlayableMovieCardId>>[]> = {}
  for (const card of movieCards) {
    const color = movieCardCharacteristics[card.id.front].color
    if (!cardsByColor[color]) cardsByColor[color] = []
    cardsByColor[color].push(card)
  }

  const activeColors = COLOR_ORDER.filter((c) => cardsByColor[c]?.length)

  return (
    <div css={containerCss}>
      {/* Title bar with total count */}
      <div css={titleBarCss}>
        <span css={titleCss}>
          <Trans i18nKey="help.location.movieCard.yourArchive.title" />
        </span>
        <span css={totalBadgeCss}>{movieCards.length}</span>
      </div>
      <p css={descCss}>
        <Trans i18nKey="help.location.movieCard.yourArchive.description" values={{ numberOfMovies: movieCards.length }} />
      </p>

      {/* Color columns */}
      <div css={gridCss} style={{ gridTemplateColumns: `repeat(${activeColors.length}, 1fr)` }}>
        {activeColors.map((color) => (
          <div key={color} css={columnCss} style={{ background: colorBgs[color], borderColor: colorBorders[color] }}>
            <div css={columnHeaderCss} style={{ borderBottomColor: colorBorders[color] }}>
              <Picture src={colorSymbols[color]} css={colorIconCss} />
              <span css={countCss}>{cardsByColor[color].length}</span>
            </div>
            <div css={cardsCss}>
              {cardsByColor[color].map((card, index) => (
                <MaterialComponentWithHelp key={`archive-${color}-${index}`} itemType={MaterialType.MovieCards} item={card} displayHelp extraCss={cardCss} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const containerCss = css`
  min-width: 50em;
`

const titleBarCss = css`
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.2em;
`

const titleCss = css`
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: 1.3em;
  color: ${colors.dark};
`

const totalBadgeCss = css`
  font-family: 'Lilita One', cursive;
  font-size: 0.9em;
  background: ${colors.red};
  color: white;
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.2);
`

const descCss = css`
  color: rgba(26, 10, 10, 0.55);
  font-size: 0.85em;
  margin-bottom: 0.8em;
`

const gridCss = css`
  display: grid;
  gap: 0.5em;
`

const columnCss = css`
  border-radius: 0.5em;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4em;
  border: 0.06em solid transparent;
`

const columnHeaderCss = css`
  display: flex;
  align-items: center;
  gap: 0.35em;
  padding-bottom: 0.35em;
  border-bottom: 0.06em solid transparent;
  width: 100%;
  justify-content: center;
`

const colorIconCss = css`
  width: 1.4em;
  vertical-align: middle;
`

const countCss = css`
  font-family: 'Lilita One', cursive;
  font-size: 1.2em;
  color: ${colors.dark};
`

const cardsCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  align-items: center;
`

const cardCss = css`
  font-size: 1.2em;
`
