import { CustomMove, Location, MaterialItem, MaterialMove, MoveItem, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { AdvertisingTokenSpot } from '../material/AdvertisingTokenSpot'
import { BuyMovieCardCustomMoveData, CustomMoveType, isBuyMovieCardCustomMove } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { moneyTokens } from '../material/MoneyToken'
import { MovieCard, movieCardCharacteristics, MovieCardId, MovieColor } from '../material/MovieCard'
import { Memorize, PlayerActionMemory } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { getBuyingFilmCardConsequences } from './utils/BuyingFilmConsequencesHelper'

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
        this.memorize<AdvertisingTokenSpot>(Memorize.GuestPawnColorToDraw, guestPawn, this.player)
        return [this.startRule<RuleId>(RuleId.PickGuestFromReserveOrExitZoneRule)]
      }
      this.memorize<PlayerActionMemory>(Memorize.PlayerActions, memory, this.player)
      return getBuyingFilmCardConsequences(this, this.player, boughtCard, move.data.destinationSpot)
    }
    return []
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

  private static getGuestPawnColorFromMovieId(front: Exclude<MovieCard, MovieCard.FinalShowing>): AdvertisingTokenSpot {
    switch (movieCardCharacteristics[front].getColor()) {
      case MovieColor.Blue:
        return AdvertisingTokenSpot.BlueGuestPawn
      case MovieColor.Green:
        return AdvertisingTokenSpot.GreenGuestPawn
      case MovieColor.Red:
        return AdvertisingTokenSpot.RedGuestPawn
      case MovieColor.Yellow:
        return AdvertisingTokenSpot.YellowGuestPawn
    }
  }
}
