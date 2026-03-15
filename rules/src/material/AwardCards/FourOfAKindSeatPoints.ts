import { AwardCardPointFunction } from '../AwardCard'
import { SeatColor } from '../TheaterTile'
import { getSeatCounts } from './utils/getSeatCounts'

export const FourOfAKindSeatPoints: AwardCardPointFunction = (
  _playerMovieCardArchiveMaterial,
  playerTheaterTilesMaterial,
  _guestNumberByColor,
  _numberOfGuestsToDraw
) => {
  const seatCounts = getSeatCounts(playerTheaterTilesMaterial)
  return 6 * Math.min(seatCounts[SeatColor.Blue] ?? 0, seatCounts[SeatColor.Green] ?? 0, seatCounts[SeatColor.Red] ?? 0, seatCounts[SeatColor.Yellow] ?? 0)
}
