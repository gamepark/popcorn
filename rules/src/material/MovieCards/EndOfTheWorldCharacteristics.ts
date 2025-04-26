import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getMovieAction, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class EndOfTheWorldCharacteristics implements MovieCardCharacteristics {
  private readonly actions = [MovieAction.AudienceTrackAdvance, MovieAction.AdvertisingTokenOnGreenGuest, MovieAction.Get2Money]

  public getColor(): MovieColor {
    return MovieColor.Green
  }

  public getPrice(_row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number {
    return 0
  }

  public getBonusAction(_theaterTile: TheaterTile): MovieAction | undefined {
    return undefined
  }

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this.actions, actionNumber)
  }

  public isFirstMovie(): boolean {
    return true
  }

  public getMovieType(): MovieCardType {
    return MovieCardType.FirstMovie
  }
}
