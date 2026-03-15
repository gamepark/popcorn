import { describe, expect, test } from 'vitest'
import { RedYellowMoviePairPoints } from '../../src/material/AwardCards/RedYellowMoviePairPoints'
import { GuestPawn } from '../../src/material/GuestPawn'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { MovieCard } from '../../src/material/MovieCard'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('RedYellowMoviePairPoints tests', () => {
  test.for([
    {
      playerMovies: [
        MovieCard.BlueHenrietta,
        MovieCard.Blue5678,
        MovieCard.GreenEliminator4,
        MovieCard.FirstMovieRedItSMyWar,
        MovieCard.RedBarbacus,
        MovieCard.Yellow28InTheFamily,
        MovieCard.YellowKangarooMan
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfYellowMovies: 2,
      numberOfRedMovies: 2,
      expectedPoints: 4
    },
    {
      playerMovies: [
        MovieCard.RedGentlemanDriver,
        MovieCard.Blue5678,
        MovieCard.GreenEliminator4,
        MovieCard.FirstMovieGreenEndOfTheWorld,
        MovieCard.RedBarbacus,
        MovieCard.Yellow28InTheFamily,
        MovieCard.RedVroom8
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfYellowMovies: 1,
      numberOfRedMovies: 3,
      expectedPoints: 2
    },
    {
      playerMovies: [
        MovieCard.BlueAdrian,
        MovieCard.Blue5678,
        MovieCard.GreenEliminator4,
        MovieCard.FirstMovieGreenEndOfTheWorld,
        MovieCard.RedBarbacus,
        MovieCard.Blue5678,
        MovieCard.RedFinalLasso
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfYellowMovies: 0,
      numberOfRedMovies: 2,
      expectedPoints: 0
    },
    {
      playerMovies: [
        MovieCard.BlueHenrietta,
        MovieCard.Blue5678,
        MovieCard.GreenBadman,
        MovieCard.FirstMovieYellowModernLove,
        MovieCard.GreenFrankAndEinstein,
        MovieCard.BlueMe,
        MovieCard.YellowKangarooMan
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfYellowMovies: 2,
      numberOfRedMovies: 0,
      expectedPoints: 0
    }
  ])(
    'Given archived movies with $numberOfRedMovies red movie(s) and $numberOfYellowMovies yellow movie(s), RedYellowMoviesPairPoints should award $expectedPoints',
    ({ playerMovies, expectedPoints }) => {
      // Given
      const player = PlayerColor.Green
      const setup = new TestCustomPopcornSetup(player, playerMovies, [])
      setup.setup()
      const playerMovieArchiveMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
      const playerTheaterTilesMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)
      const guestCountsByColor = {
        [GuestPawn.Blue]: 0,
        [GuestPawn.Green]: 0,
        [GuestPawn.Red]: 0,
        [GuestPawn.Yellow]: 0,
        [GuestPawn.White]: 0
      }

      // When
      const awardedPoints = RedYellowMoviePairPoints(playerMovieArchiveMaterial, playerTheaterTilesMaterial, guestCountsByColor, 6)

      // Then
      expect(awardedPoints).to.equal(expectedPoints)
    }
  )
})
