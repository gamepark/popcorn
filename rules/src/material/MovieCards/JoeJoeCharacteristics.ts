import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class JoeJoeCharacteristics implements MovieCardCharacteristics {
  private readonly actions: MovieAction[] = [MovieAction.Get1Popcorn, MovieAction.AdvertisingTokenOnAnyGuest, MovieAction.Get3Money, MovieAction.DrawAwardCard]

  public getColor(): MovieColor {
    return MovieColor.Blue
  }

  public getPrice(row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number {
    return getMoviePriceForRow(1, row)
  }

  public getBonusAction(theaterTile: TheaterTile): MovieAction | undefined {
    return getBonusAction(theaterTile, 2, MovieAction.Get2Popcorn)
  }

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this.actions, actionNumber)
  }

  public isFirstMovie(): boolean {
    return false
  }

  public getMovieType(): MovieCardType {
    return MovieCardType.Movie
  }
}
