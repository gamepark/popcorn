import { SeatAction, SeatColor, SeatsNumber } from '../TheaterTile'
import { getTheaterSeatAction, getTheaterSeatColor, TheaterTileCharacteristics } from './TheaterTileCharacteristics'

export class ThreeSeatYellow3MoneyRedGreyCharacteristics implements TheaterTileCharacteristics {
  private readonly seatColors: SeatColor[] = [SeatColor.Yellow, SeatColor.Red, SeatColor.Grey]
  private readonly seatActions: SeatAction[] = [SeatAction.Get3Money, SeatAction.PlaceGuestInReserve, SeatAction.MovieAction]

  public getPrice(): number {
    return 7
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
