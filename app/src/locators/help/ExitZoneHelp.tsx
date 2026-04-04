import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { LocationHelpProps, usePlayerName, useRules } from '@gamepark/react-game'
import { isSameLocationArea } from '@gamepark/rules-api'
import { countBy } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { GuestNumberTable } from '../utils/GuestNumberTable'

export const ExitZoneHelp: FC<LocationHelpProps<PlayerColor, LocationType>> = ({ location }) => {
  const playerName = usePlayerName(location.player)
  const rules = useRules<PopcornRules>()
  const guests =
    rules
      ?.material(MaterialType.GuestPawns)
      .location((l) => isSameLocationArea(l, location))
      .getItems<GuestPawn>() ?? []
  const numberOfGuests = guests.length
  const numberOfGuestsPerColor = countBy(guests, (guest) => guest.id)
  return (
    <>
      <h2>
        <Trans i18nKey="help.location.guestPawn.exitZone.title" values={{ player: playerName }} />
      </h2>
      <p>
        <Trans i18nKey="help.location.guestPawn.exitZone.description" values={{ player: playerName, numberOfGuests: numberOfGuests }} />
      </p>
      <GuestNumberTable numberOfGuestsPerColor={numberOfGuestsPerColor} />
    </>
  )
}
