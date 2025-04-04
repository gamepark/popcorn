import { CustomMove, Location, MaterialItem, MaterialMove, MaterialRulesPart, MoveItem, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { AdvertisingTokenSpot } from '../material/AdvertisingTokenSpot'
import { BuyMovieCardCustomMoveData, CustomMoveType, isBuyMovieCardCustomMove } from '../material/CustomMoveType'
import { GuestPawn } from '../material/GuestPawn'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { moneyTokens } from '../material/MoneyToken'
import { MovieAction, MovieCard, movieCardCharacteristics, MovieCardId, MovieColor } from '../material/MovieCard'
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
      const boughtCardMaterial = this.material(MaterialType.MovieCards).index(move.data.boughtCardIndex)
      const boughtCard = boughtCardMaterial.getItem<MovieCardId>() as MaterialItem<PlayerColor, LocationType, Required<MovieCardId>>
      if (boughtCard.id.front === MovieCard.FinalShowing) {
        throw new Error('Final showing cannot be bought')
      }
      if (boughtCard.location.type === LocationType.PremiersRowSpot) {
        memory[RuleId.BuyingPhaseRule].buyingCardCustomMoveData = move.data
        this.memorize<PlayerActionMemory>(Memorize.PlayerActions, memory, this.player)
        const guestPawn = BuyingPhaseBuyingFilmRule.getGuestPawnColorFromMovieId(boughtCard.id.front)
        this.memorize<GuestPawn>(Memorize.GuestPawnColorToDraw, guestPawn, this.player)
        return [this.startRule<RuleId>(RuleId.PickGuestFromReserveOrExitZoneRule)]
      }
      this.memorize<PlayerActionMemory>(Memorize.PlayerActions, memory, this.player)
      return BuyingPhaseBuyingFilmRule.getBuyingFilmCardConsequences(this, this.player, boughtCard, move.data.destinationSpot)
    }
    return []
  }

  public static getBuyingFilmCardConsequences(
    rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
    player: PlayerColor,
    boughtCard: MaterialItem<PlayerColor, LocationType, Required<MovieCardId>>,
    destinationSpot: 0 | 1 | 2
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      boughtCard.id.front === MovieCard.FinalShowing ||
      (boughtCard.location.type !== LocationType.PremiersRowSpot && boughtCard.location.type !== LocationType.FeaturesRowSpot)
    ) {
      throw new Error('Trying to move an invalid card')
    }
    const boughtCardMaterial = rule.material(MaterialType.MovieCards).id(boughtCard.id)
    const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    const sliderMove = BuyingPhaseBuyingFilmRule.getSliderMove(rule, player, destinationSpot)
    if (sliderMove !== undefined) {
      consequences.push(sliderMove)
    }
    const previousMovieCardMaterial = rule
      .material(MaterialType.MovieCards)
      .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
      .player(player)
      .location((location) => location.x === destinationSpot)
    if (previousMovieCardMaterial.length === 1) {
      consequences.push(
        previousMovieCardMaterial.moveItem({
          type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
          player: player,
          x: destinationSpot,
          y: 1
        }),
        previousMovieCardMaterial.moveItem({
          type: LocationType.PlayerMovieCardArchiveSpot
        })
      )
    }
    consequences.push(
      ...BuyingPhaseBuyingFilmRule.getMoneyTokensMoves(rule, boughtCard, player),
      boughtCardMaterial.moveItem({
        type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
        player: player,
        x: destinationSpot,
        y: 1
      }),
      boughtCardMaterial.moveItem({
        type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
        player: player,
        x: destinationSpot,
        y: 0
      })
    )
    const theaterTile = rule
      .material(MaterialType.TheaterTiles)
      .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
      .player(player)
      .location((location) => location.x === destinationSpot)
      .getItem<TheaterTileId>()
    if (theaterTile?.id.front === undefined) {
      throw new Error('Cannot have an empty tile')
    }
    const movieCharacteristics = movieCardCharacteristics[boughtCard.id.front]
    const bonusAction = movieCharacteristics.getBonusAction(theaterTile.id.front)
    if (bonusAction !== undefined) {
      consequences.push(...BuyingPhaseBuyingFilmRule.getMovesForMovieAction(rule, player, bonusAction))
    }
    return consequences
  }

  private static getMoneyTokensMoves(
    rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
    boughtCard: MaterialItem<PlayerColor, LocationType, MovieCardId>,
    player: PlayerColor
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      boughtCard.id.front === undefined ||
      boughtCard.id.front === MovieCard.FinalShowing ||
      (boughtCard.location.type !== LocationType.FeaturesRowSpot && boughtCard.location.type !== LocationType.PremiersRowSpot)
    ) {
      throw new Error('Trying to move an invalid card')
    }
    const cardPrice = movieCardCharacteristics[boughtCard.id.front].getPrice(boughtCard.location.type)
    return rule.material(MaterialType.MoneyTokens).money(moneyTokens).removeMoney(cardPrice, {
      type: LocationType.PlayerMoneyPileSpot,
      player: player
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

  private static getSliderMove(
    rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
    player: PlayerColor,
    destinationSpot: 0 | 1 | 2
  ): MaterialMove<PlayerColor, MaterialType, LocationType> | undefined {
    const destinationLobbySliderMaterial = rule
      .material(MaterialType.LobbySliders)
      .player(player)
      .location((location) => location.x === destinationSpot && location.y !== 0)
    if (destinationLobbySliderMaterial.length === 1) {
      return destinationLobbySliderMaterial.moveItem({
        type: LocationType.LobbySliderSpotOnTopPlayerCinemaBoard,
        player: player,
        x: destinationSpot,
        y: 0
      })
    }
    return undefined
  }

  private static getMovesForMovieAction(
    rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
    player: PlayerColor,
    bonusAction: MovieAction
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    switch (bonusAction) {
      case MovieAction.None:
        return []
      case MovieAction.AudienceTrackAdvance:
        return BuyingPhaseBuyingFilmRule.getAudienceTrackMove(rule, player)
      case MovieAction.AdvertisingTokenOnAnyGuest:
      case MovieAction.AdvertisingTokenOnBlueGuest:
      case MovieAction.AdvertisingTokenOnGreenGuest:
      case MovieAction.AdvertisingTokenOnRedGuest:
      case MovieAction.AdvertisingTokenOnYellowGuest:
      case MovieAction.AdvertisingTokenOnWhiteGuestToBag:
        return BuyingPhaseBuyingFilmRule.getAdvertisingTokenMove(rule, player, bonusAction)
      case MovieAction.Get1Money:
        return BuyingPhaseBuyingFilmRule.getMoneyMove(rule, player, MaterialType.MoneyTokens, 1)
      case MovieAction.Get2Money:
        return BuyingPhaseBuyingFilmRule.getMoneyMove(rule, player, MaterialType.MoneyTokens, 2)
      case MovieAction.Get3Money:
        return BuyingPhaseBuyingFilmRule.getMoneyMove(rule, player, MaterialType.MoneyTokens, 3)
      case MovieAction.Get4Money:
        return BuyingPhaseBuyingFilmRule.getMoneyMove(rule, player, MaterialType.MoneyTokens, 4)
      case MovieAction.Get1Popcorn:
        return BuyingPhaseBuyingFilmRule.getMoneyMove(rule, player, MaterialType.PopcornTokens, 1)
      case MovieAction.Get2Popcorn:
        return BuyingPhaseBuyingFilmRule.getMoneyMove(rule, player, MaterialType.PopcornTokens, 2)
      case MovieAction.Get3Popcorn:
        return BuyingPhaseBuyingFilmRule.getMoneyMove(rule, player, MaterialType.PopcornTokens, 3)
      case MovieAction.Get4Popcorn:
        return BuyingPhaseBuyingFilmRule.getMoneyMove(rule, player, MaterialType.PopcornTokens, 4)
      case MovieAction.PlaceGuestInReserve:
        return [rule.startRule(RuleId.PickPlayerGuestAndPlaceItInReserveRule)]
      case MovieAction.PlaceExitZoneGuestInBag:
        return [rule.startRule<RuleId>(RuleId.PlaceExitZoneGuestInBagRule)]
      case MovieAction.DrawGuestAndPlaceThem:
        return [] // TODO
      case MovieAction.DrawAwardCard:
        return [rule.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DealAndDiscardAwardCards, [player])]
    }
  }

  private static getMoneyMove(
    rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
    player: PlayerColor,
    moneyType: MaterialType.MoneyTokens | MaterialType.PopcornTokens,
    quantity: number
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moneyValues: number[] = moneyType === MaterialType.MoneyTokens ? moneyTokens : popcornTokens
    const destinationLocationType =
      moneyType === MaterialType.MoneyTokens ? LocationType.PlayerMoneyPileSpot : LocationType.PlayerPopcornPileUnderPopcornCupSpot
    return rule.material(moneyType).money(moneyValues).addMoney(quantity, {
      type: destinationLocationType,
      player: player
    })
  }

  private static getAudienceTrackMove(
    rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
    player: PlayerColor
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const audienceCube = rule.material(MaterialType.AudienceCubes).player(player).getItem()
    if (audienceCube !== undefined) {
      const newCubeSpot = Math.min((audienceCube.location.x ?? 0) + 1, 8)
      if (newCubeSpot === 8) {
        BuyingPhaseBuyingFilmRule.getMoneyMove(rule, player, MaterialType.PopcornTokens, 1)
      }
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = [
        rule
          .material(MaterialType.AudienceCubes)
          .player(player)
          .moveItem((item) => ({
            type: LocationType.AudienceCubeSpotOnTopPlayerCinemaBoard,
            player: player,
            x: (item.location.x ?? 0) + 1
          }))
      ]
      consequences.push(...BuyingPhaseBuyingFilmRule.getAudienceBonusMove(rule, player, newCubeSpot))
      return consequences
    }
    return []
  }

  private static getAdvertisingTokenMove(
    rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
    player: PlayerColor,
    bonusAction:
      | MovieAction.AdvertisingTokenOnYellowGuest
      | MovieAction.AdvertisingTokenOnRedGuest
      | MovieAction.AdvertisingTokenOnGreenGuest
      | MovieAction.AdvertisingTokenOnBlueGuest
      | MovieAction.AdvertisingTokenOnAnyGuest
      | MovieAction.AdvertisingTokenOnWhiteGuestToBag
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const destinationLocationId = BuyingPhaseBuyingFilmRule.getAdvertisingTokenSpotFromMovieAction(bonusAction)
    const advertisingTokenMaterial = rule.material(MaterialType.AdvertisingTokens).location(LocationType.PlayerAdvertisingTokenSpot).player(player)
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

  private static getAdvertisingTokenSpotFromMovieAction(
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

  private static getAudienceBonusMove(
    rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
    player: PlayerColor,
    newCubeSpot: number
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    switch (newCubeSpot) {
      case 2:
        return BuyingPhaseBuyingFilmRule.getMoneyMove(rule, player, MaterialType.MoneyTokens, 2)
      case 4:
        return BuyingPhaseBuyingFilmRule.getMoneyMove(rule, player, MaterialType.MoneyTokens, 3)
      case 6:
        return [] // TODO
      case 7:
        return BuyingPhaseBuyingFilmRule.getMoneyMove(rule, player, MaterialType.PopcornTokens, 3)
      default:
        return []
    }
  }

  private static getGuestPawnColorFromMovieId(front: Exclude<MovieCard, MovieCard.FinalShowing>): GuestPawn {
    switch (movieCardCharacteristics[front].getColor()) {
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
}
