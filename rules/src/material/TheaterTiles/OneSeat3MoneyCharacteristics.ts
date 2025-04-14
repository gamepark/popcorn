import { SeatAction, SeatColor, SeatsNumber } from '../TheaterTile'
import { getTheaterSeatAction, getTheaterSeatColor, TheaterTileCharacteristics } from './TheaterTileCharacteristics'

export class OneSeat3MoneyCharacteristics implements TheaterTileCharacteristics {
  private readonly seatColors: SeatColor[] = [SeatColor.Grey]
  private readonly seatActions: SeatAction[] = [SeatAction.Get3Money]

  public getPrice(): number {
    return 5
  }

  public getSeatAction(seatNumber: number): SeatAction | undefined {
    return getTheaterSeatAction(this.seatActions, seatNumber)
  }

  public getSeatColor(seatNumber: number): SeatColor | undefined {
    return getTheaterSeatColor(this.seatColors, seatNumber)
  }

  public getSeatsNumber(): Exclude<SeatsNumber, SeatsNumber.Default> {
    return SeatsNumber.One
  }
}
