import { describe, expect, test } from 'vitest'
import { BlueYellowGuestPairPoints } from '../../src/material/AwardCards/BlueYellowGuestPairPoints'
import { GuestPawn } from '../../src/material/GuestPawn'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('BlueYellowGuestPairPoints tests', () => {
  test.for([
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 3,
        [GuestPawn.Green]: 2,
        [GuestPawn.Red]: 4,
        [GuestPawn.Yellow]: 1
      },
      expectedPoints: 2
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 1,
        [GuestPawn.Green]: 5,
        [GuestPawn.Red]: 2,
        [GuestPawn.Yellow]: 2,
        [GuestPawn.White]: 1
      },
      expectedPoints: 2
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 2,
        [GuestPawn.Red]: 2,
        [GuestPawn.Yellow]: 3,
        [GuestPawn.White]: 3
      },
      expectedPoints: 4
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 4,
        [GuestPawn.Red]: 3,
        [GuestPawn.Yellow]: 4,
        [GuestPawn.White]: 1
      },
      expectedPoints: 8
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 3,
        [GuestPawn.Green]: 3,
        [GuestPawn.Red]: 2,
        [GuestPawn.White]: 4
      },
      expectedPoints: 0
    },
    {
      playerGuestCounts: {
        [GuestPawn.Green]: 3,
        [GuestPawn.Red]: 2,
        [GuestPawn.White]: 4,
        [GuestPawn.Yellow]: 1
      },
      expectedPoints: 0
    }
  ])(
    'Given $playerGuestCounts.1 blue guest(s) and $playerGuestCounts.5 and yellow guest(s), BlueYellowGuestPairPoints should award $expectedPoints points',
    ({ playerGuestCounts, expectedPoints }) => {
      // Given
      const player = PlayerColor.Cyan
      const setup = new TestCustomPopcornSetup(player, [], [])
      setup.setup()
      const playerMovieCardsMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
      const playerTheaterTileMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)

      // When
      const awardedPoints = BlueYellowGuestPairPoints(playerMovieCardsMaterial, playerTheaterTileMaterial, playerGuestCounts, 5)

      // Then
      expect(awardedPoints).to.equal(expectedPoints)
    }
  )
})
