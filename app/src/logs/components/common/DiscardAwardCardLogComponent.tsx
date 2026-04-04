import { AwardCard } from '@gamepark/popcorn/material/AwardCard'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'
import { MaterialComponentWithHelp } from '../utils/MaterialComponentWithHelp'

export const DiscardAwardCardLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const discardMove = move as MoveItem<PlayerColor, MaterialType, LocationType>
  const rule = new PopcornRules(context.game)
  const card = rule.material(MaterialType.AwardCards).index(discardMove.itemIndex).getItem<AwardCard | undefined>()!
  const playerName = usePlayerName(card.location.player)
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.common.discardAwardCard"
        values={{ player: playerName }}
        components={{
          card: <MaterialComponentWithHelp<AwardCard | undefined> itemType={MaterialType.AwardCards} item={card} displayHelp={card.id !== undefined} />
        }}
      />
    </div>
  )
}
