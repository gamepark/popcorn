import { AwardCard } from '@gamepark/popcorn/material/AwardCard.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'
import { MaterialComponentWithHelp } from '../utils/MaterialComponentWithHelp.tsx'

export const DiscardAwardCardLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const discardMove = move as MoveItem<PlayerColor, MaterialType, LocationType>
  const rule = new PopcornRules(context.game)
  const card = rule.material(MaterialType.AwardCards).index(discardMove.itemIndex).getItem<AwardCard | undefined>()!
  const playerName = usePlayerName(card.location.player)
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.common.discardAwardCard"
        defaults="{player} discards <card/>"
        values={{ player: playerName }}
        components={{
          card: <MaterialComponentWithHelp<AwardCard | undefined> itemType={MaterialType.AwardCards} item={card} displayHelp={card.id !== undefined} />
        }}
      />
    </div>
  )
}
