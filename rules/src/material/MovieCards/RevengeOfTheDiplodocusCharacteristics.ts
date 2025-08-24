import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { SeatsNumber, TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class RevengeOfTheDiplodocusCharacteristics implements MovieCardCharacteristics {
  public readonly actions: MovieAction[] = [MovieAction.Get2Money, MovieAction.Get1Popcorn, MovieAction.PlaceGuestInReserve, MovieAction.AudienceTrackAdvance]
  public readonly color = MovieColor.Green
  public readonly movieType = MovieCardType.Movie
  public readonly isFirstMovie = false
  public readonly basePrice = 1
  public readonly bonusAction = MovieAction.PlaceExitZoneGuestInBag
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
