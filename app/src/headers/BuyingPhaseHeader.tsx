/** @jsxImportSource @emotion/react */
import { isPassBuyingPhaseCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'

// const PASS_MOVE_TIME = 30

export const BuyingPhaseHeader: FC = () => {
  const passMove = useLegalMove<MaterialMove<PlayerColor, MaterialType, LocationType>>(isPassBuyingPhaseCustomMove)
  const me = usePlayerId<PlayerColor>()
  const rules = useRules<PopcornRules>()
  const activePlayer = rules?.getActivePlayer()
  const playerName = usePlayerName(activePlayer)
  if (me === activePlayer) {
    return (
      <>
        You can buy a movie, a theater, activate an advertising token or <PlayMoveButton /*auto={PASS_MOVE_TIME}*/ move={passMove}>Pass</PlayMoveButton>
      </>
    )
  }
  return <>{playerName} can buy a movie, a theater, activate an advertising token or pass</>
}
