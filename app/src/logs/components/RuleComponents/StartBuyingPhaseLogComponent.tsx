import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { usePlayerName } from '@gamepark/react-game'
import { StartPlayerTurn } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'

export const StartBuyingPhaseLogComponent: FC<PopcornMoveComponentProps> = ({ move }) => {
  const startMove = move as StartPlayerTurn<PlayerColor, RuleId>
  const name = usePlayerName(startMove.player)
  return (
    <div css={logContainerCss}>
      <Trans i18nKey="logs.startPlayerBuyingPhase" defaults="{player} starts their buying & advertising phase" values={{ player: name }} />
    </div>
  )
}
