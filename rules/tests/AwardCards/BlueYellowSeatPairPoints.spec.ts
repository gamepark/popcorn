import { describe, expect, test } from 'vitest'
import { BlueYellowSeatPairPoints } from '../../src/material/AwardCards/BlueYellowSeatPairPoints'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { TheaterTile } from '../../src/material/TheaterTile'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('BlueYellowSeatPairPoints tests', () => {
  test.for([
    {
      playerTheaterTiles: [TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatBlueGreen, TheaterTile.ThreeSeatBlueBlueGrey],
      numberOfBlueSeats: 3,
      numberOfYellowSeats: 2,
      expectedPoints: 6
    },
    {
      playerTheaterTiles: [TheaterTile.OneSeatYellowDrawGuest, TheaterTile.TwoSeatBlueGreen, TheaterTile.ThreeSeatBlueGreyGrey],
      numberOfBlueSeats: 2,
      numberOfYellowSeats: 1,
      expectedPoints: 3
    },
    {
      playerTheaterTiles: [TheaterTile.OneSeatRed2Popcorn, TheaterTile.TwoSeatYellowYellow, TheaterTile.ThreeSeatBlueGreyGrey],
      numberOfBlueSeats: 1,
      numberOfYellowSeats: 2,
      expectedPoints: 3
    },
    {
      playerTheaterTiles: [TheaterTile.OneSeat3Money, TheaterTile.TwoSeatYellowYellow, TheaterTile.ThreeSeatGreenGreenGrey],
      numberOfBlueSeats: 0,
      numberOfYellowSeats: 2,
      expectedPoints: 0
    },
    {
      playerTheaterTiles: [TheaterTile.OneSeat3Money, TheaterTile.TwoSeatBlueGreen, TheaterTile.ThreeSeatGreenGreenGrey],
      numberOfBlueSeats: 1,
      numberOfYellowSeats: 0,
      expectedPoints: 0
    }
  ])(
    'Given theater tiles with $numberOfBlueSeats blue seat(s) and $numberOfYellowSeats yellow seat(s), BlueYellowSeatPairPoints should award $expectedPoints',
    ({ playerTheaterTiles, expectedPoints }) => {
      // Given
      const player = PlayerColor.Orange
      const setup = new TestCustomPopcornSetup(player, [], playerTheaterTiles)
      setup.setup()
      const playerArchiveMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
      const playerTheaterTileMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)

      // When
      const awardedPoints = BlueYellowSeatPairPoints(playerArchiveMaterial, playerTheaterTileMaterial, {}, 6)

      // Then
      expect(awardedPoints).to.equal(expectedPoints)
    }
  )
})
