import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { ShowingsPhaseRule } from '@gamepark/popcorn/rules/ShowingsPhaseRule'
import { usePlayerName } from '@gamepark/react-game'
import { Shuffle } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'

export const ShuffleGuestsLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const shuffleMove = move as Shuffle<MaterialType>
  const rule = new ShowingsPhaseRule(context.game)
  const player = rule.material(MaterialType.GuestPawns).index(shuffleMove.indexes[0]).getItem()!.location.player
  const playerName = usePlayerName(player)
  return (
    <div css={logContainerCss}>
      <Trans i18nKey="log.showingsPhase.exitZoneGuestsToBagForShuffle" values={{ player: playerName }} />
    </div>
  )
}
