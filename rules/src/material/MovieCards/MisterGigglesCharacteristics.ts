import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class MisterGigglesCharacteristics implements MovieCardCharacteristics {
  public readonly actions: MovieAction[] = [MovieAction.None, MovieAction.PlaceGuestInReserve, MovieAction.Get1Popcorn, MovieAction.AudienceTrackAdvance]
  public readonly color = MovieColor.Yellow
  public readonly movieType = MovieCardType.Movie
  public readonly isFirstMovie = false
  public readonly basePrice = 0
  public readonly bonusAction = undefined
  public readonly numberOfSeatsForBonus = undefined

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this, actionNumber)
  }

  public getBonusAction(_theaterTile: TheaterTile): MovieAction | undefined {
    return undefined
  }

  public getPrice(row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number {
    return getMoviePriceForRow(this, row)
  }
}
