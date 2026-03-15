import { AwardCardPointFunction } from '../AwardCard'
import { GuestPawn } from '../GuestPawn'

export const RedYellowGuestPairPoints: AwardCardPointFunction = (
  _playerMovieCardArchiveMaterial,
  _playerTheaterTilesMaterial,
  guestNumberByColor,
  _numberOfGuestsToDraw
) => 2 * Math.min(guestNumberByColor[GuestPawn.Red] ?? 0, guestNumberByColor[GuestPawn.Yellow] ?? 0)
