import { describe, expect, test } from 'vitest'
import { GreenYellowSeatPairPoints } from '../../src/material/AwardCards/GreenYellowSeatPairPoints'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { TheaterTile } from '../../src/material/TheaterTile'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('GreenYellowSeatPairPoints tests', () => {
  test.for([
    {
      playerTheaterTiles: [TheaterTile.ThreeSeatGreenGreenGrey, TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatRedRed],
      numberOfGreenSeats: 2,
      numberOfYellowSeats: 2,
      expectedPoints: 6
    },
    {
      playerTheaterTiles: [TheaterTile.ThreeSeatGreenGreyGrey, TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatRedBagMovieAction],
      numberOfGreenSeats: 1,
      numberOfYellowSeats: 2,
      expectedPoints: 3
    },
    {
      playerTheaterTiles: [TheaterTile.ThreeSeatYellow3MoneyRedGrey, TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatRedRed],
      numberOfGreenSeats: 0,
      numberOfYellowSeats: 3,
      expectedPoints: 0
    },
    {
      playerTheaterTiles: [TheaterTile.ThreeSeatGreenGreyGrey, TheaterTile.TwoSeatRedRed, TheaterTile.TwoSeatBlue1Popcorn2Money],
      numberOfGreenSeats: 2,
      numberOfYellowSeats: 0,
      expectedPoints: 0
    },
    {
      playerTheaterTiles: [TheaterTile.ThreeSeatBlueBlueGrey, TheaterTile.TwoSeatGreenDrawMovieAction, TheaterTile.TwoSeatRed2MoneyMovieAction],
      numberOfGreenSeats: 0,
      numberOfYellowSeats: 0,
      expectedPoints: 0
    }
  ])(
    'Given theater tiles with $numberOfGreenSeats green seat(s) and $numberOfYellowSeats yellow seat(s), GreenRedGuestPairPoints should award $expectedPoints',
    ({ playerTheaterTiles, expectedPoints }) => {
      // Given
      const player = PlayerColor.Cyan
      const setup = new TestCustomPopcornSetup(player, [], playerTheaterTiles)
      setup.setup()
      const playerMovieMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
      const playerTheaterTileMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)

      // When
      const awardedPoints = GreenYellowSeatPairPoints(playerMovieMaterial, playerTheaterTileMaterial, {}, 5)

      // Then
      expect(awardedPoints).to.equal(expectedPoints)
    }
  )
})
