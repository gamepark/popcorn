import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { isPopcornMoveItemType } from '@gamepark/popcorn/material/PopcornMoves'
import { EndOfRoundPhaseTheatricalRunRule } from '@gamepark/popcorn/rules/EndOfRoundPhase/EndOfRoundPhaseTheatricalRunRule'
import { FC, Fragment } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'
import { LogMovieMaterialHelpLink } from '../utils/LogMovieMaterialHelpLink'

export const LobbySliderMovesLogComponent: FC<PopcornMoveComponentProps> = ({ context }) => {
  const rule = new EndOfRoundPhaseTheatricalRunRule(context.game)
  const moviesComponents = (
    <>
      {context.action.consequences
        .slice(0, (context.consequenceIndex ?? 0) + 1)
        .filter(isPopcornMoveItemType(MaterialType.LobbySliders))
        .map((move, index) => {
          const movie = rule
            .material(MaterialType.MovieCards)
            .player(move.location.player!)
            .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
            .location((l) => l.x === move.location.x)
            .getItem<Required<PlayableMovieCardId>>()!
          return index > 0
            ? [
                <Fragment key={`a-${context.action.id}-movie-${index}-c`}>, </Fragment>,
                <LogMovieMaterialHelpLink key={`a-${context.action.id}-movie-${index}`} movieCard={movie} isRuleLog />
              ]
            : [<LogMovieMaterialHelpLink key={`a-${context.action.id}-movie-${index}`} movieCard={movie} isRuleLog />]
        })}
    </>
  )
  return (
    <div css={ruleLogContainerCss}>
      <Trans defaults="Theatrical run: lobby sliders are moved up one space for <movies/>" components={{ movies: moviesComponents }} />
    </div>
  )
}
