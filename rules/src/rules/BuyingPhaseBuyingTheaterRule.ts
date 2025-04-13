import { CustomMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { CustomMoveType, isBuyTheaterTileCustomMove } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MoneyToken, moneyTokens } from '../material/MoneyToken'
import { SeatsNumber, TheaterTileId, theaterTilesCharacteristics } from '../material/TheaterTile'
import { Memorize, PlayerActionMemory } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { addNextRuleMoveToConsequenceIfNecessary } from './utils/BuyingFilmConsequencesHelper'

const availableLocationTypes = [LocationType.OneSeatTheaterTileRowSpot, LocationType.TwoSeatTheaterTileRowSpot, LocationType.ThreeSeatTheaterTileRowSpot]

export class BuyingPhaseBuyingTheaterRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moves = super.getPlayerMoves()
    if (!this.remind<PlayerActionMemory>(Memorize.PlayerActions, this.player)[RuleId.BuyingPhaseRule].theaterTileBought) {
      const playerMoney = this.material(MaterialType.MoneyTokens).money<MoneyToken>(moneyTokens).location(LocationType.PlayerMoneyPileSpot).count
      moves.push(
        ...Array(3)
          .fill(1)
          .flatMap((_, index) =>
            this.material(MaterialType.TheaterTiles)
              .location((location) => availableLocationTypes.includes(location.type))
              .id<TheaterTileId>((id) => id.front !== undefined && theaterTilesCharacteristics[id.front].getPrice() <= playerMoney)
              .moveItems({
                type: LocationType.TheaterTileSpotOnTopPlayerCinemaBoard,
                x: index
              })
              .map((move) =>
                this.customMove<CustomMoveType>(CustomMoveType.BuyTheaterTile, {
                  player: this.player,
                  boughtTileIndex: move.itemIndex,
                  destinationSpot: move.location.x
                })
              )
          )
      )
    }
    return moves
  }

  public onCustomMove(move: CustomMove, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isBuyTheaterTileCustomMove(move)) {
      const moveData = move.data
      const boughtTileMaterial = this.material(MaterialType.TheaterTiles).index(moveData.boughtTileIndex)
      const boughtTile = boughtTileMaterial.getItem<Required<TheaterTileId>>()
      if (boughtTile === undefined) {
        throw new Error('Invalid move')
      }
      const boughTileCharacteristics = theaterTilesCharacteristics[boughtTile.id.front]
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = this.material(MaterialType.MoneyTokens)
        .money<MoneyToken>(moneyTokens)
        .removeMoney(boughTileCharacteristics.getPrice(), {
          type: LocationType.PlayerMoneyPileSpot,
          player: this.player
        })
      const previousTileMaterial = this.material(MaterialType.TheaterTiles)
        .player(this.player)
        .location((location) => location.type === LocationType.TheaterTileSpotOnTopPlayerCinemaBoard && location.x === moveData.destinationSpot)
      if (previousTileMaterial.length === 1) {
        const previousTile = previousTileMaterial.getItem<Required<TheaterTileId>>()
        if (previousTile === undefined) {
          throw new Error('Invalid material given')
        }
        const previousTileCharacteristics = theaterTilesCharacteristics[previousTile.id.front]
        consequences.push(
          previousTileCharacteristics.getSeatsNumber() !== SeatsNumber.Default
            ? previousTileMaterial.moveItem((item) => ({
                type: this.getDestinationLocationTypeFromTheaterTileId(item.id as Required<TheaterTileId>),
                x: 0
              }))
            : previousTileMaterial.deleteItem()
        )
      }
      consequences.push(
        boughtTileMaterial.moveItem({
          type: LocationType.TheaterTileSpotOnTopPlayerCinemaBoard,
          player: moveData.player,
          x: moveData.destinationSpot
        })
      )
      this.memorize<PlayerActionMemory>(
        Memorize.PlayerActions,
        (memory) => {
          memory[RuleId.BuyingPhaseRule].theaterTileBought = true
          return memory
        },
        this.player
      )
      addNextRuleMoveToConsequenceIfNecessary(this, this.player, consequences)
      return consequences
    }
    return super.onCustomMove(move, _context)
  }

  private getDestinationLocationTypeFromTheaterTileId(id: Required<TheaterTileId>): LocationType {
    const characteristics = theaterTilesCharacteristics[id.front]
    switch (characteristics.getSeatsNumber()) {
      case SeatsNumber.Two:
        return LocationType.TwoSeatTheaterTileDeckSpot
      case SeatsNumber.Three:
        return LocationType.ThreeSeatTheaterTileDeckSpot
      case SeatsNumber.One:
        return LocationType.OneSeatTheaterTileDeckSpot
      default:
        throw new Error("Invalid seats number, default tiles shouldn't be moved, they should be destroyed")
    }
  }
}
