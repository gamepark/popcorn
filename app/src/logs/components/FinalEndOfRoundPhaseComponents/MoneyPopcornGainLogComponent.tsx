import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { MoneyToken } from '@gamepark/popcorn/material/MoneyToken.ts'
import { PopcornToken } from '@gamepark/popcorn/material/PopcornToken.ts'
import { FinalEndOfRoundPhaseMoneyRule } from '@gamepark/popcorn/rules/FinalEndOfRoundPhase/FinalEndOfRoundPhaseMoneyRule.ts'
import { MaterialComponent, usePlayerName } from '@gamepark/react-game'
import { DeleteItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss, materialComponentCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'

export const MoneyPopcornGainLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const deleteMoneyMove = move as DeleteItem<MaterialType>
  const moneyAmount = deleteMoneyMove.quantity!
  const popcornAmount = Math.floor(moneyAmount / 5)
  const rule = new FinalEndOfRoundPhaseMoneyRule(context.game)
  const player = rule.material(MaterialType.MoneyTokens).index(deleteMoneyMove.itemIndex).getItem<MoneyToken>()!.location.player
  const playerName = usePlayerName(player)
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.FinalEndOfRoundPhaseMoneyPoints.moneyPopcornExchange"
        defaults="{player} exchanges ${moneyAmount} (<money/>) for {popcornAmount} Popcorn (<popcorn/>)"
        values={{ player: playerName, moneyAmount: moneyAmount, popcornAmount: popcornAmount }}
        components={{
          money: <MaterialComponent type={MaterialType.MoneyTokens} itemId={MoneyToken.Money1} css={materialComponentCss} />,
          popcorn: <MaterialComponent type={MaterialType.PopcornTokens} itemId={PopcornToken.Token1} css={materialComponentCss} />
        }}
      />
    </div>
  )
}
