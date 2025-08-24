import {
  CustomMove,
  EndPlayerTurn,
  isMoveItem,
  isMoveItemsAtOnce,
  isSelectItem,
  isShuffleItemType,
  ItemMove,
  MaterialMove,
  PlayMoveContext,
  RuleMove,
  RuleStep,
  SimultaneousRule
} from '@gamepark/rules-api'
import { Actions } from '../material/Actions/Actions'
import { ActionType } from '../material/Actions/ActionType'
import { CustomMoveType } from '../material/CustomMoveType'
import { GuestPawn } from '../material/GuestPawn'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from '../Memory'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { getActionRule } from './utils/GetActionRule'

export class ShowingsPhaseRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    this.game.players.forEach((player) => {
      const numberOfTheaterTilesToActivate = this.material(MaterialType.MovieCards)
        .player(player)
        .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard).length
      this.memorize<Actions[]>(
        Memory.PendingActions,
        [{ type: ActionType.PlaceGuests } as Actions].concat(Array(numberOfTheaterTilesToActivate).fill({ type: ActionType.PickTheaterTileToActivate })),
        player
      )
    })
    return this.game.players.flatMap((player) => {
      const theoreticalNumberOfGuestsToDraw = this.getNumberOfGuestsToDraw(player)
      const playerGuestInBagMaterial = this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(player)
      const numberOfGuestsToDraw = Math.min(playerGuestInBagMaterial.length, theoreticalNumberOfGuestsToDraw)
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = [
        playerGuestInBagMaterial.deck().dealAtOnce(
          {
            type: LocationType.PlayerShowingsDrawnGuestSpot,
            player: player
          },
          numberOfGuestsToDraw
        )
      ]
      if (theoreticalNumberOfGuestsToDraw > playerGuestInBagMaterial.length) {
        const exitGuestDeck = this.material(MaterialType.GuestPawns).location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard).player(player).deck()
        consequences.push(
          exitGuestDeck.moveItemsAtOnce({
            type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
            player: player
          }),
          exitGuestDeck.shuffle()
        )
      }
      return consequences
    })
  }

  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const pendingAction = this.remind<Actions[]>(Memory.PendingActions, player)[0]
    const subRule = getActionRule(pendingAction, this)
    return subRule.getActivePlayerLegalMoves(player)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return [this.endGame()]
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (isShuffleItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move)) {
      const guestPawns = this.material(MaterialType.GuestPawns)
        .index((guestIndex) => move.indexes.includes(guestIndex))
        .getItems<GuestPawn>()
      const players = guestPawns.map((guestPawn) => guestPawn.location.player)
      const player = players.every((p) => p === players[0]) ? players[0] : undefined
      if (player === undefined) {
        throw new Error('Undefined played after shuffle')
      }
      const pendingAction = this.remind<Actions[]>(Memory.PendingActions, player)[0]
      if (pendingAction.type === ActionType.PlaceGuests) {
        const numberOfRemainingGuestToDraw =
          this.getNumberOfGuestsToDraw(player) -
          this.material(MaterialType.GuestPawns).location(LocationType.PlayerShowingsDrawnGuestSpot).player(player).length
        return [
          this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(player).deck().dealAtOnce(
            {
              type: LocationType.PlayerShowingsDrawnGuestSpot,
              player: player
            },
            numberOfRemainingGuestToDraw
          )
        ]
      }
    }
    const player = this.getPlayerFromMove(move)
    if (player === undefined) {
      return super.afterItemMove(move, context)
    }
    const pendingAction = this.remind<Actions[]>(Memory.PendingActions, player)[0]
    const subRule = getActionRule(pendingAction, this)
    return subRule.afterItemMove(move, context)
  }

  public onCustomMove(move: CustomMove<CustomMoveType>, context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const player = this.getPlayerFromCustomMove(move)
    if (player === undefined) {
      return super.onCustomMove(move, context)
    }
    const pendingAction = this.remind<Actions[]>(Memory.PendingActions, player)[0]
    const subRule = getActionRule(pendingAction, this)
    return subRule.onCustomMove(move, context)
  }

  public onPlayerTurnEnd(move: EndPlayerTurn<PlayerColor>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const player = move.player
    return [
      this.material(MaterialType.GuestPawns).player(player).location(LocationType.GuestPawnSpotOnTheaterTile).moveItemsAtOnce({
        type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
        player: player
      })
    ]
  }

  private getNumberOfGuestsToDraw(player: PlayerColor): number {
    const audienceCubeLocation = this.material(MaterialType.AudienceCubes).player(player).getItems()[0].location
    switch (audienceCubeLocation.x ?? 0) {
      case 0:
        return 3
      case 1:
      case 2:
        return 4
      case 3:
      case 4:
        return 5
      case 5:
      case 6:
      case 7:
        return 6
      case 8:
        return 7
      default:
        throw new Error('Invalid audience cube spot')
    }
  }

  private getPlayerFromMove(move: ItemMove<PlayerColor, MaterialType, LocationType>): PlayerColor | undefined {
    if (isMoveItem<PlayerColor, MaterialType, LocationType>(move) || isMoveItemsAtOnce<PlayerColor, MaterialType, LocationType>(move)) {
      return move.location.player
    }
    if (isSelectItem<PlayerColor, MaterialType, LocationType>(move)) {
      const item = this.material(move.itemType).index(move.itemIndex).getItem()
      if (item === undefined) {
        throw new Error('Invalid item being moved')
      }
      return item.location.player
    }
    return undefined
  }

  private getPlayerFromCustomMove(move: CustomMove<CustomMoveType>): PlayerColor | undefined {
    if ('player' in move.data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return move.data.player as PlayerColor
    }
    return undefined
  }
}
