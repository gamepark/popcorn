import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { SeatsNumber, TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class RohanAndJayaCharacteristics implements MovieCardCharacteristics {
  public readonly actions: MovieAction[] = [
    MovieAction.AdvertisingTokenOnBlueGuest,
    MovieAction.Get3Popcorn,
    MovieAction.DrawAwardCard,
    MovieAction.AudienceTrackAdvance
  ]
  public readonly color = MovieColor.Blue
  public readonly movieType = MovieCardType.Movie
  public readonly isFirstMovie = false
  public readonly basePrice = 4
  public readonly bonusAction = MovieAction.Get2Money
  public readonly numberOfSeatsForBonus = SeatsNumber.Three

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this, actionNumber)
  }

  public getBonusAction(theaterTile: TheaterTile): MovieAction | undefined {
    return getBonusAction(this, theaterTile)
  }

  public getPrice(row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number {
    return getMoviePriceForRow(this, row)
  }
}
