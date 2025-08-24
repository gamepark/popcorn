/** @jsxImportSource @emotion/react */
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'

// const PASS_MOVE_TIME = 30

export const BuyingPhaseHeader: FC = () => {
  //const passMove = useLegalMove<MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>>(is)
  const me = usePlayerId<PlayerColor>()
  const rules = useRules<PopcornRules>()
  const activePlayer = rules?.getActivePlayer()
  const playerName = usePlayerName(activePlayer)
  if (me === activePlayer) {
    return <>You can buy a movie, a theater, activate an advertising token or PASS</>
  }
  return <>{playerName} can buy a movie, a theater, activate an advertising token or pass</>
}
