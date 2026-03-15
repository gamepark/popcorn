import { Material } from '@gamepark/rules-api'
import { describe, expect, test } from 'vitest'
import { WhiteGuestCountPoints } from '../../src/material/AwardCards/WhiteGuestCountPoints'
import { GuestPawn } from '../../src/material/GuestPawn'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { PlayerColor } from '../../src/PlayerColor'

describe('WhiteGuestCountPoints test', () => {
  test.for([
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 3,
        [GuestPawn.Green]: 2,
        [GuestPawn.Red]: 4,
        [GuestPawn.Yellow]: 2
      },
      expectedPoints: 7
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 4,
        [GuestPawn.Green]: 4,
        [GuestPawn.Red]: 4,
        [GuestPawn.Yellow]: 4,
        [GuestPawn.White]: 2
      },
      expectedPoints: 4
    },
    {
      playerGuestCounts: {
        [GuestPawn.Green]: 1,
        [GuestPawn.Red]: 3,
        [GuestPawn.Yellow]: 4,
        [GuestPawn.White]: 1
      },
      expectedPoints: 4
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 2,
        [GuestPawn.Red]: 2,
        [GuestPawn.Yellow]: 3,
        [GuestPawn.White]: 3
      },
      expectedPoints: 0
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 3,
        [GuestPawn.Green]: 3,
        [GuestPawn.Red]: 4,
        [GuestPawn.White]: 4
      },
      expectedPoints: 0
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 3,
        [GuestPawn.Green]: 1,
        [GuestPawn.Yellow]: 4,
        [GuestPawn.White]: 5
      },
      numberOfSets: 0,
      expectedPoints: 0
    }
  ])('Given $playerGuestCounts.4 white guest pawns, WhiteGuestCountPoints should award $expectedPoints', ({ playerGuestCounts, expectedPoints }) => {
    // Given
    const playerMovieMaterial = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.MovieCards, [])
    const playerTheaterTileMaterial = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.TheaterTiles, [])

    // When
    const awardedPoints = WhiteGuestCountPoints(playerMovieMaterial, playerTheaterTileMaterial, playerGuestCounts, 5)

    // Then
    expect(awardedPoints).to.equal(expectedPoints)
  })
})
