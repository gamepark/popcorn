import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { moneyTokens } from '../material/MoneyToken'
import { getPrice, MovieCardId } from '../material/MovieCard'
import { PlayerColor } from '../PlayerColor'

export class BuyingPhaseBuyingFilm extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const destinations = [
      {
        type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
        player: this.player,
        x: 0
      },
      {
        type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
        player: this.player,
        x: 1
      }
    ]
    if (
      this.material(MaterialType.TheaterTiles)
        .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
        .player(this.player)
        .location((location) => location.x === 2).length !== 0
    ) {
      destinations.push({
        type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
        player: this.player,
        x: 2
      })
    }
    const playerMoney = this.material(MaterialType.MoneyTokens).location(LocationType.PlayerMoneyPileSpot).player(this.player).money(moneyTokens).count
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
    )
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.MovieCards)(move) &&
      move.location.player === this.player &&
      move.location.type === LocationType.MovieCardSpotOnBottomPlayerCinemaBoard
    ) {
      const card = this.material(MaterialType.MovieCards).index(move.itemIndex).getItem<MovieCardId>()
      if (card?.id.front === undefined) {
        throw new Error('Trying to move a non-existent card')
      }
      const cardPrice = getPrice(card.id.front) + (card.location.type === LocationType.PremiersRowSpot ? 2 : 0)
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = this.material(MaterialType.MoneyTokens)
        .location(LocationType.PlayerMoneyPileSpot)
        .player(this.player)
        .money(moneyTokens)
        .removeMoney(cardPrice, {
          type: LocationType.PlayerMoneyPileSpot,
          player: this.player
        })
      const previousMovieCardMaterial = this.material(MaterialType.MovieCards).location(
        (location) => location.type === LocationType.MovieCardSpotOnBottomPlayerCinemaBoard && location.player === this.player && location.x === move.location.x
      )
      if (previousMovieCardMaterial.length !== 0) {
        consequences.push(
          previousMovieCardMaterial.moveItem({
            type: LocationType.PlayerMovieCardArchiveSpot,
            player: this.player
          })
        )
      }
      return consequences
    }
    return []
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.MovieCards)(move) &&
      move.location.player === this.player &&
      move.location.type === LocationType.MovieCardSpotOnBottomPlayerCinemaBoard
    ) {
      return [
        this.material(MaterialType.LobbySliders)
          .player(this.player)
          .location((location) => location.x === move.location.x)
          .moveItem({
            type: LocationType.LobbySliderSpotOnTopPlayerCinemaBoard,
            player: this.player,
            x: move.location.x,
            y: 0
          })
      ]
    }
    return []
  }
}
