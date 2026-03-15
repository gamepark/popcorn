import { HeaderText } from '@gamepark/react-game'
import { FC } from 'react'

export const PlaceCinemaGuestInReserveHeader: FC = () => (
  <HeaderText
    code="header.actionRules.PlaceCinemaGuestInReserveHeader"
    defaults={{
      you: 'You must send a guest from your cinema or exit zone to the reserve',
      player: '{player} must send a guest from their cinema or exit zone to the reserve'
    }}
  />
)
