import { css } from '@emotion/react'
import { faHandPointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { getRelativePlayerIndex, ItemContext, ItemMenuButton, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

type WhiteGuestPawnItemButtonProps = {
  move: MoveItem<PlayerColor, MaterialType, LocationType>
  context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
}
export const WhiteGuestPawnItemButton: FC<WhiteGuestPawnItemButtonProps> = ({ move, context }) => {
  const playerName = usePlayerName(move.location.player)
  const playerNumbers = context.rules.game.players.length
  return (
    <ItemMenuButton
      move={move}
      x={1.25}
      y={(2 * getRelativePlayerIndex(context, move.location.player) - playerNumbers + 1) * 0.725}
      css={css`
        width: 1.5em;
        height: 1.5em;
      `}
      label={
        <Trans
          key={`player.${move.location.player}`}
          i18nKey="button.itemMenu.guestPawn.sendToBag"
          values={{ isMe: move.location.player === context.player, player: playerName }}
        />
      }
      labelPosition="right"
    >
      <FontAwesomeIcon icon={faHandPointer} size="xs" />
    </ItemMenuButton>
  )
}
