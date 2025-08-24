import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { SeatsNumber, TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class FinalLassoCharacteristics implements MovieCardCharacteristics {
  public readonly actions: MovieAction[] = [MovieAction.PlaceExitZoneGuestInBag, MovieAction.Get2Popcorn, MovieAction.Get3Money, MovieAction.DrawAwardCard]
  public readonly color = MovieColor.Red
  public readonly movieType = MovieCardType.Movie
  public readonly isFirstMovie = false
  public readonly basePrice = 4
  public readonly bonusAction = MovieAction.Get2Popcorn
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
