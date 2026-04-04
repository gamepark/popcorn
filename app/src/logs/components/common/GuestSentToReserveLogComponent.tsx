import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { ShowingsPhaseRule } from '@gamepark/popcorn/rules/ShowingsPhaseRule'
import { MaterialComponent, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { guestPawnCss, logContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'

export const GuestSentToReserveLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const guestMove = move as MoveItem<PlayerColor, MaterialType, LocationType>
  const rule = new ShowingsPhaseRule(context.game)
  const guest = rule.material(MaterialType.GuestPawns).index(guestMove.itemIndex).getItem<GuestPawn>()!
  const guestComponent = <MaterialComponent type={MaterialType.GuestPawns} itemId={guest.id} css={guestPawnCss} />
  const playerName = usePlayerName(guest.location.player)
  return (
    <div css={logContainerCss}>
      <Trans i18nKey="log.common.guestSentToReserve" values={{ player: playerName }} components={{ guest: guestComponent }} />
    </div>
  )
}
