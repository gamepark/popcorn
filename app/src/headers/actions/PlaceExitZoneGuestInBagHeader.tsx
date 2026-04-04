import { HeaderText } from '@gamepark/react-game'
import { FC } from 'react'

export const PlaceExitZoneGuestInBagHeader: FC = () => (
  <HeaderText
    code="actionRules.placeExitZoneGuestInBag"
    defaults={{ you: 'You must put a Guest from your exit zone into your bag', player: '{player} must put a Guest from your exit zone into their bag' }}
  />
)
