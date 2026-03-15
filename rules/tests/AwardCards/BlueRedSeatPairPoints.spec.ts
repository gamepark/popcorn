import { describe, expect, test } from 'vitest'
import { BlueRedSeatPairPoints } from '../../src/material/AwardCards/BlueRedSeatPairPoints'
import { GuestPawn } from '../../src/material/GuestPawn'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { TheaterTile } from '../../src/material/TheaterTile'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('BlueRedMoviesPairPoints tests', () => {
  test.for([
    {
      playerTheaterTiles: [TheaterTile.OneSeatBlue3Money, TheaterTile.TwoSeatBlueGreen, TheaterTile.ThreeSeatRedGreyGrey],
      numberOfBlueSeats: 2,
      numberOfRedSeats: 1,
      expectedPoints: 3
    },
    {
      playerTheaterTiles: [TheaterTile.OneSeatBlue3Money, TheaterTile.TwoSeatRedRed, TheaterTile.ThreeSeatRedGreyGrey],
      numberOfBlueSeats: 1,
      numberOfRedSeats: 3,
      expectedPoints: 3
    },
    {
      playerTheaterTiles: [TheaterTile.OneSeatRed2Popcorn, TheaterTile.ThreeSeatYellow3MoneyRedGrey, TheaterTile.ThreeSeatBlueBlueGrey],
      numberOfBlueSeats: 2,
      numberOfRedSeats: 2,
      expectedPoints: 6
    },
    {
      playerTheaterTiles: [TheaterTile.OneSeat3Money, TheaterTile.TwoSeatRedRed, TheaterTile.ThreeSeatGreenGreenGrey],
      numberOfBlueSeats: 0,
      numberOfRedSeats: 2,
      expectedPoints: 0
    },
    {
      playerTheaterTiles: [TheaterTile.OneSeat3Money, TheaterTile.TwoSeatBlueGreen, TheaterTile.ThreeSeatGreenGreenGrey],
      numberOfBlueSeats: 1,
      numberOfRedSeats: 0,
      expectedPoints: 0
    }
  ])(
    'Given theater tiles with $numberOfBlueSeats blue seat(s) and $numberOfRedSeats red seat(s), BlueRedSeatPairPoints should award $expectedPoints',
    ({ playerTheaterTiles, expectedPoints }) => {
      // Given
      const player = PlayerColor.Green
      const setup = new TestCustomPopcornSetup(player, [], playerTheaterTiles)
      setup.setup()
      const playerMovieMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
      const playerTheaterTileMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)
      const guestCountsByColor = {
        [GuestPawn.Blue]: 0,
        [GuestPawn.Green]: 0,
        [GuestPawn.Red]: 0,
        [GuestPawn.Yellow]: 0,
        [GuestPawn.White]: 0
      }

      // When
      const awardedPoints = BlueRedSeatPairPoints(playerMovieMaterial, playerTheaterTileMaterial, guestCountsByColor, 7)

      // Then
      expect(awardedPoints).to.equal(expectedPoints)
    }
  )
})
