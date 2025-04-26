import { getEnumValues } from '@gamepark/rules-api'

export enum GuestPawn {
  Blue = 1,
  Green,
  Red,
  White,
  Yellow
}

export const guestPawns = getEnumValues(GuestPawn)
