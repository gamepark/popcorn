import { describe, expect, test } from 'vitest'
import { MoviePrice4Or5Points } from '../../src/material/AwardCards/MoviePrice4Or5Points'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { MovieCard } from '../../src/material/MovieCard'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('MoviePrice4Or5Points tests', () => {
  test.for([
    {
      playerMovies: [
        MovieCard.FirstMovieGreenEndOfTheWorld,
        MovieCard.Blue5678,
        MovieCard.BlueMe,
        MovieCard.GreenAbracadab,
        MovieCard.GreenKingOfTokyo,
        MovieCard.RedTheFuryOfTheSerpent,
        MovieCard.RedTheVolcano,
        MovieCard.YellowTheAdventuresOfPewPew
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOf0Or1Movies: 2,
      expectedPoints: 4
    },
    {
      playerMovies: [
        MovieCard.FirstMovieBlueRosebud,
        MovieCard.YellowMelancholyCharlie,
        MovieCard.YellowTheKids,
        MovieCard.YellowKangarooMan,
        MovieCard.RedTheCursedPegleg,
        MovieCard.RedTheManWithTheMoney,
        MovieCard.BlueTheGodmother,
        MovieCard.BlueRohanAndJaya,
        MovieCard.GreenIntergalactic
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOf0Or1Movies: 3,
      expectedPoints: 6
    },
    {
      playerMovies: [
        MovieCard.FirstMovieYellowModernLove,
        MovieCard.GreenFrankAndEinstein,
        MovieCard.GreenTheBarbarian,
        MovieCard.GreenRevengeOfTheDiplodocus,
        MovieCard.BlueJoeJoe,
        MovieCard.YellowDoReMiFaSo,
        MovieCard.RedTheVolcano,
        MovieCard.RedTheWorldAfter
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOf0Or1Movies: 0,
      expectedPoints: 0
    },
    {
      playerMovies: [
        MovieCard.FirstMovieRedItSMyWar,
        MovieCard.RedUnknownDestination,
        MovieCard.RedGentlemanDriver,
        MovieCard.BlueObjection,
        MovieCard.BlueBigSpenders,
        MovieCard.GreenAMonsterInTheShip,
        MovieCard.GreenWitchesVsCheerleaders,
        MovieCard.YellowSchoolOfZombies,
        MovieCard.YellowTheFirePrincess
      ] as Exclude<MovieCard, MovieCard.FinalShowing>[],
      numberOf0Or1Movies: 1,
      expectedPoints: 2
    }
  ])('Given $numberOf0Or1Movies movie(s) that cost $ 4 or $ 5, MoviePrice0Or1Points should award $expectedPoints ', ({ playerMovies, expectedPoints }) => {
    // Given
    const player = PlayerColor.Cyan
    const setup = new TestCustomPopcornSetup(player, playerMovies, [])
    setup.setup()
    const playerArchiveMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
    const playerTheaterTileMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)

    // When
    const awardedPoints = MoviePrice4Or5Points(playerArchiveMaterial, playerTheaterTileMaterial, {}, 7)

    // Then
    expect(awardedPoints).to.equal(expectedPoints)
  })
})
