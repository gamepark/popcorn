import { AwardCardPointFunction } from '../AwardCard'
import { LocationType } from '../LocationType'
import { movieCardCharacteristics, PlayableMovieCardId } from '../MovieCard'

export const MoviePrice4Or5Points: AwardCardPointFunction = (
  playerMovieCardArchiveMaterial,
  _playerTheaterTilesMaterial,
  _guestNumberByColor,
  _numberOfGuestsToDraw
) => {
  return (
    2 *
    playerMovieCardArchiveMaterial.id<Required<PlayableMovieCardId>>(
      (movieId) => movieCardCharacteristics[movieId.front].getPrice(LocationType.FeaturesRowSpot) >= 4
    ).length
  )
}
