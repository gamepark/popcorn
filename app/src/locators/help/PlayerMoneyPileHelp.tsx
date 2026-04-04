import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { moneyTokens } from '@gamepark/popcorn/material/MoneyToken'
import { PopcornToken } from '@gamepark/popcorn/material/PopcornToken'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { LocationHelpProps, MaterialComponent, usePlayerName, useRules } from '@gamepark/react-game'
import { isSameLocationArea } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const PlayerMoneyPileHelp: FC<LocationHelpProps<PlayerColor, LocationType>> = ({ location }) => {
  const rule = useRules<PopcornRules>()
  const amount = rule
    ?.material(MaterialType.MoneyTokens)
    .location((l) => isSameLocationArea(l, location))
    .money(moneyTokens).count
  const playerName = usePlayerName(location.player)
  const popcornAmount = Math.floor((amount ?? 0) / 5)
  return (
    <>
      <h2>
        <Trans i18nKey="help.location.moneyToken.playerPile.title" values={{ player: playerName }} />
      </h2>
      <p>
        <Trans
          i18nKey="help.location.moneyToken.playerPile.description"
          values={{ player: playerName, amount: amount, popcornAmount: popcornAmount }}
          components={{
            popcorn: (
              <MaterialComponent
                type={MaterialType.PopcornTokens}
                itemId={PopcornToken.Token1}
                css={css`
                  display: inline-block;
                  vertical-align: middle;
                `}
              />
            )
          }}
        />
      </p>
    </>
  )
}
