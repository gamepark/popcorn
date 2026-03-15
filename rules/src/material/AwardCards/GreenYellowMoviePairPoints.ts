import { AwardCardPointFunction } from '../AwardCard'
import { MovieColor } from '../MovieCard'
import { moviePairsNumber } from './utils/moviePairsNumber'

export const GreenYellowMoviePairPoints: AwardCardPointFunction = (
  playerMovieCardArchiveMaterial,
  _playerTheaterTilesMaterial,
  _guestNumberByColor,
  _numberOfGuestsToDraw
) => 2 * moviePairsNumber(playerMovieCardArchiveMaterial, MovieColor.Green, MovieColor.Yellow)
