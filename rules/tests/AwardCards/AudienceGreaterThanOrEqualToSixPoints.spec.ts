import { Material } from '@gamepark/rules-api'
import { describe, expect, test } from 'vitest'
import { AudienceGreaterThanOrEqualToSixPoints } from '../../src/material/AwardCards/AudienceGreaterThanOrEqualToSixPoints'
import { GuestPawn } from '../../src/material/GuestPawn'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { PlayerColor } from '../../src/PlayerColor'

const getAudienceFromAudienceTrackSpot = (locationX: number) => {
  switch (locationX ?? 0) {
    case 0:
      return 3
    case 1:
    case 2:
      return 4
    case 3:
    case 4:
      return 5
    case 5:
    case 6:
    case 7:
      return 6
    case 8:
      return 7
    default:
      throw new Error('Invalid audience cube spot')
  }
}

describe('AudienceGreaterThanOrEqualToSixPoints tests', () => {
  test.for([
    { x: 1, expectedPoints: 0 },
    { x: 2, expectedPoints: 0 },
    { x: 3, expectedPoints: 0 },
    { x: 4, expectedPoints: 0 },
    { x: 5, expectedPoints: 4 },
    { x: 6, expectedPoints: 4 },
    { x: 7, expectedPoints: 4 },
    { x: 8, expectedPoints: 4 }
  ])('Given audience cube at spot $x of the Audience track, the award card should award $expectedPoints', ({ x, expectedPoints }) => {
    // Given
    const playerMovieArchiveMaterial = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.MovieCards, [])
    const playerTheaterTilesMaterial = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.TheaterTiles, [])
    const guestCountsByColor = {
      [GuestPawn.Blue]: 0,
      [GuestPawn.Green]: 0,
      [GuestPawn.Red]: 0,
      [GuestPawn.Yellow]: 0,
      [GuestPawn.White]: 0
    }
    const audience = getAudienceFromAudienceTrackSpot(x)

    // When
    const gainedPoints = AudienceGreaterThanOrEqualToSixPoints(playerMovieArchiveMaterial, playerTheaterTilesMaterial, guestCountsByColor, audience)

    // Then
    expect(gainedPoints).to.equal(expectedPoints)
  })
})
