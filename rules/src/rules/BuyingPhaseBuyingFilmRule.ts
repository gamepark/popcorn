import { CustomMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { BuyMovieCardCustomMoveData, CustomMoveType, isBuyMovieCardCustomMove } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { moneyTokens } from '../material/MoneyToken'
import { getPrice, MovieCardId } from '../material/MovieCard'
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
      this.material(MaterialType.MovieCards)
        .location(LocationType.FeaturesRowSpot)
        .id<MovieCardId>((id) => id.front !== undefined && getPrice(id.front) <= playerMoney)
        .moveItems(destination)
        .concat(
          this.material(MaterialType.MovieCards)
            .location(LocationType.PremiersRowSpot)
            .id<MovieCardId>((id) => id.front !== undefined && getPrice(id.front) + 2 < playerMoney)
            .moveItems(destination)
        )
        .map((move) => {
          const moveData: BuyMovieCardCustomMoveData = {
            move: move
          }
          const previousMovieCardMaterial = this.material(MaterialType.MovieCards).location(
            (location) =>
              location.type === LocationType.MovieCardSpotOnBottomPlayerCinemaBoard && location.player === this.player && location.x === move.location.x
          )
          if (previousMovieCardMaterial.length === 1) {
            moveData.previousMovieIndex = previousMovieCardMaterial.getIndex()
          }
          return this.customMove<CustomMoveType>(CustomMoveType.BuyMovieCard, moveData)
        })
    )
  }

  public onCustomMove(move: CustomMove<CustomMoveType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isBuyMovieCardCustomMove(move)) {
      const memory = this.remind<PlayerActionMemory>(Memorize.PlayerActions, this.player)
      memory[RuleId.BuyingPhaseRule].filmBought = true
      this.memorize<PlayerActionMemory>(Memorize.PlayerActions, memory, this.player)
      const movieCardMove = move.data.move
      const boughtCard = this.material(MaterialType.MovieCards).index(movieCardMove.itemIndex).getItem<MovieCardId>()
      if (boughtCard?.id.front === undefined) {
        throw new Error('Trying to move a non-existent card')
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
      const cardPrice = getPrice(boughtCard.id.front) + (boughtCard.location.type === LocationType.PremiersRowSpot ? 2 : 0)
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
