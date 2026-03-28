import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'

export const NewFirstPlayerLogComponent: FC<PopcornMoveComponentProps> = ({ move }) => {
  const markerMove = move as MoveItem<PlayerColor, MaterialType, LocationType>
  const playerName = usePlayerName(markerMove.location.player)
  return (
    <div css={ruleLogContainerCss}>
      <Trans i18nKey="log.EndOfRoundPhase.newFirstPlayer" defaults="{player} becomes the first player for this round" values={{ player: playerName }} />
    </div>
  )
}
