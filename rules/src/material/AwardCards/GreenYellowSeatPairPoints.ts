import { AwardCardPointFunction } from '../AwardCard'
import { SeatColor } from '../TheaterTile'
import { getSeatCounts } from './utils/getSeatCounts'

export const GreenYellowSeatPairPoints: AwardCardPointFunction = (
  _playerMovieCardArchiveMaterial,
  playerTheaterTilesMaterial,
  _guestNumberByColor,
  _numberOfGuestsToDraw
) => {
  const seatCounts = getSeatCounts(playerTheaterTilesMaterial)
  return 3 * Math.min(seatCounts[SeatColor.Green] ?? 0, seatCounts[SeatColor.Yellow] ?? 0)
}
