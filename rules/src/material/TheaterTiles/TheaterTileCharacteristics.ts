import { SeatAction, SeatColor, SeatsNumber } from '../TheaterTile'

export interface TheaterTileCharacteristics {
  getPrice(): number
  getSeatsNumber(): Exclude<SeatsNumber, SeatsNumber.Default>
  getSeatColor(seatNumber: number): SeatColor | undefined
  getSeatAction(seatNumber: number): SeatAction | undefined
}

export const getTheaterSeatColor = (seatColors: SeatColor[], seatNumber: number): SeatColor | undefined =>
  seatNumber in seatColors ? seatColors[seatNumber] : undefined

export const getTheaterSeatAction = (seatActions: SeatAction[], seatNumber: number): SeatAction | undefined =>
  seatNumber in seatActions ? seatActions[seatNumber] : undefined
