import { SeatAction, SeatColor, SeatsNumber } from '../TheaterTile'
import { getTheaterSeatAction, getTheaterSeatColor, TheaterTileCharacteristics } from './TheaterTileCharacteristics'

export class OneSeat1PopcornCharacteristics implements TheaterTileCharacteristics {
  private readonly seatActions: SeatAction[] = [SeatAction.Get1Popcorn]
  private readonly seatColors: SeatColor[] = [SeatColor.Grey]

  public getPrice(): number {
    return 2
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
