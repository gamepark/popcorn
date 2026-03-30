import { PickReserveOrExitZoneGuestAction } from '@gamepark/popcorn/material/Actions/PickReserveOrExitZoneGuestAction'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { HeaderText } from '@gamepark/react-game'
import { FC } from 'react'

type PickReserveOrExitZoneGuestHeaderProps = {
  action: PickReserveOrExitZoneGuestAction
}

export const PickReserveOrExitZoneGuestHeader: FC<PickReserveOrExitZoneGuestHeaderProps> = ({ action }) => {
  if (action.guest === GuestPawn.White) {
    return (
      <HeaderText
        code="header.actionRules.pickReserveOrExitZoneGuest.white"
        defaults={{
          you: 'You must send a white Guest from your exit zone or the reserve to the bag of any player',
          player: '{player} must send a white Guest from their exit zone or the reserve to the bag of any player'
        }}
      />
    )
  }
  return (
    <HeaderText
      code="header.actionRules.pickReserveOrExitZoneGuest.coloredGuest"
      defaults={{
        you: "You must take a {colorEnum, select, 1{blue} 2{green} 3{red} 5{yellow} 4{any coloured} other{}} Guest from the reserve or another player's exit zone and put it in your bag",
        player:
          "{player} must take a {colorEnum, select, 1{blue} 2{green} 3{red} 5{yellow} 4{any colored} other{}} Guest from the reserve or another player's exit zone and put it in their bag"
      }}
      values={{ colorEnum: action.guest }}
    />
  )
}
