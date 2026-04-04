import { AwardCard } from '@gamepark/popcorn/material/AwardCard'
import { AwardCardPopcornCustomMove, isAwardCardPopcornCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PopcornToken } from '@gamepark/popcorn/material/PopcornToken'
import { FinalEndOfRoundPhaseAwardCardsPointsRule } from '@gamepark/popcorn/rules/FinalEndOfRoundPhase/FinalEndOfRoundPhaseAwardCardsPointsRule'
import { MaterialComponent, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss, materialComponentCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'
import { MaterialComponentWithHelp } from '../utils/MaterialComponentWithHelp'

export const AwardCardPopcornGivenLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const cardMove = move as AwardCardPopcornCustomMove
  const rule = new FinalEndOfRoundPhaseAwardCardsPointsRule(context.game)
  const player = cardMove.data.player
  const firstAwardCardMoveForPlayer = context.action.consequences
    .slice(0, (context.consequenceIndex ?? 0) + 1)
    .findIndex((m) => isAwardCardPopcornCustomMove(m) && m.data.player === player)
  const awardCard = rule.material(MaterialType.AwardCards).id<AwardCard>(cardMove.data.cardId).getItem<AwardCard>() ?? {
    id: cardMove.data.cardId,
    location: { type: LocationType.PlayerAwardCardHand, player: player, x: (context.consequenceIndex ?? 0) - firstAwardCardMoveForPlayer }
  }
  const awardCardComponent = <MaterialComponentWithHelp<AwardCard> itemType={MaterialType.AwardCards} item={awardCard} displayHelp />
  const playerName = usePlayerName(player)
  const amount = cardMove.data.popcorn
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.finalEndOfRoundPhase.awardCardPoints"
        values={{ player: playerName, amount: amount }}
        components={{
          awardCard: awardCardComponent,
          popcorn: <MaterialComponent type={MaterialType.PopcornTokens} itemId={PopcornToken.Token1} css={materialComponentCss} />
        }}
      />
    </div>
  )
}
