import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class MountainHotelCharacteristics implements MovieCardCharacteristics {
  private readonly actions: MovieAction[] = [
    MovieAction.AdvertisingTokenOnWhiteGuestToBag,
    MovieAction.PlaceExitZoneGuestInBag,
    MovieAction.PlaceGuestInReserve,
    MovieAction.Get1Popcorn
  ]

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this.actions, actionNumber)
  }

  public getBonusAction(theaterTile: TheaterTile): MovieAction | undefined {
    return getBonusAction(theaterTile, 1, MovieAction.Get2Money)
  }

  public getColor(): MovieColor {
    return MovieColor.Green
  }

  public getMovieType(): MovieCardType {
    return MovieCardType.Movie
  }

  public getPrice(row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number {
    return getMoviePriceForRow(1, row)
  }

  public isFirstMovie(): boolean {
    return false
  }
}
