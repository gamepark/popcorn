import { describe, expect, test } from 'vitest'
import { GreenRedSeatPairPoints } from '../../src/material/AwardCards/GreenRedSeatPairPoints'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { TheaterTile } from '../../src/material/TheaterTile'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('GreenRedGuestPairPoints tests', () => {
  test.for([
    {
      playerTheaterTiles: [TheaterTile.ThreeSeatGreenGreenGrey, TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatRedRed],
      numberOfGreenSeats: 2,
      numberOfRedSeats: 2,
      expectedPoints: 6
    },
    {
      playerTheaterTiles: [TheaterTile.ThreeSeatGreenGreyGrey, TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatRedBagMovieAction],
      numberOfGreenSeats: 1,
      numberOfRedSeats: 1,
      expectedPoints: 3
    },
    {
      playerTheaterTiles: [TheaterTile.ThreeSeatYellow3MoneyRedGrey, TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatRedRed],
      numberOfGreenSeats: 0,
      numberOfRedSeats: 3,
      expectedPoints: 0
    },
    {
      playerTheaterTiles: [TheaterTile.ThreeSeatGreenGreenGrey, TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatBlue1Popcorn2Money],
      numberOfGreenSeats: 2,
      numberOfRedSeats: 0,
      expectedPoints: 0
    },
    {
      playerTheaterTiles: [TheaterTile.ThreeSeatBlueBlueGrey, TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatRed2MoneyMovieAction],
      numberOfGreenSeats: 0,
      numberOfRedSeats: 0,
      expectedPoints: 0
    }
  ])(
    'Given theater tiles with $numberOfGreenSeats green seat(s) and $numberOfRedSeats red seat(s), GreenRedGuestPairPoints should award $expectedPoints',
    ({ playerTheaterTiles, expectedPoints }) => {
      // Given
      const player = PlayerColor.Cyan
      const setup = new TestCustomPopcornSetup(player, [], playerTheaterTiles)
      setup.setup()
      const playerMovieMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
      const playerTheaterTileMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)

      // When
      const awardedPoints = GreenRedSeatPairPoints(playerMovieMaterial, playerTheaterTileMaterial, {}, 5)

      // Then
      expect(awardedPoints).to.equal(expectedPoints)
    }
  )
})
