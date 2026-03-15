import { countBy } from 'es-toolkit'
import { AwardCardPointFunction } from '../AwardCard'
import { movieCardCharacteristics, MovieColor, PlayableMovieCardId } from '../MovieCard'

export const FourMoviesSameColorSetPoints: AwardCardPointFunction = (
  playerMovieCardArchiveMaterial,
  _playerTheaterTilesMaterial,
  _guestNumberByColor,
  _numberOfGuestsToDraw
) => {
  const numberOfMoviesByColor = countBy(
    playerMovieCardArchiveMaterial.getItems<Required<PlayableMovieCardId>>().map((item) => item.id.front),
    (movieId) => movieCardCharacteristics[movieId].color
  )
  return (
    4 *
    (Math.floor(numberOfMoviesByColor[MovieColor.Blue] / 4) +
      Math.floor(numberOfMoviesByColor[MovieColor.Green] / 4) +
      Math.floor(numberOfMoviesByColor[MovieColor.Red] / 4) +
      Math.floor(numberOfMoviesByColor[MovieColor.Yellow]))
  )
}
