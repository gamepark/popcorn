import { Material } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { GuestPawn } from '../../GuestPawn'
import { LocationType } from '../../LocationType'
import { MaterialType } from '../../MaterialType'
import { MovieColor } from '../../MovieCard'
import { SeatColor } from '../../TheaterTile'
import { getSeatCounts } from './getSeatCounts'
import { numberOfMoviesOfColor } from './numberOfMoviesOfColor'

const getMovieColorFromColor = (color: 'Blue' | 'Green' | 'Red' | 'Yellow') => {
  switch (color) {
    case 'Blue':
      return MovieColor.Blue
    case 'Green':
      return MovieColor.Green
    case 'Red':
      return MovieColor.Red
    case 'Yellow':
      return MovieColor.Yellow
  }
}

const getSeatColorFromColor = (color: 'Blue' | 'Green' | 'Red' | 'Yellow') => {
  switch (color) {
    case 'Blue':
      return SeatColor.Blue
    case 'Green':
      return SeatColor.Green
    case 'Red':
      return SeatColor.Red
    case 'Yellow':
      return SeatColor.Yellow
  }
}

const getGuestColorFromColor = (color: 'Blue' | 'Green' | 'Red' | 'Yellow') => {
  switch (color) {
    case 'Blue':
      return GuestPawn.Blue
    case 'Green':
      return GuestPawn.Green
    case 'Red':
      return GuestPawn.Red
    case 'Yellow':
      return GuestPawn.Yellow
  }
}

export const getNumberOfSetsOfColor = (
  playerMovieCardArchiveMaterial: Material<PlayerColor, MaterialType, LocationType>,
  playerTheaterTilesMaterial: Material<PlayerColor, MaterialType, LocationType>,
  guestNumberByColor: Partial<Record<GuestPawn, number>>,
  color: 'Blue' | 'Green' | 'Red' | 'Yellow'
): number => {
  const colorMovieNumber = numberOfMoviesOfColor(playerMovieCardArchiveMaterial, getMovieColorFromColor(color))
  const colorGuestNumber = guestNumberByColor[getGuestColorFromColor(color)] ?? 0
  const colorSeatNumber = getSeatCounts(playerTheaterTilesMaterial)[getSeatColorFromColor(color)] ?? 0
  return Math.min(Math.floor(colorMovieNumber / 2), Math.floor(colorGuestNumber / 2), Math.floor(colorSeatNumber / 2))
}
