import { SeatAction, SeatColor, SeatsNumber } from '../TheaterTile'
import { getTheaterSeatAction, getTheaterSeatColor, TheaterTileCharacteristics } from './TheaterTileCharacteristics'

export class TwoSeatYellow2PopcornMovieActionCharacteristics implements TheaterTileCharacteristics {
  private readonly seatActions: SeatAction[] = [SeatAction.Get2Popcorn, SeatAction.MovieAction]
  private readonly seatColors: SeatColor[] = [SeatColor.Yellow, SeatColor.Grey]

  public getPrice(): number {
    return 6
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
