import { AwardCardPointFunction } from '../AwardCard'
import { LocationType } from '../LocationType'
import { movieCardCharacteristics, PlayableMovieCardId } from '../MovieCard'

export const MoviePrice0Or1Points: AwardCardPointFunction = (
  playerMovieCardArchiveMaterial,
  _playerTheaterTilesMaterial,
  _guestNumberByColor,
  _numberOfGuestsToDraw
) => {
  return playerMovieCardArchiveMaterial.id<Required<PlayableMovieCardId>>((movieId) => {
    const movieCharacteristics = movieCardCharacteristics[movieId.front]
    return !movieCharacteristics.isFirstMovie && movieCharacteristics.getPrice(LocationType.FeaturesRowSpot) <= 1
  }).length
}
