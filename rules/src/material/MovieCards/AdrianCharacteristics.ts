import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class AdrianCharacteristics implements MovieCardCharacteristics {
  private readonly actions: MovieAction[] = [MovieAction.Get3Money, MovieAction.Get2Popcorn, MovieAction.AudienceTrackAdvance, MovieAction.DrawAwardCard]

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this.actions, actionNumber)
  }

  public getBonusAction(theaterTile: TheaterTile): MovieAction | undefined {
    return getBonusAction(theaterTile, 3, MovieAction.AdvertisingTokenOnAnyGuest)
  }

  public getColor(): MovieColor {
    return MovieColor.Blue
  }

  public getMovieType(): MovieCardType {
    return MovieCardType.Movie
  }

  public getPrice(row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number {
    return getMoviePriceForRow(4, row)
  }

  public isFirstMovie(): boolean {
    return false
  }
}
