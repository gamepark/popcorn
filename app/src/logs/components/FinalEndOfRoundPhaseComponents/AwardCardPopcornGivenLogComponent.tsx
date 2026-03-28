import { AwardCard } from '@gamepark/popcorn/material/AwardCard.ts'
import { AwardCardPopcornCustomMove, isAwardCardPopcornCustomMove } from '@gamepark/popcorn/material/CustomMoveType.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PopcornToken } from '@gamepark/popcorn/material/PopcornToken.ts'
import { FinalEndOfRoundPhaseAwardCardsPointsRule } from '@gamepark/popcorn/rules/FinalEndOfRoundPhase/FinalEndOfRoundPhaseAwardCardsPointsRule.ts'
import { MaterialComponent, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss, materialComponentCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'
import { MaterialComponentWithHelp } from '../utils/MaterialComponentWithHelp.tsx'

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
        i18nKey=""
        defaults="{player} {amount, plural, =0{doesn't gain any} other{gains #}} Popcorn (<popcorn/>) thanks to <awardCard/>"
        values={{ player: playerName, amount: amount }}
        components={{
          awardCard: awardCardComponent,
          popcorn: <MaterialComponent type={MaterialType.PopcornTokens} itemId={PopcornToken.Token1} css={materialComponentCss} />
        }}
      />
    </div>
  )
}
