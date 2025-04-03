import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class BigSpendersCharacteristics implements MovieCardCharacteristics {
  private readonly actions: MovieAction[] = [MovieAction.Get2Money, MovieAction.Get2Popcorn, MovieAction.PlaceExitZoneGuestInBag, MovieAction.Get2Money]

  public getColor(): MovieColor {
    return MovieColor.Blue
  }

  public getPrice(row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number {
    return getMoviePriceForRow(3, row)
  }

  public getBonusAction(theaterTile: TheaterTile): MovieAction | undefined {
    return getBonusAction(theaterTile, 1, MovieAction.Get2Money)
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
