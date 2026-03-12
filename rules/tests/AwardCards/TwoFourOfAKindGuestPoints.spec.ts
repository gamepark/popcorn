import { Material } from '@gamepark/rules-api'
import { describe, expect, test } from 'vitest'
import { TwoFourOfAKindGuestPoints } from '../../src/material/AwardCards/TwoFourOfAKindGuestPoints'
import { GuestPawn } from '../../src/material/GuestPawn'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { PlayerColor } from '../../src/PlayerColor'

describe('TwoFourOfAKindGuestPoints test', () => {
  test.for([
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 3,
        [GuestPawn.Green]: 2,
        [GuestPawn.Red]: 4,
        [GuestPawn.Yellow]: 2
      },
      numberOfSets: 1,
      expectedPoints: 5
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 4,
        [GuestPawn.Green]: 4,
        [GuestPawn.Red]: 4,
        [GuestPawn.Yellow]: 4,
        [GuestPawn.White]: 2
      },
      numberOfSets: 2,
      expectedPoints: 10
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 2,
        [GuestPawn.Red]: 2,
        [GuestPawn.Yellow]: 3,
        [GuestPawn.White]: 3
      },
      numberOfSets: 0,
      expectedPoints: 0
    },
    {
      playerGuestCounts: {
        [GuestPawn.Green]: 1,
        [GuestPawn.Red]: 3,
        [GuestPawn.Yellow]: 4,
        [GuestPawn.White]: 1
      },
      numberOfSets: 0,
      expectedPoints: 0
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 3,
        [GuestPawn.Green]: 3,
        [GuestPawn.Red]: 4,
        [GuestPawn.White]: 4
      },
      numberOfSets: 0,
      expectedPoints: 0
    },
    {
      playerGuestCounts: {
        [GuestPawn.Blue]: 3,
        [GuestPawn.Green]: 1,
        [GuestPawn.Yellow]: 4,
        [GuestPawn.White]: 4
      },
      numberOfSets: 0,
      expectedPoints: 0
    }
  ])(
    'Given $numberOfSets set(s) of two four of a kind guest pawns, TwoFourOfAKindGuestPoints should award $expectedPoints',
    ({ playerGuestCounts, expectedPoints }) => {
      // Given
      const playerMovieMaterial = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.MovieCards, [])
      const playerTheaterTileMaterial = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.TheaterTiles, [])

      // When
      const awardedPoints = TwoFourOfAKindGuestPoints(playerMovieMaterial, playerTheaterTileMaterial, playerGuestCounts, 5)

      // Then
      expect(awardedPoints).to.equal(expectedPoints)
    }
  )
})
