import { inRange } from 'es-toolkit'
import { AwardCardPointFunction } from '../AwardCard'
import { GuestPawn } from '../GuestPawn'

export const GuestNumberPoints: AwardCardPointFunction = (
  _playerMovieCardArchiveMaterial,
  _playerTheaterTilesMaterial,
  guestNumberByColor,
  _numberOfGuestsToDraw
) => {
  const numberOfGuests =
    (guestNumberByColor[GuestPawn.Blue] ?? 0) +
    (guestNumberByColor[GuestPawn.Green] ?? 0) +
    (guestNumberByColor[GuestPawn.Red] ?? 0) +
    (guestNumberByColor[GuestPawn.Yellow] ?? 0) +
    (guestNumberByColor[GuestPawn.White] ?? 0)
  return inRange(numberOfGuests, 7) ? 5 : inRange(numberOfGuests, 7, 9) ? 3 : 0
}
