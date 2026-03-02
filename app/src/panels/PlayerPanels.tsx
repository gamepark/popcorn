import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { MoneyToken, moneyTokens } from '@gamepark/popcorn/material/MoneyToken.ts'
import { PopcornToken, popcornTokens } from '@gamepark/popcorn/material/PopcornToken.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { CounterProps, StyledPlayerPanel, usePlayer, usePlayers, useRules } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import { moneyTokenDescription } from '../material/MoneyTokenDescription.ts'
import { popcornTokenDescription } from '../material/PopcornTokenDescription.ts'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const activePlayer = usePlayer<PlayerColor>()
  const rules = useRules<PopcornRules>()
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => {
        const moneyCounter = {
          value:
            rules?.material(MaterialType.MoneyTokens).location(LocationType.PlayerMoneyPileSpot).player(player.id).money<MoneyToken>(moneyTokens).count ?? 0,
          image: moneyTokenDescription.images[MoneyToken.Money1],
          imageCss: css`
            border-radius: 50%;
          `
        }
        const counters: CounterProps[] =
          activePlayer?.id === player.id
            ? [
                {
                  value:
                    rules
                      ?.material(MaterialType.PopcornTokens)
                      .location(LocationType.PlayerPopcornPileUnderPopcornCupSpot)
                      .player(player.id)
                      .money<PopcornToken>(popcornTokens).count ?? 0,
                  image: popcornTokenDescription.images[PopcornToken.Token1]
                },
                moneyCounter
              ]
            : [moneyCounter]
        return <StyledPlayerPanel key={player.id} player={player} css={panelPosition(index)} activeRing counters={counters} />
      })}
    </>,
    root
  )
}

const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + index * 16}em;
  width: 28em;
`
