import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { ShowingsPhaseRule } from '@gamepark/popcorn/rules/ShowingsPhaseRule.ts'
import { MaterialComponent, usePlayerName } from '@gamepark/react-game'
import { MoveItemsAtOnce } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { guestPawnCss, logContainerCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'

export const GuestsSentToExitZoneLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const guestsMove = move as MoveItemsAtOnce<PlayerColor, MaterialType, LocationType>
  const rule = new ShowingsPhaseRule(context.game)
  const playerName = usePlayerName(context.action.playerId)
  const guestComponents = (
    <>
      {rule
        .material(MaterialType.GuestPawns)
        .index(guestsMove.indexes)
        .getItems<GuestPawn>()
        .map((guest, index) => (
          <MaterialComponent
            key={`a-${context.action.id}-m-${context.consequenceIndex ?? -1}-g-${index}`}
            type={MaterialType.GuestPawns}
            itemId={guest.id}
            css={guestPawnCss}
          />
        ))}
    </>
  )
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey=""
        defaults="<guests/> cannot be used to perform their Seat Action nor Movie Action so {player} sends them to their Exit zone"
        values={{ player: playerName }}
        components={{ guests: guestComponents }}
      />
    </div>
  )
}
