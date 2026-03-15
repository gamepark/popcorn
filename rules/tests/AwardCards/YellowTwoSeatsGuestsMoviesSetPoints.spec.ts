import { describe, expect, test } from 'vitest'
import { YellowTwoSeatsGuestsMoviesSetPoints } from '../../src/material/AwardCards/YellowTwoSeatsGuestsMoviesSetPoints'
import { GuestPawn } from '../../src/material/GuestPawn'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { MovieCard } from '../../src/material/MovieCard'
import { TheaterTile } from '../../src/material/TheaterTile'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('RedTwoSeatsGuestsMoviesSetPoints tests', () => {
  test.for([
    {
      playerMovies: [
        MovieCard.FirstMovieYellowModernLove,
        MovieCard.BlueHenrietta,
        MovieCard.RedVroom8,
        MovieCard.YellowKangarooMan,
        MovieCard.GreenIntergalactic
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      playerTheaterTiles: [TheaterTile.TwoSeatYellowYellow, TheaterTile.TwoSeatGreen2MoneyMovieAction, TheaterTile.ThreeSeatBlueBlueGrey] as TheaterTile[],
      guestCountsByColor: {
        [GuestPawn.Blue]: 2,
        [GuestPawn.Green]: 2,
        [GuestPawn.Red]: 2,
        [GuestPawn.Yellow]: 3,
        [GuestPawn.White]: 3
      } as Partial<Record<GuestPawn, number>>,
      numberOfYellowSets: 1,
      expectedPoints: 4
    },
    {
      playerMovies: [
        MovieCard.FirstMovieGreenEndOfTheWorld,
        MovieCard.BlueHenrietta,
        MovieCard.YellowSchoolOfZombies,
        MovieCard.YellowKangarooMan,
        MovieCard.YellowMisterGiggles,
        MovieCard.YellowTheAdventuresOfPewPew,
        MovieCard.RedTheWorldAfter
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      playerTheaterTiles: [TheaterTile.TwoSeatYellowYellow, TheaterTile.OneSeatYellowDrawGuest, TheaterTile.ThreeSeatYellowExitRedGrey] as TheaterTile[],
      guestCountsByColor: {
        [GuestPawn.Blue]: 2,
        [GuestPawn.Red]: 2,
        [GuestPawn.Yellow]: 4,
        [GuestPawn.White]: 3
      } as Partial<Record<GuestPawn, number>>,
      numberOfYellowSets: 2,
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
        [GuestPawn.Green]: 2,
        [GuestPawn.Red]: 3,
        [GuestPawn.Yellow]: 2,
        [GuestPawn.White]: 3
      } as Partial<Record<GuestPawn, number>>,
      numberOfYellowSets: 0,
      expectedPoints: 0
    },
    {
      playerMovies: [
        MovieCard.FirstMovieBlueRosebud,
        MovieCard.BlueHenrietta,
        MovieCard.YellowFrenchKiss,
        MovieCard.RedTheManWithTheMoney,
        MovieCard.BlueAdrian,
        MovieCard.GreenIntergalactic,
        MovieCard.Blue5678
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      playerTheaterTiles: [
        TheaterTile.OneSeatYellowDrawGuest,
        TheaterTile.TwoSeatRed2MoneyMovieAction,
        TheaterTile.ThreeSeatYellow3MoneyRedGrey
      ] as TheaterTile[],
      guestCountsByColor: {
        [GuestPawn.Blue]: 4,
        [GuestPawn.Green]: 1,
        [GuestPawn.Red]: 3,
        [GuestPawn.Yellow]: 2
      } as Partial<Record<GuestPawn, number>>,
      numberOfYellowSets: 0,
      expectedPoints: 0
    },
    {
      playerMovies: [
        MovieCard.FirstMovieYellowModernLove,
        MovieCard.BlueHenrietta,
        MovieCard.RedVroom8,
        MovieCard.YellowKangarooMan,
        MovieCard.RedTheCursedPegleg,
        MovieCard.GreenIntergalactic,
        MovieCard.Blue5678
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      playerTheaterTiles: [
        TheaterTile.OneSeatYellowDrawGuest,
        TheaterTile.TwoSeatBlue1Popcorn2Money,
        TheaterTile.ThreeSeatYellow3MoneyRedGrey
      ] as TheaterTile[],
      guestCountsByColor: {
        [GuestPawn.Blue]: 2,
        [GuestPawn.Green]: 2,
        [GuestPawn.Red]: 4,
        [GuestPawn.White]: 3
      } as Partial<Record<GuestPawn, number>>,
      numberOfYellowSets: 0,
      expectedPoints: 0
    }
  ])(
    'Given material with $numberOfYellowSets set(s) of 2 yellow movies, 2 yellow seats, 2 yellow guests, YellowTwoSeatsGuestsMoviesSetPoints should award $expectedPoints',
    ({ playerMovies, playerTheaterTiles, guestCountsByColor, expectedPoints }) => {
      // Given
      const player = PlayerColor.Green
      const setup = new TestCustomPopcornSetup(player, playerMovies, playerTheaterTiles)
      setup.setup()
      const playerMovieMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
      const playerTheaterTileMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)

      // When
      const awardedPoints = YellowTwoSeatsGuestsMoviesSetPoints(playerMovieMaterial, playerTheaterTileMaterial, guestCountsByColor, 6)

      // Then
      expect(awardedPoints).to.equal(expectedPoints)
    }
  )
})
