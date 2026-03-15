import { describe, expect, test } from 'vitest'
import { FourOfAKindSeatPoints } from '../../src/material/AwardCards/FourOfAKindSeatPoints'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { TheaterTile } from '../../src/material/TheaterTile'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('FourOfAKindSeatPoints test', () => {
  test.for([
    {
      playerTheaterTiles: [TheaterTile.TwoSeatBlueGreen, TheaterTile.ThreeSeatYellow3MoneyRedGrey, TheaterTile.TwoSeatBlue1Popcorn2Money],
      numberOfSets: 1,
      expectedPoints: 6
    },
    {
      playerTheaterTiles: [TheaterTile.TwoSeatBlueGreen, TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatBlue1Popcorn2Money],
      numberOfSets: 0,
      expectedPoints: 0
    },
    {
      playerTheaterTiles: [TheaterTile.TwoSeatBlueGreen, TheaterTile.ThreeSeatRedGreyGrey, TheaterTile.TwoSeatBlue1Popcorn2Money],
      numberOfSets: 0,
      expectedPoints: 0
    },
    {
      playerTheaterTiles: [TheaterTile.TwoSeatRed2MoneyMovieAction, TheaterTile.ThreeSeatYellow3MoneyRedGrey, TheaterTile.TwoSeatGreen2MoneyMovieAction],
      numberOfSets: 0,
      expectedPoints: 0
    },
    {
      playerTheaterTiles: [TheaterTile.TwoSeatGreen2MoneyMovieAction, TheaterTile.ThreeSeatYellow3MoneyRedGrey, TheaterTile.ThreeSeatGreenGreenGrey],
      numberOfSets: 0,
      expectedPoints: 0
    }
  ])('Given $numberOfSets sets of seats of each color, FourOfAKindSeatPoints should be return $expectedPoints', ({ playerTheaterTiles, expectedPoints }) => {
    // Given
    const player = PlayerColor.Cyan
    const setup = new TestCustomPopcornSetup(player, [], playerTheaterTiles)
    setup.setup()
    const playerMovieMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
    const playerTheaterTileMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)

    // When
    const awardedPoints = FourOfAKindSeatPoints(playerMovieMaterial, playerTheaterTileMaterial, {}, 7)

    // Then
    expect(awardedPoints).to.equal(expectedPoints)
  })
})
