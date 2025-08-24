import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { SeatsNumber, TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class TheKidsCharacteristics implements MovieCardCharacteristics {
  public readonly actions: MovieAction[] = [
    MovieAction.PlaceExitZoneGuestInBag,
    MovieAction.AdvertisingTokenOnYellowGuest,
    MovieAction.Get2Money,
    MovieAction.AudienceTrackAdvance
  ]
  public readonly color = MovieColor.Yellow
  public readonly movieType = MovieCardType.Movie
  public readonly isFirstMovie = false
  public readonly basePrice = 1
  public readonly bonusAction = MovieAction.Get1Popcorn
  public readonly numberOfSeatsForBonus = SeatsNumber.Two

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
