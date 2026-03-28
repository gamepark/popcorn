import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { MovieCard, movieCardCharacteristics, PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { Picture } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { useTranslation } from 'react-i18next'
import { colorSymbols, movieTitleDefaults } from '../../../material/utils/movieCard.utils.ts'
import { symbolCss } from '../../utils/logCss.utils.ts'
import { LogMaterialHelpLink } from './LogMaterialHelpLink.tsx'

type LogMovieMaterialHelpLinkProps = {
  movieCard: MaterialItem<PlayerColor, LocationType, PlayableMovieCardId>
  isRuleLog?: boolean
}

export const LogMovieMaterialHelpLink = ({ movieCard, isRuleLog = false }: LogMovieMaterialHelpLinkProps) => {
  const movieId = movieCard.id.front!
  const movieColor = movieCardCharacteristics[movieId].color
  const { t } = useTranslation()
  return (
    <>
      <Picture src={colorSymbols[movieColor]} css={symbolCss} />
      &nbsp;
      <LogMaterialHelpLink<PlayableMovieCardId> itemType={MaterialType.MovieCards} item={movieCard} isRuleLog={isRuleLog}>
        {t(`help.movieCard.title.${camelCase(MovieCard[movieId])}`, movieTitleDefaults[movieId])}
      </LogMaterialHelpLink>
    </>
  )
}
