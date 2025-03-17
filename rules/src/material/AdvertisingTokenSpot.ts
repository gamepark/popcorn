import { getEnumValues } from '@gamepark/rules-api'

export enum AdvertisingTokenSpot {
  PlaceWhiteTokenIntoAnyBag = 1,
  YellowGuestPawn,
  GreenGuestPawn,
  RedGuestPawn,
  BlueGuestPawn,
  AnyGuestPawn
}

export const advertisingTokenSpots = getEnumValues(AdvertisingTokenSpot)
