import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { MoneyToken, moneyTokens } from '@gamepark/popcorn/material/MoneyToken.ts'
import { PopcornToken, popcornTokens } from '@gamepark/popcorn/material/PopcornToken.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { CounterProps, StyledPlayerPanel, usePlay, usePlayer, usePlayers, useRules } from '@gamepark/react-game'
import { LocalMoveType, MoveKind } from '@gamepark/rules-api'
import { createPortal } from 'react-dom'
import { moneyTokenDescription } from '../material/MoneyTokenDescription.ts'
import { popcornTokenDescription } from '../material/PopcornTokenDescription.ts'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const activePlayer = usePlayer<PlayerColor>()
  const rules = useRules<PopcornRules>()
  const root = document.getElementById('root')
  const play = usePlay()
  const defaultView = players[0]?.id
  const currentView = (rules?.game.view as PlayerColor) ?? defaultView
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => {
        const isClickable = player.id != currentView
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
        return (
          <StyledPlayerPanel
            key={player.id}
            player={player}
            css={[panelPosition(index), isClickable && clickablePanel]}
            activeRing
            counters={counters}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              play(
                {
                  kind: MoveKind.LocalMove,
                  type: LocalMoveType.ChangeView,
                  view: player.id
                },
                { transient: true }
              )
            }}
          />
        )
      })}
    </>,
    root
  )
}

const panelPosition = (index: number) => {
  const margin = index > 0 ? index * 10 + 4 : 0
  return css`
    position: absolute;
    right: 1em;
    top: ${8.5 + margin}em;
    width: 28em;
  `
}

const clickablePanel = css`
  border: 0.1em solid lightslategrey;
  box-shadow: 0.1em 0.1em 0.5em black;
  cursor: pointer;

  &:hover {
    border: 0.1em solid rgba(255, 215, 0, 0.5);
    box-shadow: 0 0 0.25em gold;
  }
`
