import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { SeatsNumber, TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class Eliminator4Characteristics implements MovieCardCharacteristics {
  public readonly actions: MovieAction[] = [MovieAction.DrawGuestAndPlaceThem, MovieAction.Get3Money, MovieAction.AudienceTrackAdvance, MovieAction.Get3Popcorn]
  public readonly color = MovieColor.Green
  public readonly movieType = MovieCardType.Movie
  public readonly isFirstMovie = false
  public readonly basePrice = 4
  public readonly bonusAction = MovieAction.DrawAwardCard
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
