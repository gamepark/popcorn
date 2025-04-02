import { LocationType } from '../LocationType'
import { MovieAction, MovieCardType, MovieColor } from '../MovieCard'
import { SeatsNumber, TheaterTile, theaterTilesCharacteristics } from '../TheaterTile'

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

export const getBonusAction = (theaterTile: TheaterTile, numberOfSeatsForBonus: 1 | 2 | 3, action: MovieAction): MovieAction | undefined => {
  const targetSeatsNumber = numberOfSeatsForBonus === 1 ? SeatsNumber.One : numberOfSeatsForBonus === 2 ? SeatsNumber.Two : SeatsNumber.Three
  return theaterTilesCharacteristics[theaterTile].getSeatsNumber() === targetSeatsNumber ? action : undefined
}
