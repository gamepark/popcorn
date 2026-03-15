import { AwardCardPointFunction } from '../AwardCard'
import { MovieColor } from '../MovieCard'
import { moviePairsNumber } from './utils/moviePairsNumber'

export const BlueGreenMoviePairPoints: AwardCardPointFunction = (
  playerMovieCardArchiveMaterial,
  _playerTheaterTilesMaterial,
  _guestNumberByColor,
  _numberOfGuestsToDraw
) => 2 * moviePairsNumber(playerMovieCardArchiveMaterial, MovieColor.Blue, MovieColor.Green)
