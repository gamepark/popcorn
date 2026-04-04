import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { isPopcornMoveItemType } from '@gamepark/popcorn/material/PopcornMoves'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { EndOfRoundPhaseNewLineUpRule } from '@gamepark/popcorn/rules/EndOfRoundPhase/EndOfRoundPhaseNewLineUpRule'
import { MoveItem } from '@gamepark/rules-api'
import { FC, Fragment } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'
import { LogMovieMaterialHelpLink } from '../utils/LogMovieMaterialHelpLink'

export const PremierToFeatureMoviesLogComponent: FC<PopcornMoveComponentProps> = ({ context }) => {
  const movieCardIndexes = context.action.consequences
    .slice(0, (context.consequenceIndex ?? 0) + 1)
    .filter(
      (m): m is MoveItem<PlayerColor, MaterialType, LocationType> =>
        isPopcornMoveItemType(MaterialType.MovieCards)(m) && m.location.type === LocationType.FeaturesRowSpot
    )
    .map((m) => m.itemIndex)
  const rule = new EndOfRoundPhaseNewLineUpRule(context.game)
  const movieComponents = (
    <>
      {rule
        .material(MaterialType.MovieCards)
        .index(movieCardIndexes)
        .sort((item) => item.location.x ?? 0)
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
        i18nKey="log.endOfRoundPhase.premiersToFeatureMovies"
        values={{ movieRemovedNumber: movieCardIndexes.length }}
        components={{ newFeatureMovies: movieComponents }}
      />
    </div>
  )
}
