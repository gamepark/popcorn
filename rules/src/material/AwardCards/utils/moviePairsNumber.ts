import { Material } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { LocationType } from '../../LocationType'
import { MaterialType } from '../../MaterialType'
import { MovieColor } from '../../MovieCard'
import { numberOfMoviesOfColor } from './numberOfMoviesOfColor'

export const moviePairsNumber = (
  movieCardMaterial: Material<PlayerColor, MaterialType, LocationType>,
  firstMovieColor: MovieColor,
  secondMovieColor: MovieColor
) => {
  if (firstMovieColor === secondMovieColor) {
    throw Error(`There must be two different movie colors. Only ${MovieColor[firstMovieColor]} provided`)
  }
  const numberOfFirstColorMovies = numberOfMoviesOfColor(movieCardMaterial, firstMovieColor)
  const numberOfSecondColorMovies = numberOfMoviesOfColor(movieCardMaterial, secondMovieColor)
  return Math.min(numberOfFirstColorMovies, numberOfSecondColorMovies)
}
