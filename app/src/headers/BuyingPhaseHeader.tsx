import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isStartPlayerTurn, isStartSimultaneousRule, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'

// const PASS_MOVE_TIME = 30

export const BuyingPhaseHeader: FC = () => {
  //const passMove = useLegalMove<MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>>(is)
  const me = usePlayerId<PlayerColor>()
  const rules = useRules<PopcornRules>()
  const activePlayer = rules?.getActivePlayer()
  const playerName = usePlayerName(activePlayer)
  const moves = useLegalMoves<MaterialMove<PlayerColor, MaterialType, LocationType>>()
  const passMove = moves.find(isStartPlayerTurn) ?? moves.find(isStartSimultaneousRule)
  const isPassOnlyMove = moves.length === 1 && passMove !== undefined
  if (me === activePlayer) {
    return (
      <>
        You can buy a movie, a theater, activate an advertising token or{' '}
        <PlayMoveButton move={passMove} {...(isPassOnlyMove ? { auto: 10 } : {})}>
          PASS
        </PlayMoveButton>
      </>
    )
  }
  return <>{playerName} can buy a movie, a theater, activate an advertising token or pass</>
}
