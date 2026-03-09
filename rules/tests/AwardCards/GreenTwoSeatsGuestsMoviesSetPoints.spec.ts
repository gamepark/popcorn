import { describe, expect, test } from 'vitest'
import { GuestPawn } from '../../src/material/GuestPawn'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { MovieCard } from '../../src/material/MovieCard'
import { TheaterTile } from '../../src/material/TheaterTile'
import { GreenTwoSeatsGuestsMoviesSetPoints } from '../../src/material/AwardCards/GreenTwoSeatsGuestsMoviesSetPoints'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('GreenTwoSeatsGuestsMoviesSetPoints tests', () => {
  test.for([
    {
      playerMovies: [
        MovieCard.FirstMovieGreenEndOfTheWorld,
        MovieCard.BlueHenrietta,
        MovieCard.RedVroom8,
        MovieCard.YellowKangarooMan,
        MovieCard.GreenIntergalactic
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      playerTheaterTiles: [TheaterTile.TwoSeatGreenBlue, TheaterTile.TwoSeatGreen2MoneyMovieAction, TheaterTile.ThreeSeatBlueBlueGrey] as TheaterTile[],
      guestCountsByColor: {
        [GuestPawn.Blue]: 2,
        [GuestPawn.Green]: 3,
        [GuestPawn.Red]: 1,
        [GuestPawn.Yellow]: 3,
        [GuestPawn.White]: 3
      } as Partial<Record<GuestPawn, number>>,
      numberOfGreenSets: 1,
      expectedPoints: 4
    },
    {
      playerMovies: [
        MovieCard.FirstMovieGreenEndOfTheWorld,
        MovieCard.BlueHenrietta,
        MovieCard.RedVroom8,
        MovieCard.YellowKangarooMan,
        MovieCard.GreenKingOfTokyo,
        MovieCard.GreenIntergalactic,
        MovieCard.GreenBadman
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      playerTheaterTiles: [TheaterTile.TwoSeatGreenBlue, TheaterTile.TwoSeatGreenDrawMovieAction, TheaterTile.ThreeSeatGreenGreenGrey] as TheaterTile[],
      guestCountsByColor: {
        [GuestPawn.Blue]: 2,
        [GuestPawn.Green]: 4,
        [GuestPawn.Red]: 1,
        [GuestPawn.Yellow]: 2,
        [GuestPawn.White]: 3
      } as Partial<Record<GuestPawn, number>>,
      numberOfGreenSets: 2,
      expectedPoints: 8
    },
    {
      playerMovies: [
        MovieCard.FirstMovieYellowModernLove,
        MovieCard.Yellow28InTheFamily,
        MovieCard.RedVroom8,
        MovieCard.YellowKangarooMan,
        MovieCard.RedBarbacus,
        MovieCard.BlueHenrietta,
        MovieCard.Blue5678
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      playerTheaterTiles: [TheaterTile.OneSeatBlue3Money, TheaterTile.TwoSeatBlue1Popcorn2Money, TheaterTile.ThreeSeatGreenGreenGrey] as TheaterTile[],
      guestCountsByColor: {
        [GuestPawn.Blue]: 1,
        [GuestPawn.Green]: 4,
        [GuestPawn.Red]: 1,
        [GuestPawn.Yellow]: 2,
        [GuestPawn.White]: 3
      } as Partial<Record<GuestPawn, number>>,
      numberOfGreenSets: 0,
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
      numberOfGreenSets: 0,
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
      playerTheaterTiles: [TheaterTile.OneSeatGreenReserve, TheaterTile.TwoSeatBlue1Popcorn2Money, TheaterTile.ThreeSeatBlueBlueGrey] as TheaterTile[],
      guestCountsByColor: {
        [GuestPawn.Blue]: 2,
        [GuestPawn.Red]: 2,
        [GuestPawn.Yellow]: 4,
        [GuestPawn.White]: 3
      } as Partial<Record<GuestPawn, number>>,
      numberOfGreenSets: 0,
      expectedPoints: 0
    }
  ])(
    'Given material with $numberOfGreenSets set(s) of 2 green movies, 2 green seats, 2 green guests, BlueTwoSeatsGuestsMoviesSetPoints should award $expectedPoints',
    ({ playerMovies, playerTheaterTiles, guestCountsByColor, expectedPoints }) => {
      // Given
      const player = PlayerColor.Green
      const setup = new TestCustomPopcornSetup(player, playerMovies, playerTheaterTiles)
      setup.setup()
      const playerMovieMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
      const playerTheaterTileMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)

      // When
      const awardedPoints = GreenTwoSeatsGuestsMoviesSetPoints(playerMovieMaterial, playerTheaterTileMaterial, guestCountsByColor, 6)

      // Then
      expect(awardedPoints).to.equal(expectedPoints)
    }
  )
})
