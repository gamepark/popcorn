import { ActionType } from '../../../material/Actions/ActionType'
import { ChooseMovieActionAction } from '../../../material/Actions/ChooseMovieActionAction'
import { ChooseSeatActionAction } from '../../../material/Actions/ChooseSeatActionAction'
import { GuestPawn } from '../../../material/GuestPawn'
import { getMovieColorFromGuestPawn, MovieColor } from '../../../material/MovieCard'
import { getSeatColorFromGuestPawn, SeatColor } from '../../../material/TheaterTile'

export const buildPendingActionsForGuest = (
  seatColor: SeatColor | undefined,
  guestPawnColor: GuestPawn,
  guestPawnIndex: number,
  movieColor: MovieColor
): (ChooseSeatActionAction | ChooseMovieActionAction)[] => {
  const actionsToPush: (ChooseSeatActionAction | ChooseMovieActionAction)[] = []
  if (seatColor !== undefined && (seatColor === SeatColor.Grey || seatColor === getSeatColorFromGuestPawn(guestPawnColor))) {
    actionsToPush.push({
      type: ActionType.ChooseSeatAction,
      guestIndex: guestPawnIndex
    })
  }
  if (movieColor === getMovieColorFromGuestPawn(guestPawnColor)) {
    actionsToPush.push({
      type: ActionType.ChooseMovieAction,
      guestIndex: guestPawnIndex,
      isSeatAction: false
    })
  }
  return actionsToPush
}
