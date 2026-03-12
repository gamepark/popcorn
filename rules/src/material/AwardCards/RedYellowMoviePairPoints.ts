import { AwardCardPointFunction } from '../AwardCard'
import { MovieColor } from '../MovieCard'
import { moviePairsNumber } from './utils/moviePairsNumber'

export const RedYellowMoviePairPoints: AwardCardPointFunction = (
  playerMovieCardArchiveMaterial,
  _playerTheaterTilesMaterial,
  _guestNumberByColor,
  _numberOfGuestsToDraw
) => 2 * moviePairsNumber(playerMovieCardArchiveMaterial, MovieColor.Red, MovieColor.Yellow)
