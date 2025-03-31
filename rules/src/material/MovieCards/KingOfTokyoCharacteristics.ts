import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class KingOfTokyoCharacteristics implements MovieCardCharacteristics {
  private readonly actions: MovieAction[] = [
    MovieAction.Get1Popcorn,
    MovieAction.AdvertisingTokenOnWhiteGuestToBag,
    MovieAction.Get3Money,
    MovieAction.AdvertisingTokenOnGreenGuest
  ]

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this.actions, actionNumber)
  }

  public getBonusAction(theaterTile: TheaterTile): MovieAction | undefined {
    return getBonusAction(theaterTile, 2, MovieAction.Get3Popcorn)
  }

  public getColor(): MovieColor {
    return MovieColor.Green
  }

  public getMovieType(): MovieCardType {
    return MovieCardType.Movie
  }

  public getPrice(row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number {
    return getMoviePriceForRow(2, row)
  }

  public isFirstMovie(): boolean {
    return false
  }
}
