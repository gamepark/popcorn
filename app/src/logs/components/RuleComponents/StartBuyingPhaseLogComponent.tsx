import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { usePlayerName } from '@gamepark/react-game'
import { StartPlayerTurn } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'

export const StartBuyingPhaseLogComponent: FC<PopcornMoveComponentProps> = ({ move }) => {
  const startMove = move as StartPlayerTurn<PlayerColor, RuleId>
  const name = usePlayerName(startMove.player)
  return (
    <div css={logContainerCss}>
      <Trans i18nKey="log.startPlayerBuyingPhase" defaults="{player} starts their buying & advertising phase" values={{ player: name }} />
    </div>
  )
}
