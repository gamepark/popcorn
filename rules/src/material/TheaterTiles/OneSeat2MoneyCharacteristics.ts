import { SeatAction, SeatColor, SeatsNumber } from '../TheaterTile'
import { getTheaterSeatAction, getTheaterSeatColor, TheaterTileCharacteristics } from './TheaterTileCharacteristics'

export class OneSeat2MoneyCharacteristics implements TheaterTileCharacteristics {
  private readonly seatActions: SeatAction[] = [SeatAction.Get2Money]
  private readonly seatsColors: SeatColor[] = [SeatColor.Green]

  public getPrice(): number {
    return 3
  }

  public getSeatAction(seatNumber: number): SeatAction | undefined {
    return getTheaterSeatAction(this.seatActions, seatNumber)
  }

  public getSeatColor(seatNumber: number): SeatColor | undefined {
    return getTheaterSeatColor(this.seatsColors, seatNumber)
  }

  public getSeatsNumber(): SeatsNumber {
    return SeatsNumber.One
  }
}
