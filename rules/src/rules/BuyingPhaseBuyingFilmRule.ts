import { CustomMove, Location, MaterialMove, MoveItem, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { BuyMovieCardCustomMoveData, CustomMoveType, isBuyMovieCardCustomMove } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { moneyTokens } from '../material/MoneyToken'
import { movieCardCharacteristics, MovieCardId } from '../material/MovieCard'
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

  private mapMovieCardMoveToCustomMove(move: MoveItem<PlayerColor, MaterialType, LocationType>): CustomMove {
    const moveData: BuyMovieCardCustomMoveData = {
      move: move
    }
    const previousMovieCardMaterial = this.material(MaterialType.MovieCards).location(
      (location) => location.type === LocationType.MovieCardSpotOnBottomPlayerCinemaBoard && location.player === this.player && location.x === move.location.x
    )
    if (previousMovieCardMaterial.length === 1) {
      moveData.previousMovieIndex = previousMovieCardMaterial.getIndex()
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
      .id<MovieCardId>((id) => id.front !== undefined && movieCardCharacteristics[id.front].getPrice(row) <= playerMoney)
      .moveItems(destination)
  }

  public onCustomMove(move: CustomMove<CustomMoveType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isBuyMovieCardCustomMove(move)) {
      const memory = this.remind<PlayerActionMemory>(Memorize.PlayerActions, this.player)
      memory[RuleId.BuyingPhaseRule].filmBought = true
      this.memorize<PlayerActionMemory>(Memorize.PlayerActions, memory, this.player)
      const movieCardMove = move.data.move
      const boughtCard = this.material(MaterialType.MovieCards).index(movieCardMove.itemIndex).getItem<MovieCardId>()
      if (
        boughtCard?.id.front === undefined ||
        (boughtCard.location.type !== LocationType.PremiersRowSpot && boughtCard.location.type !== LocationType.FeaturesRowSpot)
      ) {
        throw new Error('Trying to move an invalid card')
      }
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
      if (move.data.previousMovieIndex !== undefined) {
        consequences.push(
          this.material(MaterialType.MovieCards).index(move.data.previousMovieIndex).moveItem({
            type: LocationType.PlayerMovieCardArchiveSpot,
            player: this.player
          })
        )
      }
      const cardPrice = movieCardCharacteristics[boughtCard.id.front].getPrice(boughtCard.location.type)
      consequences.push(
        ...this.material(MaterialType.MoneyTokens).money(moneyTokens).removeMoney(cardPrice, {
          type: LocationType.PlayerMoneyPileSpot,
          player: this.player
        }),
        movieCardMove
      )
      const destinationLobbySliderMaterial = this.material(MaterialType.LobbySliders)
        .player(this.player)
        .location((location) => location.x === movieCardMove.location.x && location.y !== 0)
      if (destinationLobbySliderMaterial.length === 1) {
        consequences.push(
          destinationLobbySliderMaterial.moveItem({
            type: LocationType.LobbySliderSpotOnTopPlayerCinemaBoard,
            player: this.player,
            x: movieCardMove.location.x,
            y: 0
          })
        )
      }
      return consequences
    }
    return []
  }
}
