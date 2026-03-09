import { describe, expect, test } from 'vitest'
import { FourOfAKindMoviePoints } from '../../src/material/AwardCards/FourOfAKindMoviePoints'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { MovieCard } from '../../src/material/MovieCard'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('FourOfAKindMoviePoints tests', () => {
  test.for([
    {
      playerMovies: [
        MovieCard.FirstMovieBlueRosebud,
        MovieCard.GreenBadman,
        MovieCard.RedFinalLasso,
        MovieCard.Yellow28InTheFamily,
        MovieCard.Blue5678,
        MovieCard.GreenEliminator4,
        MovieCard.RedBarbacus,
        MovieCard.YellowDoReMiFaSo
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfSets: 2,
      expectedPoints: 8
    },
    {
      playerMovies: [
        MovieCard.FirstMovieBlueRosebud,
        MovieCard.GreenBadman,
        MovieCard.RedFinalLasso,
        MovieCard.Yellow28InTheFamily,
        MovieCard.Blue5678,
        MovieCard.RedVroom8,
        MovieCard.RedBarbacus,
        MovieCard.YellowDoReMiFaSo
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfSets: 1,
      expectedPoints: 4
    },
    {
      playerMovies: [
        MovieCard.FirstMovieGreenEndOfTheWorld,
        MovieCard.GreenBadman,
        MovieCard.RedFinalLasso,
        MovieCard.Yellow28InTheFamily,
        MovieCard.YellowDoReMiFaSo,
        MovieCard.RedVroom8,
        MovieCard.RedBarbacus,
        MovieCard.YellowDoReMiFaSo
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfSets: 0,
      expectedPoints: 0
    },
    {
      playerMovies: [
        MovieCard.FirstMovieRedItSMyWar,
        MovieCard.GreenBadman,
        MovieCard.RedFinalLasso,
        MovieCard.Yellow28InTheFamily,
        MovieCard.YellowDoReMiFaSo,
        MovieCard.RedVroom8,
        MovieCard.RedBarbacus,
        MovieCard.YellowDoReMiFaSo
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfSets: 0,
      expectedPoints: 0
    },
    {
      playerMovies: [
        MovieCard.FirstMovieYellowModernLove,
        MovieCard.GreenBadman,
        MovieCard.RedFinalLasso,
        MovieCard.Yellow28InTheFamily,
        MovieCard.GreenEliminator4,
        MovieCard.RedVroom8,
        MovieCard.RedBarbacus,
        MovieCard.YellowDoReMiFaSo
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfSets: 0,
      expectedPoints: 0
    },
    {
      playerMovies: [
        MovieCard.FirstMovieBlueRosebud,
        MovieCard.GreenBadman,
        MovieCard.RedFinalLasso,
        MovieCard.BlueHenrietta,
        MovieCard.GreenKingOfTokyo,
        MovieCard.RedVroom8,
        MovieCard.RedBarbacus
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOfSets: 0,
      expectedPoints: 0
    }
  ])('Given $numberOfSets set(s) of 4 movies with each color, FourOfAKindMoviePoints should return $expectedPoints', ({ playerMovies, expectedPoints }) => {
    // Given
    const player = PlayerColor.Purple
    const setup = new TestCustomPopcornSetup(player, playerMovies, [])
    setup.setup()
    const playerMovieMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
    const playerTheaterTileMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)

    // When
    const awardedPoints = FourOfAKindMoviePoints(playerMovieMaterial, playerTheaterTileMaterial, {}, 6)

    // THen
    expect(awardedPoints).to.equal(expectedPoints)
  })
})
