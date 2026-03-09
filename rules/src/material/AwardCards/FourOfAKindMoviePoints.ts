import { AwardCardPointFunction } from '../AwardCard'
import { MovieColor } from '../MovieCard'
import { numberOfMoviesOfColor } from './utils/numberOfMoviesOfColor'

export const FourOfAKindMoviePoints: AwardCardPointFunction = (
  playerMovieCardArchiveMaterial,
  _playerTheaterTilesMaterial,
  _guestNumberByColor,
  _numberOfGuestsToDraw
) => {
  const numberOfBlueMovies = numberOfMoviesOfColor(playerMovieCardArchiveMaterial, MovieColor.Blue)
  const numberOfGreenMovies = numberOfMoviesOfColor(playerMovieCardArchiveMaterial, MovieColor.Green)
  const numberOfRedMovies = numberOfMoviesOfColor(playerMovieCardArchiveMaterial, MovieColor.Red)
  const numberOfYellowMovies = numberOfMoviesOfColor(playerMovieCardArchiveMaterial, MovieColor.Yellow)
  return 4 * Math.min(numberOfBlueMovies, numberOfGreenMovies, numberOfRedMovies, numberOfYellowMovies)
}
