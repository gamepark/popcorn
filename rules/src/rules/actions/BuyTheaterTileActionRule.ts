import { CustomMove, MaterialItem, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { range } from 'es-toolkit'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { BuyTheaterTileAction } from '../../material/Actions/BuyTheaterTileAction'
import { BuyTheaterTileCustomMove, BuyTheaterTileCustomMoveData, CustomMoveType, isBuyTheaterTileCustomMove } from '../../material/CustomMoveType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MoneyToken, moneyTokens } from '../../material/MoneyToken'
import { BuyableTheaterTileId, SeatsNumber, TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { getAudienceTrackMove } from './utils/movieOrSeatActionConsequences.util'
import { ActionRule } from './ActionRule'

const availableLocationTypes = [LocationType.OneSeatTheaterTileRowSpot, LocationType.TwoSeatTheaterTileRowSpot, LocationType.ThreeSeatTheaterTileRowSpot]

export class BuyTheaterTileActionRule extends ActionRule<BuyTheaterTileAction> {
  public consequencesBeforeRuleForPlayer(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const playerMoney = this.material(MaterialType.MoneyTokens).money<MoneyToken>(moneyTokens).location(LocationType.PlayerMoneyPileSpot).count
    return range(0, 3).flatMap((index) =>
      this.material(MaterialType.TheaterTiles)
        .location((location) => availableLocationTypes.includes(location.type))
        .id<Required<BuyableTheaterTileId>>((id) => theaterTilesCharacteristics[id.front].getPrice() <= playerMoney)
        .moveItems({
          type: LocationType.TheaterTileSpotOnTopPlayerCinemaBoard,
          x: index
        })
        .map((move) =>
          this.customMove<CustomMoveType>(CustomMoveType.BuyTheaterTile, {
            player: player,
            boughtTileIndex: move.itemIndex,
            destinationSpot: move.location.x
          })
        )
    )
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public onCustomMove(move: CustomMove, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isBuyTheaterTileCustomMove(move)) {
      return this.getConsequencesForTileBoughtMove(move)
    }
    return super.onCustomMove(move, _context)
  }

  private getConsequencesForTileBoughtMove(move: BuyTheaterTileCustomMove): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moveData = move.data
    const player = moveData.player
    const boughtTileMaterial = this.material(MaterialType.TheaterTiles).index(moveData.boughtTileIndex)
    const boughtTile = boughtTileMaterial.getItem<Required<BuyableTheaterTileId>>()
    if (boughtTile === undefined) {
      throw new Error('Invalid move')
    }
    const boughTileCharacteristics = theaterTilesCharacteristics[boughtTile.id.front]
    const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = (
      this.material(MaterialType.MoneyTokens).money<MoneyToken>(moneyTokens).removeMoney(boughTileCharacteristics.getPrice(), {
        type: LocationType.PlayerMoneyPileSpot,
        player: player
      }) as MaterialMove<PlayerColor, MaterialType, LocationType>[]
    )
      .concat(this.getPreviousTileConsequences(moveData))
      .concat(
        boughtTileMaterial.moveItem({
          type: LocationType.TheaterTileSpotOnTopPlayerCinemaBoard,
          player: player,
          x: moveData.destinationSpot
        })
      )
      .concat(this.addNewTHeaterTileConsequence(boughtTile))
    this.removeCurrentActionForPlayer(player)
    return consequences
  }

  private addNewTHeaterTileConsequence(
    boughtTile: MaterialItem<PlayerColor, LocationType, BuyableTheaterTileId>
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const originatingDeckLocationType = this.getOriginatingDeckFromTheaterTile(boughtTile)
    const originatingDeckMaterial = this.material(MaterialType.TheaterTiles).location(originatingDeckLocationType).deck()
    if (originatingDeckMaterial.length > 0) {
      return [
        originatingDeckMaterial.dealOne({
          type: boughtTile.location.type
        })
      ]
    }
    return []
  }

  private getPreviousTileConsequences(moveData: BuyTheaterTileCustomMoveData): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const previousTileMaterial = this.material(MaterialType.TheaterTiles)
      .player(moveData.player)
      .location((location) => location.type === LocationType.TheaterTileSpotOnTopPlayerCinemaBoard && location.x === moveData.destinationSpot)
    if (previousTileMaterial.length === 1) {
      const previousTile = previousTileMaterial.getItem<Required<TheaterTileId>>()
      if (previousTile === undefined) {
        throw new Error('Invalid material given')
      }
      return [
        previousTile.id.back !== SeatsNumber.Default
          ? previousTileMaterial.moveItem<Required<BuyableTheaterTileId>, never, never>((item) => ({
              type: this.getDestinationLocationTypeFromTheaterTileId(item.id),
              x: 0
            }))
          : previousTileMaterial.deleteItem()
      ]
    } else if (moveData.destinationSpot === 2 && previousTileMaterial.length === 0) {
      return getAudienceTrackMove(this, moveData.player)
    }
    return []
  }

  private getDestinationLocationTypeFromTheaterTileId(id: Required<BuyableTheaterTileId>): LocationType {
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

  protected override removeCurrentActionForPlayer(player: PlayerColor): void {
    this.memorize<Actions[]>(Memory.PendingActions, (pendingActions) => pendingActions.filter((action) => action.type !== ActionType.BuyTheaterTile), player)
  }

  private getOriginatingDeckFromTheaterTile(
    boughtTile: MaterialItem<PlayerColor, LocationType, BuyableTheaterTileId>
  ): LocationType.OneSeatTheaterTileDeckSpot | LocationType.TwoSeatTheaterTileDeckSpot | LocationType.ThreeSeatTheaterTileDeckSpot {
    switch (boughtTile.location.type) {
      case LocationType.OneSeatTheaterTileRowSpot:
        return LocationType.OneSeatTheaterTileDeckSpot
      case LocationType.TwoSeatTheaterTileRowSpot:
        return LocationType.TwoSeatTheaterTileDeckSpot
      case LocationType.ThreeSeatTheaterTileRowSpot:
        return LocationType.ThreeSeatTheaterTileDeckSpot
      default:
        throw new Error('Invalid boughtTile.location.type')
    }
  }
}
