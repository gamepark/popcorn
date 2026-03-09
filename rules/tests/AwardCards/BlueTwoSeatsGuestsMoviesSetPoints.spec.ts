import { describe, expect, test } from 'vitest'
import { BlueTwoSeatsGuestsMoviesSetPoints } from '../../src/material/AwardCards/BlueTwoSeatsGuestsMoviesSetPoints'
import { GuestPawn } from '../../src/material/GuestPawn'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { MovieCard } from '../../src/material/MovieCard'
import { TheaterTile } from '../../src/material/TheaterTile'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('BlueTwoSeatsGuestsMoviesSetPoints tests', () => {
  test.for([
    {
      playerMovies: [
        MovieCard.FirstMovieBlueRosebud,
        MovieCard.BlueHenrietta,
        MovieCard.RedVroom8,
        MovieCard.YellowKangarooMan,
        MovieCard.GreenIntergalactic
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      playerTheaterTiles: [TheaterTile.OneSeatBlue3Money, TheaterTile.TwoSeatGreen2MoneyMovieAction, TheaterTile.ThreeSeatBlueBlueGrey] as TheaterTile[],
      guestCountsByColor: {
        [GuestPawn.Blue]: 2,
        [GuestPawn.Green]: 3,
        [GuestPawn.Red]: 1,
        [GuestPawn.Yellow]: 3,
        [GuestPawn.White]: 3
      } as Partial<Record<GuestPawn, number>>,
      numberOfBlueSets: 1,
      expectedPoints: 4
    },
    {
      playerMovies: [
        MovieCard.FirstMovieBlueRosebud,
        MovieCard.BlueHenrietta,
        MovieCard.RedVroom8,
        MovieCard.YellowKangarooMan,
        MovieCard.BlueAdrian,
        MovieCard.GreenIntergalactic,
        MovieCard.Blue5678
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      playerTheaterTiles: [TheaterTile.OneSeatBlue3Money, TheaterTile.TwoSeatBlue1Popcorn2Money, TheaterTile.ThreeSeatBlueBlueGrey] as TheaterTile[],
      guestCountsByColor: {
        [GuestPawn.Blue]: 4,
        [GuestPawn.Green]: 1,
        [GuestPawn.Red]: 1,
        [GuestPawn.Yellow]: 2,
        [GuestPawn.White]: 3
      } as Partial<Record<GuestPawn, number>>,
      numberOfBlueSets: 2,
      expectedPoints: 8
    },
    {
      playerMovies: [
        MovieCard.FirstMovieGreenEndOfTheWorld,
        MovieCard.Yellow28InTheFamily,
        MovieCard.RedVroom8,
        MovieCard.YellowKangarooMan,
        MovieCard.RedBarbacus,
        MovieCard.GreenIntergalactic,
        MovieCard.GreenTheBarbarian
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      playerTheaterTiles: [TheaterTile.OneSeatBlue3Money, TheaterTile.TwoSeatBlue1Popcorn2Money, TheaterTile.ThreeSeatBlueBlueGrey] as TheaterTile[],
      guestCountsByColor: {
        [GuestPawn.Blue]: 1,
        [GuestPawn.Green]: 4,
        [GuestPawn.Red]: 1,
        [GuestPawn.Yellow]: 2,
        [GuestPawn.White]: 3
      } as Partial<Record<GuestPawn, number>>,
      numberOfBlueSets: 0,
      expectedPoints: 0
    },
    {
      playerMovies: [
        MovieCard.FirstMovieBlueRosebud,
        MovieCard.BlueHenrietta,
        MovieCard.RedVroom8,
        MovieCard.YellowKangarooMan,
        MovieCard.BlueAdrian,
        MovieCard.GreenIntergalactic,
        MovieCard.Blue5678
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      playerTheaterTiles: [TheaterTile.OneSeatRed2Popcorn, TheaterTile.TwoSeatRed2MoneyMovieAction, TheaterTile.ThreeSeatYellow3MoneyRedGrey] as TheaterTile[],
      guestCountsByColor: {
        [GuestPawn.Blue]: 4,
        [GuestPawn.Green]: 1,
        [GuestPawn.Red]: 1,
        [GuestPawn.Yellow]: 2,
        [GuestPawn.White]: 3
      } as Partial<Record<GuestPawn, number>>,
      numberOfBlueSets: 0,
      expectedPoints: 0
    },
    {
      playerMovies: [
        MovieCard.FirstMovieBlueRosebud,
        MovieCard.BlueHenrietta,
        MovieCard.RedVroom8,
        MovieCard.YellowKangarooMan,
        MovieCard.BlueAdrian,
        MovieCard.GreenIntergalactic,
        MovieCard.Blue5678
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      playerTheaterTiles: [TheaterTile.OneSeatBlue3Money, TheaterTile.TwoSeatBlue1Popcorn2Money, TheaterTile.ThreeSeatBlueBlueGrey] as TheaterTile[],
      guestCountsByColor: {
        [GuestPawn.Blue]: 1,
        [GuestPawn.Green]: 3,
        [GuestPawn.Red]: 1,
        [GuestPawn.Yellow]: 4,
        [GuestPawn.White]: 3
      } as Partial<Record<GuestPawn, number>>,
      numberOfBlueSets: 0,
      expectedPoints: 0
    }
  ])(
    'Given material with $numberOfBlueSets set(s) of 2 blue movies, 2 blue seats, 2 blue guests, BlueTwoSeatsGuestsMoviesSetPoints should award $expectedPoints',
    ({ playerMovies, playerTheaterTiles, guestCountsByColor, expectedPoints }) => {
      // Given
      const player = PlayerColor.Green
      const setup = new TestCustomPopcornSetup(player, playerMovies, playerTheaterTiles)
      setup.setup()
      const playerMovieMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
      const playerTheaterTileMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)

      // When
      const awardedPoints = BlueTwoSeatsGuestsMoviesSetPoints(playerMovieMaterial, playerTheaterTileMaterial, guestCountsByColor, 6)

      // Then
      expect(awardedPoints).to.equal(expectedPoints)
    }
  )
})
