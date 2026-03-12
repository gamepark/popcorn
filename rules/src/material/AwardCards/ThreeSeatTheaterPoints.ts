import { AwardCardPointFunction } from '../AwardCard'
import { getMaximumNumberOfGuests, SeatsNumber, TheaterTileId } from '../TheaterTile'

export const ThreeSeatTheaterPoints: AwardCardPointFunction = (
  _playerMovieCardArchiveMaterial,
  playerTheaterTilesMaterial,
  _guestNumberByColor,
  _numberOfGuestsToDraw
) => 2 * playerTheaterTilesMaterial.id<TheaterTileId>((tileId) => tileId.back !== SeatsNumber.Default && getMaximumNumberOfGuests(tileId.back) === 3).length
