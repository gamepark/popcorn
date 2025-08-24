import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { SeatsNumber, TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class TheWorldAfterCharacteristics implements MovieCardCharacteristics {
  public readonly actions: MovieAction[] = [
    MovieAction.Get1Money,
    MovieAction.AdvertisingTokenOnAnyGuest,
    MovieAction.Get2Popcorn,
    MovieAction.AudienceTrackAdvance
  ]
  public readonly color = MovieColor.Red
  public readonly movieType = MovieCardType.Movie
  public readonly isFirstMovie = false
  public readonly basePrice = 2
  public readonly bonusAction = MovieAction.Get1Money
  public readonly numberOfSeatsForBonus = SeatsNumber.One

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
