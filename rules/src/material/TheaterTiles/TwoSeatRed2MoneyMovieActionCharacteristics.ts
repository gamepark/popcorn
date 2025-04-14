import { SeatAction, SeatColor, SeatsNumber } from '../TheaterTile'
import { getTheaterSeatAction, getTheaterSeatColor, TheaterTileCharacteristics } from './TheaterTileCharacteristics'

export class TwoSeatRed2MoneyMovieActionCharacteristics implements TheaterTileCharacteristics {
  private readonly seatColors: SeatColor[] = [SeatColor.Red, SeatColor.Grey]
  private readonly seatActions: SeatAction[] = [SeatAction.Get2Money, SeatAction.MovieAction]

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
    return SeatsNumber.Two
  }
}
