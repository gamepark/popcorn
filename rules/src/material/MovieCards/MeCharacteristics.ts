import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getMovieAction, getMoviePriceForRow, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class MeCharacteristics implements MovieCardCharacteristics {
  private readonly actions: MovieAction[] = [MovieAction.None, MovieAction.PlaceGuestInReserve, MovieAction.DrawGuestAndPlaceThem, MovieAction.Get4Money]

  public getColor(): MovieColor {
    return MovieColor.Blue
  }

  public getPrice(row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number {
    return getMoviePriceForRow(0, row)
  }

  public getBonusAction(_theaterTile: TheaterTile): MovieAction | undefined {
    return undefined
  }

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this.actions, actionNumber)
  }

  public isFirstMovie(): boolean {
    return false
  }

  public getMovieType(): MovieCardType {
    return MovieCardType.Movie
  }
}
