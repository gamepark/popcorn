import { AwardCardPointFunction } from '../AwardCard'
import { GuestPawn } from '../GuestPawn'

export const WhiteGuestCountPoints: AwardCardPointFunction = (
  _playerMovieCardArchiveMaterial,
  _playerTheaterTilesMaterial,
  guestNumberByColor,
  _numberOfGuestsToDraw
) => {
  const numberOfWhiteGuests = guestNumberByColor[GuestPawn.White] ?? 0
  return numberOfWhiteGuests === 0 ? 7 : numberOfWhiteGuests <= 2 ? 4 : 0
}
