import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { MovieCardId, PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { EndOfRoundPhaseNewLineUpRule } from '@gamepark/popcorn/rules/EndOfRoundPhase/EndOfRoundPhaseNewLineUpRule.ts'
import { Location, MaterialItem, MoveItemsAtOnce } from '@gamepark/rules-api'
import { FC, Fragment } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'
import { LogMovieMaterialHelpLink } from '../utils/LogMovieMaterialHelpLink.tsx'

export const NewFeatureMoviesLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const featureMove = move as MoveItemsAtOnce<PlayerColor, MaterialType, LocationType>
  const rule = new EndOfRoundPhaseNewLineUpRule(context.game)
  const movieCardMaterial = rule.material(MaterialType.MovieCards)
  const movieComponents = (
    <>
      {featureMove.indexes.flatMap((cardIndex, index, items) => {
        const deckCard = movieCardMaterial.index(cardIndex).getItem<MovieCardId>()!
        const card = {
          ...deckCard,
          location: { ...(featureMove.location as Location), x: index }
        }
        if (card.id.front === undefined && featureMove.reveal !== undefined) {
          card.id.front = featureMove.reveal[cardIndex].id.front
        }
        const components = [
          <LogMovieMaterialHelpLink
            movieCard={card as MaterialItem<PlayerColor, LocationType, PlayableMovieCardId>}
            key={`a-${context.action.id}-m-${context.consequenceIndex}-s-${index}`}
            isRuleLog
          />
        ]
        return index === items.length - 1
          ? components
          : components.concat(<Fragment key={`a-${context.action.id}-m-${context.consequenceIndex}-c-${index}`}>{', '}</Fragment>)
      })}
    </>
  )
  return (
    <div css={ruleLogContainerCss}>
      <Trans
        i18nKey="log.endOfRoundPhase.newFeatureMovies"
        defaults="<featureMovies/> {newMovieCount, plural, =1{is} other{are}} the new Feature {newMovieCount, plural, =1{Movie} other{Movies}}"
        values={{ newMovieCount: featureMove.indexes.length }}
        components={{ featureMovies: movieComponents }}
      />
    </div>
  )
}
