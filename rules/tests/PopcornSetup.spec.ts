import { Material } from '@gamepark/rules-api'
import { PopCornSetup } from '../src'
import { LocationType } from '../src/material/LocationType'
import { MaterialType } from '../src/material/MaterialType'
import { getMovieCardType, MovieCard, MovieCardId, MovieCardType } from '../src/material/MovieCard'
import { PlayerColor } from '../src/PlayerColor'

describe('Game setup tests', () => {
  test.each([
    [[{ id: PlayerColor.Orange }, { id: PlayerColor.Cyan }]],
    [[{ id: PlayerColor.Green }, { id: PlayerColor.Purple }, { id: PlayerColor.Orange }]],
    [[{ id: PlayerColor.Orange }, { id: PlayerColor.Purple }, { id: PlayerColor.Green }, { id: PlayerColor.Cyan }]]
  ])('Given any player number, setup() should create 45 movie cards', (givenPlayerOptions) => {
    // Given
    const gameSetup = new PopCornSetup()

    // When
    const game = gameSetup.setup({
      players: givenPlayerOptions
    })

    // Then
    const movieCardsMaterial = new Material(MaterialType.MovieCards, game.items[MaterialType.MovieCards])
    const firstMovieCards = movieCardsMaterial.location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard).getItems<MovieCardId>()
    const allMovieCards = movieCardsMaterial.id<MovieCardId>((id) => getMovieCardType(id.front!) === MovieCardType.Movie).getItems<MovieCardId>()
    const movieCardsInDeck = movieCardsMaterial.location(LocationType.MovieCardDeckSpot).getItems<MovieCardId>()
    const movieCardsInFeaturesRow = movieCardsMaterial.location(LocationType.FeaturesRowSpot).getItems<MovieCardId>()
    const movieCardsInPremiersRow = movieCardsMaterial.location(LocationType.PremiersRowSpot).getItems<MovieCardId>()
    expect(firstMovieCards).toHaveLength(givenPlayerOptions.length)
    expect(allMovieCards).toHaveLength(45)
    expect(movieCardsInDeck).toHaveLength(39)
    expect(movieCardsInPremiersRow).toHaveLength(3)
    expect(movieCardsInFeaturesRow).toHaveLength(3)
  })

  test('Given 2 players, setup() should return a game object with the final showing card at the correct location in the deck', () => {
    // Given
    const gameSetup = new PopCornSetup()

    // When
    const game = gameSetup.setup({
      players: [{ id: PlayerColor.Cyan }, { id: PlayerColor.Green }]
    })

    // Then
    const movieCardsMaterial = new Material(MaterialType.MovieCards, game.items[MaterialType.MovieCards])
    const finalShowingCard = movieCardsMaterial.id<MovieCardId>({ front: MovieCard.FinalShowing, back: MovieCardType.Movie }).getItems<MovieCardId>()
    expect(finalShowingCard).not.toBeUndefined()
    expect(finalShowingCard).not.toBeNull()
    expect(finalShowingCard).toHaveLength(1)
    expect(finalShowingCard[0].location.type).toBe(LocationType.MovieCardDeckSpot)
    expect(finalShowingCard[0].location.x).not.toBeUndefined()
    expect(finalShowingCard[0].location.x).not.toBeNull()
    expect(finalShowingCard[0].location.x).toBe(9)
  })

  test.each([
    [[{ id: PlayerColor.Green }, { id: PlayerColor.Purple }, { id: PlayerColor.Orange }]],
    [[{ id: PlayerColor.Orange }, { id: PlayerColor.Purple }, { id: PlayerColor.Green }, { id: PlayerColor.Cyan }]]
  ])('Given 3 or 4 players, setup() should return a game object with the final showing card at the correct location in the deck', (playerOptions) => {
    // Given
    const gameSetup = new PopCornSetup()

    // When
    const game = gameSetup.setup({
      players: playerOptions
    })

    // Then
    const movieCardsMaterial = new Material(MaterialType.MovieCards, game.items[MaterialType.MovieCards])
    const finalShowingCard = movieCardsMaterial.id<MovieCardId>({ front: MovieCard.FinalShowing, back: MovieCardType.Movie }).getItems<MovieCardId>()
    expect(finalShowingCard).not.toBeUndefined()
    expect(finalShowingCard).not.toBeNull()
    expect(finalShowingCard).toHaveLength(1)
    expect(finalShowingCard[0].location.type).toBe(LocationType.MovieCardDeckSpot)
    expect(finalShowingCard[0].location.x).not.toBeUndefined()
    expect(finalShowingCard[0].location.x).not.toBeNull()
    expect(finalShowingCard[0].location.x).toBe(4)
  })
})
