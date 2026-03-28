import { MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { movieCardCharacteristics, MovieColor } from '../../../material/MovieCard'
import { BuyableTheaterTileId } from '../../../material/TheaterTile'
import { PlayerColor } from '../../../PlayerColor'
import { RuleId } from '../../RuleId'

export const getMovieColorFromSpot = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
  player: PlayerColor,
  movieSpot: number
): MovieColor => {
  const movieCard = rule
    .material(MaterialType.MovieCards)
    .player(player)
    .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
    .location((l) => l.x === movieSpot)
    .getItems<Required<BuyableTheaterTileId>>()[0]
  const movieCharacteristics = movieCardCharacteristics[movieCard.id.front]
  return movieCharacteristics.color
}
