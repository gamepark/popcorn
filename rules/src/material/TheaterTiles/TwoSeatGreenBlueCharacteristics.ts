import { SeatAction, SeatColor, SeatsNumber } from '../TheaterTile'
import { getTheaterSeatAction, getTheaterSeatColor, TheaterTileCharacteristics } from './TheaterTileCharacteristics'

export class TwoSeatGreenBlueCharacteristics implements TheaterTileCharacteristics {
  private readonly seatActions: SeatAction[] = [SeatAction.MovieAction, SeatAction.Get2Popcorn]
  private readonly seatColors: SeatColor[] = [SeatColor.Green, SeatColor.Blue]

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
