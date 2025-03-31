import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { getNumberOfSeats, TheaterTile } from '../TheaterTile'

export interface MovieCardCharacteristics {
  getColor(): MovieColor

  getPrice(row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number

  getBonusAction(theaterTile: TheaterTile): MovieAction | undefined

  getAction(actionNumber: number): MovieAction | undefined

  isFirstMovie(): boolean

  getMovieType(): MovieCardType
}

export const getMoviePriceForRow = (basePrice: number, row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot): number =>
  basePrice + (row === LocationType.PremiersRowSpot ? 2 : 0)

export const getMovieAction = (actions: MovieAction[], actionNumber: number): MovieAction | undefined =>
  actionNumber in actions ? actions[actionNumber] : undefined

export const getBonusAction = (theaterTile: TheaterTile, numberOfSeatsForBonus: 1 | 2 | 3, action: MovieAction): MovieAction | undefined =>
  getNumberOfSeats(theaterTile) === numberOfSeatsForBonus ? action : undefined
