import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { HeaderText, usePlayerId, useRules } from '@gamepark/react-game'
import { FC } from 'react'

export const PlaceGuestsHeader: FC = () => {
  const rules = useRules<PopcornRules>()
  const me = usePlayerId<PlayerColor>() ?? (rules?.activePlayers.length === 1 ? rules.activePlayers[0] : undefined)
  const guestsNumber =
    me !== undefined
      ? rules?.material(MaterialType.GuestPawns).location(LocationType.PlayerShowingsDrawnGuestSpot).player(me).length
      : rules?.activePlayers.length === 1
  return (
    <HeaderText
      code="header.actionRules.placeGuests"
      defaults={{
        you: 'You must place your {guestsNumber, plural, =1{Guest} other{Guests}} inside your theaters',
        player: '{player} must place their {guestsNumber, plural, =1{Guest} other{Guests}} inside their theaters',
        players: 'Players must place their Guests inside their theaters'
      }}
      values={{ guestsNumber: guestsNumber }}
    />
  )
}
