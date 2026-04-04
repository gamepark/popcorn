import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MovieCard, movieCardCharacteristics, PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { Picture } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { Trans } from 'react-i18next'
import { colorSymbols } from '../../../material/utils/movieCard.utils'
import { symbolCss } from '../../utils/logCss.utils'
import { LogMaterialHelpLink } from './LogMaterialHelpLink'

type LogMovieMaterialHelpLinkProps = {
  movieCard: MaterialItem<PlayerColor, LocationType, PlayableMovieCardId>
  isRuleLog?: boolean
}

export const LogMovieMaterialHelpLink = ({ movieCard, isRuleLog = false }: LogMovieMaterialHelpLinkProps) => {
  const movieId = movieCard.id.front!
  const movieColor = movieCardCharacteristics[movieId].color
  return (
    <>
      <Picture src={colorSymbols[movieColor]} css={symbolCss} />
      &nbsp;
      <LogMaterialHelpLink<PlayableMovieCardId> itemType={MaterialType.MovieCards} item={movieCard} isRuleLog={isRuleLog}>
        <Trans i18nKey={`material.movieCard.title.${camelCase(MovieCard[movieId])}`} />
      </LogMaterialHelpLink>
    </>
  )
}
