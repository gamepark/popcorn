import { MaterialGameSetup } from '@gamepark/rules-api'
import { shuffle } from 'lodash'
import { awardCards } from './material/AwardCard'
import { GuestPawn, guestPawns } from './material/GuestPawn'
import { getSliderColor, getSlidersForPlayers } from './material/LobbySlider'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { moneyTokens } from './material/MoneyToken'
import { firstMovieCards, MovieCard, movieCardCharacteristics, movieCardsWithoutFinalShowing, MovieCardType, MovieColor } from './material/MovieCard'
import { SeatsNumber, theaterTiles, theaterTilesCharacteristics, theaterTilesWithoutDefault } from './material/TheaterTile'
import { theaterTrophy } from './material/TheaterTrophy'
import { defaultPlayerActionMemory, Memorize, PlayerActionMemory } from './Memorize'
import { PlayerColor } from './PlayerColor'
import { PopcornOptions } from './PopcornOptions'
import { PopcornRules } from './PopcornRules'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class PopcornSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, PopcornOptions> {
  Rules = PopcornRules

  setupMaterial(_options: PopcornOptions) {
    this.createTheaterTrophyTokens()
    this.createAwardCards()
    this.createAndPopulateTheaterTileRivers()
    this.createAndDealGeneralGuestPawns()
    this.createMovieCardDeckAndPopulateRivers()
    this.createLobbySlidersForPlayers()
    this.createPlayerSpecificMaterial()
    this.createFirstPlayerToken()
    this.initializeMemory()
  }

  private createFirstPlayerToken(): void {
    this.material(MaterialType.FirstPlayerMarker).createItem({
      location: {
        type: LocationType.FirstPlayerMarkerSpot,
        player: this.players[0]
      }
    })
  }

  start() {
    this.startSimultaneousRule(RuleId.DealAndDiscardAwardCards)
  }

  private createTheaterTrophyTokens(): void {
    this.material(MaterialType.TheaterTrophies).createItemsAtOnce(
      theaterTrophy.map((id) => ({
        id: id,
        location: {
          type: LocationType.TheaterTrophyReserveSpot
        }
      }))
    )
  }

  private createAwardCards(): void {
    this.material(MaterialType.AwardCards).createItemsAtOnce(
      awardCards.map((id) => ({
        id: id,
        location: {
          type: LocationType.AwardCardDeckSpot
        }
      }))
    )
    this.material(MaterialType.AwardCards).shuffle()
  }

  private createAndPopulateTheaterTileRivers(): void {
    this.material(MaterialType.TheaterTiles).createItemsAtOnce(
      theaterTilesWithoutDefault.map((id) => {
        const numberOfSeats = theaterTilesCharacteristics[id].getSeatsNumber()
        const targetLocation =
          numberOfSeats === SeatsNumber.One
            ? LocationType.OneSeatTheaterTileDeckSpot
            : numberOfSeats === SeatsNumber.Two
              ? LocationType.TwoSeatTheaterTileDeckSpot
              : LocationType.ThreeSeatTheaterTileDeckSpot
        return {
          id: {
            front: id,
            back: numberOfSeats
          },
          location: {
            type: targetLocation
          }
        }
      })
    )
    const theaterTileDecks = [LocationType.OneSeatTheaterTileDeckSpot, LocationType.TwoSeatTheaterTileDeckSpot, LocationType.ThreeSeatTheaterTileDeckSpot]
    theaterTileDecks.forEach((location) => {
      const targetLocation =
        location === LocationType.OneSeatTheaterTileDeckSpot
          ? LocationType.OneSeatTheaterTileRowSpot
          : location === LocationType.TwoSeatTheaterTileDeckSpot
            ? LocationType.TwoSeatTheaterTileRowSpot
            : LocationType.ThreeSeatTheaterTileRowSpot
      this.material(MaterialType.TheaterTiles).location(location).shuffle()
      this.material(MaterialType.TheaterTiles).location(location).deck().dealAtOnce(
        {
          type: targetLocation
        },
        3
      )
    })
  }

  private createAndDealGeneralGuestPawns(): void {
    const guestPawnsWithoutWhite = guestPawns.filter((id) => id !== GuestPawn.White)
    this.material(MaterialType.GuestPawns).createItemsAtOnce(
      guestPawnsWithoutWhite.flatMap((id) =>
        this.players.map((player) => ({
          id: id,
          location: {
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          }
        }))
      )
    )
    this.material(MaterialType.GuestPawns).createItemsAtOnce(
      guestPawnsWithoutWhite.flatMap((id) =>
        Array(2)
          .fill(1)
          .map((_) => ({
            id: id,
            location: {
              type: LocationType.GuestPawnReserveSpot,
              id: id
            }
          }))
      )
    )
    this.material(MaterialType.GuestPawns).createItemsAtOnce(
      this.players.flatMap((player) =>
        guestPawns.flatMap((guestPawn) =>
          Array(guestPawn === GuestPawn.White ? 5 : 1)
            .fill(1)
            .map((_) => ({
              id: guestPawn,
              location: {
                type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
                player: player
              }
            }))
        )
      )
    )
  }

  private createMovieCardDeckAndPopulateRivers(): void {
    this.material(MaterialType.MovieCards).createItemsAtOnce(
      movieCardsWithoutFinalShowing.map((id) => {
        if (id === MovieCard.FinalShowing) {
          throw new Error('invalid card')
        }
        return {
          id: {
            front: id,
            back: movieCardCharacteristics[id].getMovieType()
          },
          location: {
            type: LocationType.MovieCardDeckSpot
          }
        }
      })
    )
    this.material(MaterialType.MovieCards).shuffle()
    this.material(MaterialType.MovieCards).createItem({
      id: {
        front: MovieCard.FinalShowing,
        back: MovieCardType.Movie
      },
      location: {
        type: LocationType.MovieCardDeckSpot,
        x: this.players.length === 2 ? 9 : 4
      }
    })
    const movieCardDeck = this.material(MaterialType.MovieCards).deck()
    movieCardDeck.dealAtOnce(
      {
        type: LocationType.FeaturesRowSpot
      },
      3
    )
    movieCardDeck.dealAtOnce(
      {
        type: LocationType.PremiersRowSpot
      },
      3
    )
  }

  private createLobbySlidersForPlayers(): void {
    this.material(MaterialType.LobbySliders).createItemsAtOnce(
      getSlidersForPlayers(this.players).map((id, index) => ({
        id: id,
        location: {
          type: LocationType.LobbySliderSpotOnTopPlayerCinemaBoard,
          player: getSliderColor(id),
          x: index % 3,
          y: index % 3 === 0 ? 1 : 0
        }
      }))
    )
  }

  private createPlayerSpecificMaterial(): void {
    const firstMovieCardIds = shuffle(firstMovieCards)
    this.players.forEach((player, index) => {
      const movieId = firstMovieCardIds[index]
      if (movieId === MovieCard.FinalShowing) {
        throw new Error('invalid card')
      }
      const firstMovieCardId = {
        front: movieId,
        back: movieCardCharacteristics[movieId].getMovieType()
      }
      this.material(MaterialType.MovieCards).createItem({
        id: firstMovieCardId,
        location: {
          type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
          player: player,
          x: 0
        }
      })
      const firstMovieColor = movieCardCharacteristics[movieId].getColor()
      const guestPawnColor = this.getGuestPawnColorFromMovieColor(firstMovieColor)
      this.material(MaterialType.GuestPawns).location(LocationType.GuestPawnReserveSpot).id<GuestPawn>(guestPawnColor).moveItem({
        type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
        player: player
      })
      this.material(MaterialType.MoneyTokens)
        .money(moneyTokens)
        .addMoney(5 + index, {
          type: LocationType.PlayerMoneyPileSpot,
          player: player
        })
      this.material(MaterialType.AdvertisingTokens).createItem({
        id: player,
        quantity: 3,
        location: {
          type: LocationType.PlayerAdvertisingTokenSpot,
          player: player
        }
      })
      this.material(MaterialType.AudienceCubes).createItem({
        location: {
          type: LocationType.AudienceCubeSpotOnTopPlayerCinemaBoard,
          player: player,
          x: 0
        }
      })
      this.material(MaterialType.TheaterTiles).createItems(
        theaterTiles.slice(0, 2).map((id, index) => ({
          id: {
            front: id,
            back: SeatsNumber.Default
          },
          location: {
            type: LocationType.TheaterTileSpotOnTopPlayerCinemaBoard,
            player: player,
            x: index
          }
        }))
      )
    })
  }

  private getGuestPawnColorFromMovieColor(movieColor: MovieColor): GuestPawn {
    switch (movieColor) {
      case MovieColor.Blue:
        return GuestPawn.Blue
      case MovieColor.Green:
        return GuestPawn.Green
      case MovieColor.Red:
        return GuestPawn.Red
      case MovieColor.Yellow:
        return GuestPawn.Yellow
    }
  }

  private initializeMemory(): void {
    this.game.players.forEach((player) => this.memorize<PlayerActionMemory>(Memorize.PlayerActions, defaultPlayerActionMemory, player))
    this.memorize<boolean>(Memorize.IsFirstTurn, true)
  }
}
