import { Actions } from '@gamepark/popcorn/material/Actions/Actions'
import { Memory } from '@gamepark/popcorn/Memory'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { HeaderText, usePlayerId, useRules } from '@gamepark/react-game'
import { getPendingActionHeader } from './utils/getPendingActionHeader'

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
  return <HeaderText code="showingsPhase" />
}
