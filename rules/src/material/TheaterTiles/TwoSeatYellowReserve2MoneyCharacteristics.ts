import { SeatAction, SeatColor, SeatsNumber } from '../TheaterTile'
import { getTheaterSeatAction, getTheaterSeatColor, TheaterTileCharacteristics } from './TheaterTileCharacteristics'

export class TwoSeatYellowReserve2MoneyCharacteristics implements TheaterTileCharacteristics {
  private readonly seatColors: SeatColor[] = [SeatColor.Yellow, SeatColor.Grey]
  private readonly seatActions: SeatAction[] = [SeatAction.PlaceGuestInReserve, SeatAction.Get2Money]

  public getPrice(): number {
    return 4
  }

  public getSeatAction(seatNumber: number): SeatAction | undefined {
    return getTheaterSeatAction(this.seatActions, seatNumber)
  }

  public getSeatColor(seatNumber: number): SeatColor | undefined {
    return getTheaterSeatColor(this.seatColors, seatNumber)
  }

  public getSeatsNumber(): Exclude<SeatsNumber, SeatsNumber.Default> {
    return SeatsNumber.Two
  }
}
