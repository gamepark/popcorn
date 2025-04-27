import { SeatAction, SeatColor, SeatsNumber } from '../TheaterTile'
import { getTheaterSeatAction, getTheaterSeatColor, TheaterTileCharacteristics } from './TheaterTileCharacteristics'

export class ThreeSeatBlueBlueGreyCharacteristics implements TheaterTileCharacteristics {
  private readonly seatActions: SeatAction[] = [SeatAction.DrawGuestAndPlaceThem, SeatAction.Get2Popcorn, SeatAction.MovieAction]
  private readonly seatColors: SeatColor[] = [SeatColor.Blue, SeatColor.Blue, SeatColor.Grey]

  public getPrice(): number {
    return 8
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
