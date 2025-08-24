import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { TheaterTile } from '../TheaterTile'
import { getMovieAction, MovieCardCharacteristics } from './MovieCardCharacteristics'

export class RosebudCharacteristics implements MovieCardCharacteristics {
  public readonly actions = [MovieAction.AudienceTrackAdvance, MovieAction.AdvertisingTokenOnBlueGuest, MovieAction.Get2Money]
  public readonly color = MovieColor.Blue
  public readonly movieType = MovieCardType.FirstMovie
  public readonly isFirstMovie = true
  public readonly basePrice = 0
  public readonly bonusAction = undefined
  public readonly numberOfSeatsForBonus = undefined

  public getPrice(_row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number {
    return 0
  }

  public getBonusAction(_theaterTile: TheaterTile): MovieAction | undefined {
    return undefined
  }

  public getAction(actionNumber: number): MovieAction | undefined {
    return getMovieAction(this, actionNumber)
  }
}
