import { SeatAction, SeatColor, SeatsNumber } from '../TheaterTile'
import { getTheaterSeatAction, getTheaterSeatColor, TheaterTileCharacteristics } from './TheaterTileCharacteristics'

export class ThreeSeatRedGreyGreyCharacteristics implements TheaterTileCharacteristics {
  private readonly seatColors: SeatColor[] = [SeatColor.Red, SeatColor.Grey, SeatColor.Grey]
  private readonly seatActions: SeatAction[] = [SeatAction.DrawGuestAndPlaceThem, SeatAction.MovieAction, SeatAction.Get1Popcorn]

  public getPrice(): number {
    return 9
  }

  public getSeatAction(seatNumber: number): SeatAction | undefined {
    return getTheaterSeatAction(this.seatActions, seatNumber)
  }

  public getSeatColor(seatNumber: number): SeatColor | undefined {
    return getTheaterSeatColor(this.seatColors, seatNumber)
  }

  public getSeatsNumber(): Exclude<SeatsNumber, SeatsNumber.Default> {
    return SeatsNumber.Three
  }
}
