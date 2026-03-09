import { describe, expect, test } from 'vitest'
import { BlueRedMoviePairPoints } from '../../src/material/AwardCards/BlueRedMoviePairPoints'
import { GuestPawn } from '../../src/material/GuestPawn'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { MovieCard } from '../../src/material/MovieCard'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('BlueRedMoviePairPoints Tests', () => {
  test.each([
    {
      playerMovies: [
        MovieCard.BlueHenrietta,
        MovieCard.Blue5678,
        MovieCard.GreenEliminator4,
        MovieCard.FirstMovieGreenEndOfTheWorld,
        MovieCard.RedBarbacus,
        MovieCard.Yellow28InTheFamily,
        MovieCard.YellowKangarooMan
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfBlueMovies: 2,
      numberOfRedMovies: 1,
      expectedPoints: 2
    },
    {
      playerMovies: [
        MovieCard.BlueHenrietta,
        MovieCard.Blue5678,
        MovieCard.RedTheManWithTheMoney,
        MovieCard.FirstMovieBlueRosebud,
        MovieCard.RedBarbacus,
        MovieCard.Yellow28InTheFamily,
        MovieCard.YellowKangarooMan
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfBlueMovies: 3,
      numberOfRedMovies: 2,
      expectedPoints: 4
    },
    {
      playerMovies: [
        MovieCard.RedElitePilot,
        MovieCard.YellowSchoolOfZombies,
        MovieCard.GreenEliminator4,
        MovieCard.FirstMovieGreenEndOfTheWorld,
        MovieCard.RedBarbacus,
        MovieCard.Yellow28InTheFamily,
        MovieCard.YellowKangarooMan
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfBlueMovies: 0,
      numberOfRedMovies: 2,
      expectedPoints: 0
    },
    {
      playerMovies: [
        MovieCard.BlueHenrietta,
        MovieCard.Blue5678,
        MovieCard.GreenTheBarbarian,
        MovieCard.FirstMovieYellowModernLove,
        MovieCard.GreenIntergalactic,
        MovieCard.Yellow28InTheFamily,
        MovieCard.YellowKangarooMan
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfBlueMovies: 2,
      numberOfRedMovies: 0,
      expectedPoints: 0
    }
  ])(
    'Given archived movies with $numberOfBlueMovies blue movie(s) and $numberOfRedMovies red movie(s), BlueRedMoviesPairPoints should award $expectedPoints',
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
      const awardedPoints = BlueRedMoviePairPoints(playerMovieArchiveMaterial, playerTheaterTilesMaterial, guestCountsByColor, 6)

      // Then
      expect(awardedPoints).to.equal(expectedPoints)
    }
  )
})
