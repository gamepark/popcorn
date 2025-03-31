import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class SchoolOfZombiesCharacteristics implements MovieCardCharacteristics {
  private readonly actions: MovieAction[] = [
    MovieAction.AdvertisingTokenOnYellowGuest,
    MovieAction.Get1Money,
    MovieAction.Get2Popcorn,
    MovieAction.DrawAwardCard
  ]

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this.actions, actionNumber)
  }

  public getBonusAction(theaterTile: TheaterTile): MovieAction | undefined {
    return getBonusAction(theaterTile, 1, MovieAction.PlaceExitZoneGuestInBag)
  }

  public getColor(): MovieColor {
    return MovieColor.Yellow
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
