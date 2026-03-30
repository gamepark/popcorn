import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ruleLogContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'

export const NewFirstPlayerLogComponent: FC<PopcornMoveComponentProps> = ({ move }) => {
  const markerMove = move as MoveItem<PlayerColor, MaterialType, LocationType>
  const playerName = usePlayerName(markerMove.location.player)
  return (
    <div css={ruleLogContainerCss}>
      <Trans i18nKey="log.EndOfRoundPhase.newFirstPlayer" defaults="{player} becomes the first player for this round" values={{ player: playerName }} />
    </div>
  )
}
