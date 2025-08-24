import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { SeatsNumber, TheaterTile, theaterTilesCharacteristics } from '../TheaterTile'

export interface MovieCardCharacteristics {
  get actions(): MovieAction[]

  get numberOfSeatsForBonus(): SeatsNumber | undefined

  get bonusAction(): MovieAction | undefined

  get basePrice(): number

  get color(): MovieColor

  get isFirstMovie(): boolean

  get movieType(): MovieCardType

  getPrice(row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number

  getBonusAction(theaterTile: TheaterTile): MovieAction | undefined

  getAction(actionNumber: number): MovieAction | undefined
}

export const getMoviePriceForRow = (
  movieCardCharacteristics: MovieCardCharacteristics,
  row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot
): number => movieCardCharacteristics.basePrice + (row === LocationType.PremiersRowSpot ? 2 : 0)

export const getMovieAction = (movieCardCharacteristics: MovieCardCharacteristics, actionNumber: number): MovieAction | undefined =>
  actionNumber in movieCardCharacteristics.actions ? movieCardCharacteristics.actions[actionNumber] : undefined

export const getBonusAction = (movieCardCharacteristics: MovieCardCharacteristics, theaterTile: TheaterTile): MovieAction | undefined => {
  return theaterTilesCharacteristics[theaterTile].getSeatsNumber() === movieCardCharacteristics.numberOfSeatsForBonus
    ? movieCardCharacteristics.bonusAction
    : undefined
}
