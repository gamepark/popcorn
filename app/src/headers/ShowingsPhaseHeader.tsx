import { Actions } from '@gamepark/popcorn/material/Actions/Actions.ts'
import { Memory } from '@gamepark/popcorn/Memory.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { HeaderText, usePlayerId, useRules } from '@gamepark/react-game'
import { getPendingActionHeader } from './utils/getPendingActionHeader.tsx'

export const ShowingsPhaseHeader = () => {
  const rules = useRules<PopcornRules>()
  const me = usePlayerId<PlayerColor>()
  const player = me !== undefined && rules?.activePlayers?.includes(me) ? me : rules?.activePlayers.length === 1 ? rules.activePlayers[0] : undefined
  if (player !== undefined) {
    const pendingActions = rules?.remind<Actions[]>(Memory.PendingActions, player)
    if (pendingActions !== undefined && pendingActions.length > 0) {
      return getPendingActionHeader(pendingActions[0])
    }
  }
  return <HeaderText code="showingsPhase" defaults={{ you: ' ', players: 'Players must finish their showings phase' }} />
}
