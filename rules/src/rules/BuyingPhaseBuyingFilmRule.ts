import { CustomMove, Location, MaterialItem, MaterialMove, MoveItem, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { AdvertisingTokenSpot } from '../material/AdvertisingTokenSpot'
import { BuyMovieCardCustomMoveData, CustomMoveType, isBuyMovieCardCustomMove } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { moneyTokens } from '../material/MoneyToken'
import { MovieAction, MovieCard, movieCardCharacteristics, MovieCardId } from '../material/MovieCard'
import { popcornTokens } from '../material/PopcornToken'
import { TheaterTileId } from '../material/TheaterTile'
import { Memorize, PlayerActionMemory } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class BuyingPhaseBuyingFilmRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const memory = this.remind<PlayerActionMemory>(Memorize.PlayerActions, this.player)
    if (memory[RuleId.BuyingPhaseRule].filmBought) {
      return []
    }
    const numberOfDestinations =
      this.material(MaterialType.TheaterTiles)
        .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
        .player(this.player)
        .location((location) => location.x === 2).length !== 0
        ? 3
        : 2
    const destinations = Array(numberOfDestinations)
      .fill(1)
      .map((_, index) => ({
        type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
        player: this.player,
        x: index
      }))
    const playerMoney = this.material(MaterialType.MoneyTokens).money(moneyTokens).location(LocationType.PlayerMoneyPileSpot).player(this.player).count
    return destinations.flatMap((destination) =>
      this.getMovesForMovieCardsInRow(playerMoney, destination, LocationType.FeaturesRowSpot)
        .concat(this.getMovesForMovieCardsInRow(playerMoney, destination, LocationType.PremiersRowSpot))
        .map((move) => this.mapMovieCardMoveToCustomMove(move))
    )
  }

  public onCustomMove(move: CustomMove<CustomMoveType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isBuyMovieCardCustomMove(move)) {
      const memory = this.remind<PlayerActionMemory>(Memorize.PlayerActions, this.player)
      memory[RuleId.BuyingPhaseRule].filmBought = true
      this.memorize<PlayerActionMemory>(Memorize.PlayerActions, memory, this.player)
      const boughtCardMaterial = this.material(MaterialType.MovieCards).index(move.data.boughtCardIndex)
      const boughtCard = boughtCardMaterial.getItem<MovieCardId>()
      if (
        boughtCard?.id.front === undefined ||
        boughtCard.id.front === MovieCard.FinalShowing ||
        (boughtCard.location.type !== LocationType.PremiersRowSpot && boughtCard.location.type !== LocationType.FeaturesRowSpot)
      ) {
        throw new Error('Trying to move an invalid card')
      }
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
      const sliderMove = this.getSliderMove(move.data.destinationSpot)
      if (sliderMove !== undefined) {
        consequences.push(sliderMove)
      }
      const previousMovieCardMaterial = this.material(MaterialType.MovieCards)
        .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
        .player(this.player)
        .location((location) => location.x === move.data.destinationSpot)
      if (previousMovieCardMaterial.length === 1) {
        consequences.push(
          previousMovieCardMaterial.moveItem({
            type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
            player: this.player,
            x: move.data.destinationSpot,
            y: 1
          }),
          previousMovieCardMaterial.moveItem({
            type: LocationType.PlayerMovieCardArchiveSpot
          })
        )
      }
      consequences.push(
        ...this.getMoneyTokensMoves(boughtCard),
        boughtCardMaterial.moveItem({
          type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
          player: this.player,
          x: move.data.destinationSpot,
          y: 1
        }),
        boughtCardMaterial.moveItem({
          type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
          player: this.player,
          x: move.data.destinationSpot,
          y: 0
        })
      )
      const theaterTile = this.material(MaterialType.TheaterTiles)
        .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
        .player(this.player)
        .location((location) => location.x === move.data.destinationSpot)
        .getItem<TheaterTileId>()
      if (theaterTile?.id.front === undefined) {
        throw new Error('Cannot have an empty tile')
      }
      const movieCharacteristics = movieCardCharacteristics[boughtCard.id.front]
      const bonusAction = movieCharacteristics.getBonusAction(theaterTile.id.front)
      if (bonusAction !== undefined) {
        consequences.push(...this.getMovesForMovieAction(bonusAction, this.player))
      }
      return consequences
    }
    return []
  }

  getMoneyTokensMoves(boughtCard: MaterialItem<PlayerColor, LocationType, MovieCardId>): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      boughtCard.id.front === undefined ||
      boughtCard.id.front === MovieCard.FinalShowing ||
      (boughtCard.location.type !== LocationType.FeaturesRowSpot && boughtCard.location.type !== LocationType.PremiersRowSpot)
    ) {
      throw new Error('Trying to move an invalid card')
    }
    const cardPrice = movieCardCharacteristics[boughtCard.id.front].getPrice(boughtCard.location.type)
    return this.material(MaterialType.MoneyTokens).money(moneyTokens).removeMoney(cardPrice, {
      type: LocationType.PlayerMoneyPileSpot,
      player: this.player
    })
  }

  private mapMovieCardMoveToCustomMove(move: MoveItem<PlayerColor, MaterialType, LocationType>): CustomMove {
    const moveData: BuyMovieCardCustomMoveData = {
      boughtCardIndex: move.itemIndex,
      player: this.player,
      destinationSpot: move.location.x as 0 | 1 | 2
    }
    return this.customMove<CustomMoveType>(CustomMoveType.BuyMovieCard, moveData)
  }

  private getMovesForMovieCardsInRow(
    playerMoney: number,
    destination: Location<PlayerColor, LocationType>,
    row: LocationType.FeaturesRowSpot | LocationType.PremiersRowSpot
  ): MoveItem<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.MovieCards)
      .location(row)
      .id<MovieCardId>((id) => id.front !== undefined && id.front !== MovieCard.FinalShowing && movieCardCharacteristics[id.front].getPrice(row) <= playerMoney)
      .moveItems(destination)
  }

  private getSliderMove(destinationSpot: 0 | 1 | 2): MaterialMove<PlayerColor, MaterialType, LocationType> | undefined {
    const destinationLobbySliderMaterial = this.material(MaterialType.LobbySliders)
      .player(this.player)
      .location((location) => location.x === destinationSpot && location.y !== 0)
    if (destinationLobbySliderMaterial.length === 1) {
      return destinationLobbySliderMaterial.moveItem({
        type: LocationType.LobbySliderSpotOnTopPlayerCinemaBoard,
        player: this.player,
        x: destinationSpot,
        y: 0
      })
    }
    return undefined
  }

  private getMovesForMovieAction(bonusAction: MovieAction, player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    switch (bonusAction) {
      case MovieAction.None:
        return []
      case MovieAction.AudienceTrackAdvance:
        return this.getAudienceTrackMove(player)
      case MovieAction.AdvertisingTokenOnAnyGuest:
      case MovieAction.AdvertisingTokenOnBlueGuest:
      case MovieAction.AdvertisingTokenOnGreenGuest:
      case MovieAction.AdvertisingTokenOnRedGuest:
      case MovieAction.AdvertisingTokenOnYellowGuest:
      case MovieAction.AdvertisingTokenOnWhiteGuestToBag:
        return this.getAdvertisingTokenMove(bonusAction, player)
      case MovieAction.Get1Money:
        return this.getMoneyMove(MaterialType.MoneyTokens, 1, player)
      case MovieAction.Get2Money:
        return this.getMoneyMove(MaterialType.MoneyTokens, 2, player)
      case MovieAction.Get3Money:
        return this.getMoneyMove(MaterialType.MoneyTokens, 3, player)
      case MovieAction.Get4Money:
        return this.getMoneyMove(MaterialType.MoneyTokens, 4, player)
      case MovieAction.Get1Popcorn:
        return this.getMoneyMove(MaterialType.PopcornTokens, 1, player)
      case MovieAction.Get2Popcorn:
        return this.getMoneyMove(MaterialType.PopcornTokens, 2, player)
      case MovieAction.Get3Popcorn:
        return this.getMoneyMove(MaterialType.PopcornTokens, 3, player)
      case MovieAction.Get4Popcorn:
        return this.getMoneyMove(MaterialType.PopcornTokens, 4, player)
      case MovieAction.PlaceGuestInReserve:
        return [] // TODO
      case MovieAction.PlaceExitZoneGuestInBag:
        return [this.startRule<RuleId>(RuleId.PlaceExitZoneGuestInBagRule)] // TODO
      case MovieAction.DrawGuestAndPlaceThem:
        return [] // TODO
      case MovieAction.DrawAwardCard:
        return [this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DealAndDiscardAwardCards, [this.player])]
    }
  }

  private getMoneyMove(
    moneyType: MaterialType.MoneyTokens | MaterialType.PopcornTokens,
    quantity: number,
    player: PlayerColor
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moneyValues: number[] = moneyType === MaterialType.MoneyTokens ? moneyTokens : popcornTokens
    const destinationLocationType =
      moneyType === MaterialType.MoneyTokens ? LocationType.PlayerMoneyPileSpot : LocationType.PlayerPopcornPileUnderPopcornCupSpot
    return this.material(moneyType).money(moneyValues).addMoney(quantity, {
      type: destinationLocationType,
      player: player
    })
  }

  private getAudienceTrackMove(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const audienceCube = this.material(MaterialType.AudienceCubes).player(player).getItem()
    if (audienceCube !== undefined) {
      const newCubeSpot = Math.min((audienceCube.location.x ?? 0) + 1, 8)
      if (newCubeSpot === 8) {
        this.getMoneyMove(MaterialType.PopcornTokens, 1, player)
      }
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = [
        this.material(MaterialType.AudienceCubes)
          .player(player)
          .moveItem((item) => ({
            type: LocationType.AudienceCubeSpotOnTopPlayerCinemaBoard,
            player: player,
            x: (item.location.x ?? 0) + 1
          }))
      ]
      consequences.push(...this.getAudienceBonusMove(newCubeSpot, player))
      return consequences
    }
    return []
  }

  private getAdvertisingTokenMove(
    bonusAction:
      | MovieAction.AdvertisingTokenOnYellowGuest
      | MovieAction.AdvertisingTokenOnRedGuest
      | MovieAction.AdvertisingTokenOnGreenGuest
      | MovieAction.AdvertisingTokenOnBlueGuest
      | MovieAction.AdvertisingTokenOnAnyGuest
      | MovieAction.AdvertisingTokenOnWhiteGuestToBag,
    player: PlayerColor
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const destinationLocationId = this.getAdvertisingTokenSpotFromMovieAction(bonusAction)
    const advertisingTokenMaterial = this.material(MaterialType.AdvertisingTokens).location(LocationType.PlayerAdvertisingTokenSpot).player(player)
    if (advertisingTokenMaterial.length > 0) {
      return [
        advertisingTokenMaterial.moveItem({
          type: LocationType.AdvertisingTokenSpotOnAdvertisingBoard,
          id: destinationLocationId
        })
      ]
    }
    return []
  }

  private getAdvertisingTokenSpotFromMovieAction(
    bonusAction:
      | MovieAction.AdvertisingTokenOnYellowGuest
      | MovieAction.AdvertisingTokenOnRedGuest
      | MovieAction.AdvertisingTokenOnGreenGuest
      | MovieAction.AdvertisingTokenOnBlueGuest
      | MovieAction.AdvertisingTokenOnAnyGuest
      | MovieAction.AdvertisingTokenOnWhiteGuestToBag
  ): AdvertisingTokenSpot {
    switch (bonusAction) {
      case MovieAction.AdvertisingTokenOnBlueGuest:
        return AdvertisingTokenSpot.BlueGuestPawn
      case MovieAction.AdvertisingTokenOnGreenGuest:
        return AdvertisingTokenSpot.GreenGuestPawn
      case MovieAction.AdvertisingTokenOnRedGuest:
        return AdvertisingTokenSpot.RedGuestPawn
      case MovieAction.AdvertisingTokenOnYellowGuest:
        return AdvertisingTokenSpot.RedGuestPawn
      case MovieAction.AdvertisingTokenOnAnyGuest:
        return AdvertisingTokenSpot.AnyGuestPawn
      case MovieAction.AdvertisingTokenOnWhiteGuestToBag:
        return AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag
    }
  }

  private getAudienceBonusMove(newCubeSpot: number, player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    switch (newCubeSpot) {
      case 2:
        return this.getMoneyMove(MaterialType.MoneyTokens, 2, player)
      case 4:
        return this.getMoneyMove(MaterialType.MoneyTokens, 3, player)
      case 6:
        return [] // TODO
      case 7:
        return this.getMoneyMove(MaterialType.PopcornTokens, 3, player)
      default:
        return []
    }
  }
}
