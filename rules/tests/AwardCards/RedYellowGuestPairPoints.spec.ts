import { Material } from '@gamepark/rules-api'
import { describe, expect, test } from 'vitest'
import { RedYellowGuestPairPoints } from '../../src/material/AwardCards/RedYellowGuestPairPoints'
import { GuestPawn } from '../../src/material/GuestPawn'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { PlayerColor } from '../../src/PlayerColor'

describe('RedYellowGuestPairPoints tests', () => {
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
      expectedPoints: 4
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
        [GuestPawn.Green]: 1,
        [GuestPawn.Red]: 3,
        [GuestPawn.Yellow]: 4,
        [GuestPawn.White]: 1
      },
      expectedPoints: 6
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
        [GuestPawn.Green]: 3,
        [GuestPawn.Yellow]: 4,
        [GuestPawn.White]: 4
      },
      expectedPoints: 0
    }
  ])(
    'Given $playerGuestCounts.3 red guest(s) and $playerGuestCounts.5 and yellow guest(s), GreenRedGuestPairPoints should award $expectedPoints points',
    ({ playerGuestCounts, expectedPoints }) => {
      // Given
      const playerMovieMaterial = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.MovieCards, [])
      const playerTheaterTileMaterial = new Material<PlayerColor, MaterialType>(MaterialType.TheaterTiles, [])

      // When
      const awardedPoints = RedYellowGuestPairPoints(playerMovieMaterial, playerTheaterTileMaterial, playerGuestCounts, 5)

      // Then
      expect(awardedPoints).to.equal(expectedPoints)
    }
  )
})
