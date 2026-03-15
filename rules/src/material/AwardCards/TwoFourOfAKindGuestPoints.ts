import { AwardCardPointFunction } from '../AwardCard'
import { GuestPawn } from '../GuestPawn'

export const TwoFourOfAKindGuestPoints: AwardCardPointFunction = (
  _playerMovieCardArchiveMaterial,
  _playerTheaterTilesMaterial,
  guestNumberByColor,
  _numberOfGuestsToDraw
) =>
  5 *
  Math.floor(
    Math.min(
      guestNumberByColor[GuestPawn.Blue] ?? 0,
      guestNumberByColor[GuestPawn.Green] ?? 0,
      guestNumberByColor[GuestPawn.Red] ?? 0,
      guestNumberByColor[GuestPawn.Yellow] ?? 0
    ) / 2
  )
