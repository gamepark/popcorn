import { describe, expect, test } from 'vitest'
import { ThreeSeatTheaterPoints } from '../../src/material/AwardCards/ThreeSeatTheaterPoints'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { TheaterTile } from '../../src/material/TheaterTile'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('ThreeSeatTheaterPoints tests', () => {
  test.for([
    {
      playerTheaterTiles: [TheaterTile.ThreeSeatGreenGreenGrey, TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatRedRed],
      $numberOfThreeSeatTiles: 1,
      expectedPoints: 2
    },
    {
      playerTheaterTiles: [TheaterTile.ThreeSeatGreenGreyGrey, TheaterTile.TwoSeatYellowYellow, TheaterTile.ThreeSeatRedGreyGrey],
      $numberOfThreeSeatTiles: 2,
      expectedPoints: 4
    },
    {
      playerTheaterTiles: [TheaterTile.ThreeSeatYellow3MoneyRedGrey, TheaterTile.ThreeSeatYellowGreyGrey, TheaterTile.ThreeSeatBlueGreyGrey],
      $numberOfThreeSeatTiles: 3,
      expectedPoints: 6
    },
    {
      playerTheaterTiles: [TheaterTile.TwoSeatRed2MoneyMovieAction, TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatBlue1Popcorn2Money],
      $numberOfThreeSeatTiles: 0,
      expectedPoints: 0
    },
    {
      playerTheaterTiles: [TheaterTile.OneSeatBlue3Money, TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatRed2MoneyMovieAction],
      $numberOfThreeSeatTiles: 0,
      expectedPoints: 0
    }
  ])(
    'Given $numberOfThreeSeatTiles theater tiles with 3 seats, ThreeSeatTheaterPoints should award $expectedPoints',
    ({ playerTheaterTiles, expectedPoints }) => {
      // Given
      const player = PlayerColor.Cyan
      const setup = new TestCustomPopcornSetup(player, [], playerTheaterTiles)
      setup.setup()
      const playerMovieMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
      const playerTheaterTileMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)

      // When
      const awardedPoints = ThreeSeatTheaterPoints(playerMovieMaterial, playerTheaterTileMaterial, {}, 5)

      // Then
      expect(awardedPoints).to.equal(expectedPoints)
    }
  )
})
