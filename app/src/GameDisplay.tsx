import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export function GameDisplay({ players }: GameDisplayProps) {
  const bounds = { xMin: -60, xMax: 60, yMin: -35, yMax: 35 }
  if (players == 2) {
    bounds.xMin = -50
    bounds.xMax = 50
    bounds.yMin = -30
    bounds.yMax = 30
  }
  const margin = { top: 7, left: 0, right: 30, bottom: 0 }
  return (
    <>
      <GameTable
        xMin={bounds.xMin}
        xMax={bounds.xMax}
        yMin={bounds.yMin}
        yMax={bounds.yMax}
        margin={margin}
        css={process.env.NODE_ENV === 'development' && tableBorder}
      >
        <GameTableNavigation />
        <PlayerPanels />
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
