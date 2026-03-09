import { AwardCardPointFunction } from '../AwardCard'
import { GuestPawn } from '../GuestPawn'

export const GreenRedGuestPairPoints: AwardCardPointFunction = (
  _playerMovieCardArchiveMaterial,
  _playerTheaterTilesMaterial,
  guestNumberByColor,
  _numberOfGuestsToDraw
) => 2 * Math.min(guestNumberByColor[GuestPawn.Green] ?? 0, guestNumberByColor[GuestPawn.Red] ?? 0)
