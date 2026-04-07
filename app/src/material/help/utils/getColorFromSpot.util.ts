import { AdvertisingTokenSpot } from '@gamepark/popcorn/material/AdvertisingTokenSpot'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'

export const getColorFromSpot = (spot: AdvertisingTokenSpot): GuestPawn | undefined => {
  switch (spot) {
    case AdvertisingTokenSpot.YellowGuestPawn:
      return GuestPawn.Yellow
    case AdvertisingTokenSpot.GreenGuestPawn:
      return GuestPawn.Green
    case AdvertisingTokenSpot.RedGuestPawn:
      return GuestPawn.Red
    case AdvertisingTokenSpot.BlueGuestPawn:
      return GuestPawn.Blue
    default:
      return undefined
  }
}
