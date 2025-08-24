import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { SeatsNumber, TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class AdrianCharacteristics implements MovieCardCharacteristics {
  public readonly actions: MovieAction[] = [MovieAction.Get3Money, MovieAction.Get2Popcorn, MovieAction.AudienceTrackAdvance, MovieAction.DrawAwardCard]
  public readonly isFirstMovie = false
  public readonly color = MovieColor.Blue
  public readonly movieType = MovieCardType.Movie
  public readonly basePrice = 4
  public readonly bonusAction = MovieAction.AdvertisingTokenOnAnyGuest
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
