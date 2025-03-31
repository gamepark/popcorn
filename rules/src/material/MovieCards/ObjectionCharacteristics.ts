import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class ObjectionCharacteristics implements MovieCardCharacteristics {
  private readonly actions: MovieAction[] = [
    MovieAction.PlaceGuestInReserve,
    MovieAction.Get2Money,
    MovieAction.AdvertisingTokenOnBlueGuest,
    MovieAction.Get4Money
  ]

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this.actions, actionNumber)
  }

  public getBonusAction(theaterTile: TheaterTile): MovieAction | undefined {
    return getBonusAction(theaterTile, 2, MovieAction.DrawAwardCard)
  }

  public getColor(): MovieColor {
    return MovieColor.Blue
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
