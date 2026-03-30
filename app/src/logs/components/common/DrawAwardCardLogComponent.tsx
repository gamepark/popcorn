import { AwardCard } from '@gamepark/popcorn/material/AwardCard'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { isPopcornMoveItemType } from '@gamepark/popcorn/material/PopcornMoves'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { usePlayerName } from '@gamepark/react-game'
import { Location, MaterialItem, MoveItemsAtOnce } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'
import { MaterialComponentWithHelp } from '../utils/MaterialComponentWithHelp'

export const DrawAwardCardLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const cardMove = move as MoveItemsAtOnce<PlayerColor, MaterialType, LocationType>
  const isAudienceBonus = context.action.consequences.slice(0, (context.consequenceIndex ?? 0) + 1).some(isPopcornMoveItemType(MaterialType.AudienceCubes))
  const playerName = usePlayerName(cardMove.location.player)
  const rule = new PopcornRules(context.game)
  const cardComponents = (
    <>
      {cardMove.indexes.map((cardIndex, index) => {
        const cardId = cardMove.reveal ? (cardMove.reveal[cardIndex].id as AwardCard) : undefined
        const card = rule.material(MaterialType.AwardCards).index(cardIndex).getItem<AwardCard | undefined>()!
        const cardItem = cardId
          ? ({ ...card, id: cardId, location: cardMove.location as Location } as MaterialItem<PlayerColor, LocationType, AwardCard | undefined>)
          : card
        return (
          <MaterialComponentWithHelp<AwardCard | undefined>
            itemType={MaterialType.AwardCards}
            item={cardItem}
            displayHelp={cardItem.id !== undefined}
            key={`a-${context.action.id}-m-${context.consequenceIndex}-c-${index}`}
          />
        )
      })}
    </>
  )
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.common.drawAwardCards"
        defaults="{player} draws <cards/> from the Award cards deck{isAudienceBonus, select, true{ as their audience track bonus} other{}}"
        values={{ player: playerName, isAudienceBonus: isAudienceBonus }}
        components={{ cards: cardComponents }}
      />
    </div>
  )
}
