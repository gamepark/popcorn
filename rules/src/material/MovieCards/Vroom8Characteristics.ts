import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class Vroom8Characteristics implements MovieCardCharacteristics {
  private readonly actions: MovieAction[] = [MovieAction.Get4Money, MovieAction.AdvertisingTokenOnAnyGuest, MovieAction.Get2Popcorn, MovieAction.Get4Popcorn]

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this.actions, actionNumber)
  }

  public getBonusAction(theaterTile: TheaterTile): MovieAction | undefined {
    return getBonusAction(theaterTile, 3, MovieAction.PlaceExitZoneGuestInBag)
  }

  public getColor(): MovieColor {
    return MovieColor.Red
  }

  public getMovieType(): MovieCardType {
    return MovieCardType.Movie
  }

  public getPrice(row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number {
    return getMoviePriceForRow(5, row)
  }

  public isFirstMovie(): boolean {
    return false
  }
}
