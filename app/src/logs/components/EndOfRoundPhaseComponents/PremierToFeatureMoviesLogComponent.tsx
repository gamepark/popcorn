import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard.ts'
import { isPopcornMoveItemType } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { EndOfRoundPhaseNewLineUpRule } from '@gamepark/popcorn/rules/EndOfRoundPhase/EndOfRoundPhaseNewLineUpRule.ts'
import { MoveItem } from '@gamepark/rules-api'
import { FC, Fragment } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'
import { LogMovieMaterialHelpLink } from '../utils/LogMovieMaterialHelpLink.tsx'

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
        i18nKey="log.EndOfRoundPhase.premiersToFeatureMovies"
        defaults="<newFeatureMovies/> {movieRemovedNumber, plural, =1{moves} other{move}} from the Premiers row to the Features row"
        values={{ movieRemovedNumber: movieCardIndexes.length }}
        components={{ newFeatureMovies: movieComponents }}
      />
    </div>
  )
}
