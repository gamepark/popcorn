import { Material } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { LocationType } from '../../LocationType'
import { MaterialType } from '../../MaterialType'
import { movieCardCharacteristics, MovieColor, PlayableMovieCardId } from '../../MovieCard'

export const numberOfMoviesOfColor = (movieCardMaterial: Material<PlayerColor, MaterialType, LocationType>, movieColor: MovieColor) => {
  return movieCardMaterial.id<Required<PlayableMovieCardId>>((movieId) => movieCardCharacteristics[movieId.front].color === movieColor).length
}
