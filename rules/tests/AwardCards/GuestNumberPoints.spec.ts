import { describe, expect, test } from 'vitest'
import { GuestNumberPoints } from '../../src/material/AwardCards/GuestNumberPoints'
import { GuestPawn } from '../../src/material/GuestPawn'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('GuestNumberPoints Tests', () => {
  test.for([
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 3,
        [GuestPawn.Green]: 2,
        [GuestPawn.Red]: 4,
        [GuestPawn.Yellow]: 1
      },
      totalNumberOfGuests: 10,
      expectedPoints: 0
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 1,
        [GuestPawn.Red]: 2,
        [GuestPawn.Yellow]: 2,
        [GuestPawn.White]: 1
      },
      totalNumberOfGuests: 6,
      expectedPoints: 5
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 2,
        [GuestPawn.Red]: 2,
        [GuestPawn.Yellow]: 2,
        [GuestPawn.White]: 2
      },
      totalNumberOfGuests: 8,
      expectedPoints: 3
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 4,
        [GuestPawn.Red]: 3,
        [GuestPawn.Yellow]: 4,
        [GuestPawn.White]: 1
      },
      totalNumberOfGuests: 12,
      expectedPoints: 0
    },
    {
      playerGuestCounts: {
        [GuestPawn.Red]: 4
      },
      totalNumberOfGuests: 4,
      expectedPoints: 5
    },
    {
      playerGuestCounts: {
        [GuestPawn.Green]: 3,
        [GuestPawn.Red]: 2,
        [GuestPawn.Yellow]: 2
      },
      totalNumberOfGuests: 7,
      expectedPoints: 3
    }
  ])('Given $totalNumberOfGuests guest(s) for the player, GuestNumberPoints should award $expectedPoints points', ({ playerGuestCounts, expectedPoints }) => {
    // Given
    const player = PlayerColor.Green
    const setup = new TestCustomPopcornSetup(player, [], [])
    const playerMovieMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
    const playerTheaterTiles = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)

    // When
    const awardedPoints = GuestNumberPoints(playerMovieMaterial, playerTheaterTiles, playerGuestCounts, 6)

    // Then
    expect(awardedPoints).to.equal(expectedPoints)
  })
})
