import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { MovieCard, MovieCardId } from '@gamepark/popcorn/material/MovieCard.ts'
import { ShowingsPhaseRule } from '@gamepark/popcorn/rules/ShowingsPhaseRule.ts'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'

export const StartShowingsPhaseLogComponent: FC<PopcornMoveComponentProps> = ({ context }) => {
  const rule = new ShowingsPhaseRule(context.game)
  const isFinalRound = rule.material(MaterialType.MovieCards).id<MovieCardId>((id) => id.front === MovieCard.FinalShowing).exists
  return (
    <div css={ruleLogContainerCss}>
      <Trans
        i18nKey="log.startShowingsPhase"
        defaults="Beginning of {isFinalRound, select, true{<s>last } other{}}Showings phase{isFinalRound, select, true{</s>} other{}}"
        values={{ isFinalRound: isFinalRound }}
        components={{ s: <strong></strong> }}
      />
    </div>
  )
}
