import { AwardCardPointFunction } from '../AwardCard'
import { getNumberOfSetsOfColor } from './utils/getNumberOfSetsOfColor'

export const YellowTwoSeatsGuestsMoviesSetPoints: AwardCardPointFunction = (
  playerMovieCardArchiveMaterial,
  playerTheaterTilesMaterial,
  guestNumberByColor,
  _numberOfGuestsToDraw
) => 4 * getNumberOfSetsOfColor(playerMovieCardArchiveMaterial, playerTheaterTilesMaterial, guestNumberByColor, 'Yellow')
