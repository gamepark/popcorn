import { MovieActionCustomMove } from '@gamepark/popcorn/material/CustomMoveType.ts'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { movieCardCharacteristics, PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard.ts'
import { ChooseMovieActionRule } from '@gamepark/popcorn/rules/actions/ChooseMovieActionRule.ts'
import { MaterialComponent, Picture, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getMovieActionSymbol } from '../../../material/utils/movieCard.utils.ts'
import { guestPawnCss, logContainerCss, symbolCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'
import { LogMovieMaterialHelpLink } from '../utils/LogMovieMaterialHelpLink.tsx'

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
        defaults="{isSeatAction, select, true{} false{Using <guest/>, } other{}}{player} takes the {movieActionNumber, select, 0{first} 1{second} 2{third} 3{fourth} other{}} Movie Action ( <action/> ) of <movie/>"
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
