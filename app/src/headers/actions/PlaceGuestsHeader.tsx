import { HeaderText } from '@gamepark/react-game'
import { FC } from 'react'

export const PlaceGuestsHeader: FC = () => (
  <HeaderText
    code="header.actionRules.placeGuests"
    defaults={{ you: 'You must place Guests inside your theaters', player: '{player} must place Guests inside their theaters' }}
  />
)
