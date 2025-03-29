import { MaterialGameSetup } from '@gamepark/rules-api'
import { shuffle } from 'lodash'
import { awardCards } from './material/AwardCard'
import { GuestPawn, guestPawns } from './material/GuestPawn'
import { getSliderColor, getSlidersForPlayers } from './material/LobbySlider'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { moneyTokens } from './material/MoneyToken'
import { FilmColor, firstMovieCards, getFilmColor, getMovieCardType, MovieCard, movieCardsWithoutFinalShowing } from './material/MovieCard'
import { getSeatsNumber, SeatsNumber, theaterTiles } from './material/TheaterTile'
import { theaterTrophy } from './material/TheaterTrophy'
import { PlayerColor } from './PlayerColor'
import { PopCornOptions } from './PopCornOptions'
import { PopCornRules } from './PopCornRules'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class PopCornSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, PopCornOptions> {
  Rules = PopCornRules

  setupMaterial(_options: PopCornOptions) {
    this.createTheaterTrophyTokens()
    this.createAndDealAwardCards()
    this.createAndPopulateTheaterTileRivers()
    this.createAndDealGeneralGuestPawns()
    this.createMovieCardDeckAndPopulateRivers()
    this.createLobbySlidersForPlayers()
    this.createPlayerSpecificMaterial()
    this.material(MaterialType.FirstPlayerMarker).createItem({
      location: {
        type: LocationType.FirstPlayerMarkerSpot,
        player: this.players[0]
      }
    })
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }

  private createAndDealAwardCards(): void {
    this.material(MaterialType.AwardCards).createItemsAtOnce(
      awardCards.map((id) => ({
        id: id,
        location: {
          type: LocationType.AwardCardDeckSpot
        }
      }))
    )
    this.material(MaterialType.AwardCards).shuffle()
    this.players.forEach((player) => {
      this.material(MaterialType.AwardCards).deck().dealAtOnce(
        {
          type: LocationType.PlayerAwardCardHand,
          player: player
        },
        2
      )
    })
  }

  private createAndPopulateTheaterTileRivers(): void {
    this.material(MaterialType.TheaterTiles).createItemsAtOnce(
      theaterTiles.map((id) => {
        const numberOfSeats = getSeatsNumber(id)
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
                type: LocationType.PLayerGuestPawnsUnderBlothBagSpot,
                player: player
              }
            }))
        )
      )
    )
  }

  private createMovieCardDeckAndPopulateRivers(): void {
    this.material(MaterialType.MovieCards).createItemsAtOnce(
      movieCardsWithoutFinalShowing.map((id) => ({
        id: {
          front: id,
          back: getMovieCardType(id)
        },
        location: {
          type: LocationType.MovieCardDeckSpot
        }
      }))
    )
    this.material(MaterialType.MovieCards).shuffle()
    this.material(MaterialType.MovieCards).createItem({
      id: {
        front: MovieCard.FinalShowing,
        back: getMovieCardType(MovieCard.FinalShowing)
      },
      location: {
        type: LocationType.MovieCardDeckSpot,
        x: this.players.length === 2 ? 10 : 5
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
      const firstMovieCardId = {
        front: firstMovieCardIds[index],
        back: getMovieCardType(firstMovieCardIds[index])
      }
      this.material(MaterialType.MovieCards).createItem({
        id: firstMovieCardId,
        location: {
          type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
          player: player
        }
      })
      const firstMovieColor = getFilmColor(firstMovieCardId.front)
      const guestPawnColor = this.getGuestPawnColorFromMovieColor(firstMovieColor)
      this.material(MaterialType.GuestPawns).location(LocationType.GuestPawnReserveSpot).id<GuestPawn>(guestPawnColor).moveItem({
        type: LocationType.PLayerGuestPawnsUnderBlothBagSpot,
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
    })
  }

  private getGuestPawnColorFromMovieColor(movieColor: FilmColor): GuestPawn {
    switch (movieColor) {
      case FilmColor.Blue:
        return GuestPawn.Blue
      case FilmColor.Green:
        return GuestPawn.Green
      case FilmColor.Red:
        return GuestPawn.Red
      case FilmColor.Yellow:
        return GuestPawn.Yellow
    }
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
}
