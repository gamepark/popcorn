import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MoneyToken } from '@gamepark/popcorn/material/MoneyToken'
import { isPopcornCreateItemType, isPopcornMoveItemType } from '@gamepark/popcorn/material/PopcornMoves'
import { PopcornToken } from '@gamepark/popcorn/material/PopcornToken'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { MaterialComponent, usePlayerName } from '@gamepark/react-game'
import { CreateItem } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss, materialComponentCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentContext, PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'

export const GetMoneyOrPopcornLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const tokenMove = move as CreateItem<PlayerColor, MaterialType, LocationType>
  const amount = getMoneyAmount(tokenMove, context)
  const playerName = usePlayerName(tokenMove.item.location.player)
  const moneySymbolComponent = (
    <MaterialComponent
      type={tokenMove.itemType}
      itemId={tokenMove.itemType === MaterialType.MoneyTokens ? MoneyToken.Money1 : PopcornToken.Token1}
      css={materialComponentCss}
    />
  )
  const isAudienceBonus = context.action.consequences.slice(0, (context.consequenceIndex ?? 0) + 1).some(isPopcornMoveItemType(MaterialType.AudienceCubes))
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.showingsPhase"
        defaults="{player} gets {type, select, moneyTokens{${amount}} popcornTokens{{amount} Popcorn} other{}} ( <symbol/> ){isAudienceBonus, select, true{ as their audience track bonus} other{}}"
        values={{ amount: amount, player: playerName, type: camelCase(MaterialType[tokenMove.itemType]), isAudienceBonus: isAudienceBonus }}
        components={{ symbol: moneySymbolComponent }}
      />
    </div>
  )
}

const getMoneyAmount = (move: CreateItem<PlayerColor, MaterialType, LocationType>, context: PopcornMoveComponentContext): number => {
  switch (move.itemType) {
    case MaterialType.MoneyTokens:
      return move.item.quantity!
    case MaterialType.PopcornTokens: {
      return context.action.consequences
        .slice(0, (context.consequenceIndex ?? 0) + 1)
        .filter(isPopcornCreateItemType(MaterialType.PopcornTokens))
        .map((move) => (move.item.quantity ?? 0) * (move.item.id as number))
        .reduce((total, current) => current + total, 0)
    }
    default:
      return 0
  }
}
