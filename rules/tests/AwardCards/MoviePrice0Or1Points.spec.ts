import { describe, expect, test } from 'vitest'
import { MoviePrice0Or1Points } from '../../src/material/AwardCards/MoviePrice0Or1Points'
import { LocationType } from '../../src/material/LocationType'
import { MaterialType } from '../../src/material/MaterialType'
import { MovieCard } from '../../src/material/MovieCard'
import { PlayerColor } from '../../src/PlayerColor'
import { TestCustomPopcornSetup } from '../setups/AwardCards/TestCustomPopcornSetup'

describe('MoviePrice0Or1Points tests', () => {
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
      numberOf0Or1Movies: 3,
      expectedPoints: 3
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
      numberOf0Or1Movies: 5,
      expectedPoints: 5
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
      numberOf0Or1Movies: 4,
      expectedPoints: 4
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
      numberOf0Or1Movies: 0,
      expectedPoints: 0
    }
  ])('Given $numberOf0Or1Movies movie(s) that cost $ 0 or $ 1, MoviePrice0Or1Points should award $expectedPoints ', ({ playerMovies, expectedPoints }) => {
    // Given
    const player = PlayerColor.Cyan
    const setup = new TestCustomPopcornSetup(player, playerMovies, [])
    setup.setup()
    const playerArchiveMaterial = setup.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(player)
    const playerTheaterTileMaterial = setup.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(player)

    // When
    const awardedPoints = MoviePrice0Or1Points(playerArchiveMaterial, playerTheaterTileMaterial, {}, 7)

    // Then
    expect(awardedPoints).to.equal(expectedPoints)
  })
})
