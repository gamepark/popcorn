import { MovieActionCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { movieCardCharacteristics, PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { ChooseMovieActionRule } from '@gamepark/popcorn/rules/actions/ChooseMovieActionRule'
import { MaterialComponent, Picture, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getMovieActionSymbol } from '../../../material/utils/movieCard.utils'
import { guestPawnCss, logContainerCss, symbolCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'
import { LogMovieMaterialHelpLink } from '../utils/LogMovieMaterialHelpLink'

export const MovieActionTakenLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const movieActionMove = move as MovieActionCustomMove
  const rule = new ChooseMovieActionRule(context.game, context.action.playerId)
  const currentAction = rule.action
  const movieCard = rule.material(MaterialType.MovieCards).index(movieActionMove.data.movieCardIndex).getItem<Required<PlayableMovieCardId>>()!
  const movieCharacteristics = movieCardCharacteristics[movieCard.id.front]
  const movieAction = movieCharacteristics.getAction(movieActionMove.data.movieActionNumber)!
  const actionSymbol = getMovieActionSymbol(movieAction, movieCharacteristics.color)
  const movieActionSymbol = <Picture src={actionSymbol} css={symbolCss} />
  const guest = rule.material(MaterialType.GuestPawns).index(currentAction.guestIndex).getItem<GuestPawn>()!
  const playerName = usePlayerName(movieCard.location.player!)
  const guestComponent = <MaterialComponent type={MaterialType.GuestPawns} itemId={guest.id} css={guestPawnCss} />
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.showingsPhase.movieAction"
        values={{
          player: playerName,
          isSeatAction: currentAction.isSeatAction,
          movieActionNumber: movieActionMove.data.movieActionNumber
        }}
        components={{
          guest: guestComponent,
          action: movieActionSymbol,
          movie: <LogMovieMaterialHelpLink movieCard={movieCard} />
        }}
      />
    </div>
  )
}
