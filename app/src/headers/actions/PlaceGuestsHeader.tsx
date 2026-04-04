import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { HeaderText, usePlayerId, useRules } from '@gamepark/react-game'
import { FC } from 'react'

export const PlaceGuestsHeader: FC = () => {
  const rules = useRules<PopcornRules>()
  const me = usePlayerId<PlayerColor>() ?? (rules?.activePlayers.length === 1 ? rules.activePlayers[0] : undefined)
  const guestsNumber =
    me !== undefined
      ? rules?.material(MaterialType.GuestPawns).location(LocationType.PlayerShowingsDrawnGuestSpot).player(me).length
      : rules?.activePlayers.length === 1
  return <HeaderText code="actionRules.placeGuests" values={{ guestsNumber: guestsNumber }} />
}
