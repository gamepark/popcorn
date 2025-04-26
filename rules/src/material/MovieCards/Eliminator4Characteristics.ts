import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getBonusAction, getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class Eliminator4Characteristics implements MovieCardCharacteristics {
  private readonly actions: MovieAction[] = [
    MovieAction.DrawGuestAndPlaceThem,
    MovieAction.Get3Money,
    MovieAction.AudienceTrackAdvance,
    MovieAction.Get3Popcorn
  ]

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this.actions, actionNumber)
  }

  public getBonusAction(theaterTile: TheaterTile): MovieAction | undefined {
    return getBonusAction(theaterTile, 3, MovieAction.DrawAwardCard)
  }

  public getColor(): MovieColor {
    return MovieColor.Green
  }

  public getMovieType(): MovieCardType {
    return MovieCardType.Movie
  }

  public getPrice(row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number {
    return getMoviePriceForRow(4, row)
  }

  public isFirstMovie(): boolean {
    return false
  }
}
