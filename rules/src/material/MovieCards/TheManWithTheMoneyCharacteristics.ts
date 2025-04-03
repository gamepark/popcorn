import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class TheManWithTheMoneyCharacteristics implements MovieCardCharacteristics {
  private readonly actions: MovieAction[] = [MovieAction.None, MovieAction.Get1Money, MovieAction.AdvertisingTokenOnRedGuest, MovieAction.Get3Popcorn]

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this.actions, actionNumber)
  }

  public getBonusAction(_theaterTile: TheaterTile): MovieAction | undefined {
    return undefined
  }

  public getColor(): MovieColor {
    return MovieColor.Red
  }

  public getMovieType(): MovieCardType {
    return MovieCardType.Movie
  }

  public getPrice(row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number {
    return getMoviePriceForRow(0, row)
  }

  public isFirstMovie(): boolean {
    return false
  }
}
