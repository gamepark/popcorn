import { inRange } from 'es-toolkit'
import { AwardCardPointFunction } from '../AwardCard'

export const AudienceGreaterThanOrEqualToSixPoints: AwardCardPointFunction = (
  _playerMovieCardArchiveMaterial,
  _playerTheaterTilesMaterial,
  _guestNumberByColor,
  numberOfGuestsToDraw
) => (inRange(numberOfGuestsToDraw, 6) ? 0 : 4)
