import { describe, expect, test } from 'vitest'
import { PopcornSetup } from '../src'
import { LocationType } from '../src/material/LocationType'
import { MaterialType } from '../src/material/MaterialType'
import { MovieCard, movieCardCharacteristics, MovieCardId, MovieCardType } from '../src/material/MovieCard'
import { PlayerColor } from '../src/PlayerColor'

describe('Game setup tests', () => {
  test.for([
    [{ id: PlayerColor.Orange }, { id: PlayerColor.Cyan }],
    [{ id: PlayerColor.Green }, { id: PlayerColor.Purple }, { id: PlayerColor.Orange }],
    [{ id: PlayerColor.Orange }, { id: PlayerColor.Purple }, { id: PlayerColor.Green }, { id: PlayerColor.Cyan }]
  ])('Given any player number, setup() should create 45 movie cards', (givenPlayerOptions) => {
    // Given
    const gameSetup = new PopcornSetup()

    // When
    gameSetup.setup({
      players: givenPlayerOptions
    })

    // Then
    const movieCardsMaterial = gameSetup.material(MaterialType.MovieCards)
    const firstMovieCards = movieCardsMaterial.location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard).getItems<MovieCardId>()
    const allMovieCards = movieCardsMaterial
      .id<MovieCardId>((id) => id.front === MovieCard.FinalShowing || movieCardCharacteristics[id.front!].movieType === MovieCardType.Movie)
      .getItems<MovieCardId>()
    const movieCardsInDeck = movieCardsMaterial.location(LocationType.MovieCardDeckSpot).getItems<MovieCardId>()
    const movieCardsInFeaturesRow = movieCardsMaterial.location(LocationType.FeaturesRowSpot).getItems<MovieCardId>()
    const movieCardsInPremiersRow = movieCardsMaterial.location(LocationType.PremiersRowSpot).getItems<MovieCardId>()
    expect(firstMovieCards).to.have.lengthOf(givenPlayerOptions.length)
    expect(allMovieCards).to.have.lengthOf(44)
    expect(allMovieCards.map((movieCard) => movieCard.id.front)).not.to.contain(MovieCard.FinalShowing)
    expect(movieCardsInDeck).to.have.lengthOf(38)
    expect(movieCardsInPremiersRow).to.have.lengthOf(3)
    expect(movieCardsInFeaturesRow).to.have.lengthOf(3)
  })
})
