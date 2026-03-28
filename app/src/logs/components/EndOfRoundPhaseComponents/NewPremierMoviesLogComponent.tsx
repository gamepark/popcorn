import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { EndOfRoundPhaseNewLineUpRule } from '@gamepark/popcorn/rules/EndOfRoundPhase/EndOfRoundPhaseNewLineUpRule.ts'
import { Location, MaterialItem, MoveItemsAtOnce } from '@gamepark/rules-api'
import { FC, Fragment } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'
import { LogMovieMaterialHelpLink } from '../utils/LogMovieMaterialHelpLink.tsx'

export const NewPremierMoviesLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const premiersMove = move as MoveItemsAtOnce<PlayerColor, MaterialType, LocationType>
  const rule = new EndOfRoundPhaseNewLineUpRule(context.game)
  const movieCardMaterial = rule.material(MaterialType.MovieCards)
  const movieComponents = (
    <>
      {premiersMove.indexes.flatMap((cardIndex, index, items) => {
        const deckCard = movieCardMaterial.index(cardIndex).getItem()!
        const card = {
          ...deckCard,
          location: { ...(premiersMove.location as Location), x: index }
        }
        if (card.id.front === undefined && premiersMove.reveal !== undefined) {
          card.id.front = premiersMove.reveal[cardIndex].id.front
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
        i18nKey="log.endOfRoundPhase.newPremiersMovies"
        defaults="<premierMovies/> are the new Premiers Movies"
        components={{ premierMovies: movieComponents }}
      />
    </div>
  )
}
