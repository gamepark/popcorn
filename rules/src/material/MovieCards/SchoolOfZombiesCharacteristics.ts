import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { SeatsNumber, TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class SchoolOfZombiesCharacteristics implements MovieCardCharacteristics {
  public readonly actions: MovieAction[] = [
    MovieAction.AdvertisingTokenOnYellowGuest,
    MovieAction.Get1Money,
    MovieAction.Get2Popcorn,
    MovieAction.DrawAwardCard
  ]
  public readonly color = MovieColor.Yellow
  public readonly movieType = MovieCardType.Movie
  public readonly isFirstMovie = false
  public readonly basePrice = 2
  public readonly bonusAction = MovieAction.AdvertisingTokenOnYellowGuest
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
