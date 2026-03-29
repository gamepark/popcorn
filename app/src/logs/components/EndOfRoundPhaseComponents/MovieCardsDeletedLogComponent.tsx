import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { EndOfRoundPhaseNewLineUpRule } from '@gamepark/popcorn/rules/EndOfRoundPhase/EndOfRoundPhaseNewLineUpRule'
import { DeleteItemsAtOnce } from '@gamepark/rules-api'
import { FC, Fragment } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'
import { LogMovieMaterialHelpLink } from '../utils/LogMovieMaterialHelpLink'

export const MovieCardsDeletedLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const deleteMove = move as DeleteItemsAtOnce<MaterialType>
  const rule = new EndOfRoundPhaseNewLineUpRule(context.game)
  const movieComponents = (
    <>
      {rule
        .material(MaterialType.MovieCards)
        .index(deleteMove.indexes)
        .getItems<Required<PlayableMovieCardId>>()
        .flatMap((card, index, items) => {
          const components = [<LogMovieMaterialHelpLink movieCard={card} key={`a-${context.action.id}-m-${context.consequenceIndex}-s-${index}`} isRuleLog />]
          return index === items.length - 1
            ? components
            : components.concat(<Fragment key={`a-${context.action.id}-m-${context.consequenceIndex}-c-${index}`}>{', '}</Fragment>)
        })}
    </>
  )
  return (
    <div css={ruleLogContainerCss}>
      <Trans
        i18nKey="log.EndOfRoundPhase.removeFeatureMovies"
        defaults="<removedMovies/> {movieRemovedNumber, plural, =1{is} other{are}} removed from the Features row"
        values={{ movieRemovedNumber: deleteMove.indexes.length }}
        components={{ removedMovies: movieComponents! }}
      />
    </div>
  )
}
