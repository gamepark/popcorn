import {
  CustomMove,
  EndPlayerTurn,
  isMoveItem,
  isMoveItemsAtOnce,
  isMoveItemType,
  isSelectItem,
  isShuffleItemType,
  ItemMove,
  MaterialMove,
  PlayMoveContext,
  RuleMove,
  RuleStep,
  SimultaneousRule
} from '@gamepark/rules-api'
import { uniq } from 'lodash'
import { Actions } from '../material/Actions/Actions'
import { ActionType } from '../material/Actions/ActionType'
import { CustomMoveType, isMovieActionCustomMove, isPassCurrentActionCustomMove } from '../material/CustomMoveType'
import { GuestPawn } from '../material/GuestPawn'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from '../Memory'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { getActionRule } from './utils/getActionRule.util'

export class ShowingsPhaseRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    this.game.players.forEach((player) => this.memorize<Actions[]>(Memory.PendingActions, [{ type: ActionType.PlaceGuests } as Actions], player))
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
    const pendingActions = this.remind<Actions[]>(Memory.PendingActions, player)
    if (pendingActions.length > 0) {
      const subRule = getActionRule(pendingActions[0], this)
      return subRule.getActivePlayerLegalMoves(player)
    }
    return []
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
      const players = uniq(guestPawns.map((guestPawn) => guestPawn.location.player))
      const player = players[0]
      if (player === undefined) {
        throw new Error('Undefined played after shuffle')
      }
      const pendingAction = this.remind<Actions[]>(Memory.PendingActions, player)[0]
      if (pendingAction.type === ActionType.PlaceGuests) {
        const numberOfRemainingGuestToDraw = pendingAction.placeOneGuest
          ? 1
          : this.getNumberOfGuestsToDraw(player) -
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
    const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    const pendingActions = this.remind<Actions[]>(Memory.PendingActions, player)
    if (pendingActions.length > 0) {
      const subRule = getActionRule(pendingActions[0], this)
      consequences.push(...subRule.afterItemMove(move, context))
    }
    this.addEndPlayerTurnConsequenceIfNecessary(move, player, consequences)
    return consequences
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const player = this.getPlayerFromMove(move)
    if (player === undefined) {
      return super.beforeItemMove(move, context)
    }
    const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    const pendingActions = this.remind<Actions[]>(Memory.PendingActions, player)
    if (pendingActions.length > 0) {
      const subRule = getActionRule(pendingActions[0], this)
      consequences.push(...subRule.beforeItemMove(move, context))
    }
    this.addEndPlayerTurnConsequenceIfNecessary(move, player, consequences, true)
    return consequences
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

  public onRuleEnd(_move: RuleMove<PlayerColor, RuleId>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    this.game.players.forEach((player) => this.memorize<Actions[]>(Memory.PendingActions, [], player))
    return super.onRuleEnd(_move, _context)
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
      if (move.location.player !== undefined) {
        return move.location.player
      }
      if (isMoveItem<PlayerColor, MaterialType, LocationType>(move)) {
        const item = this.material(move.itemType).index(move.itemIndex).getItem()
        if (item !== undefined) {
          return item.location.player
        }
      }
    }
    if (isSelectItem<PlayerColor, MaterialType, LocationType>(move)) {
      const item = this.material(move.itemType).index(move.itemIndex).getItem()
      if (item !== undefined) {
        return item.location.player
      }
    }
    return undefined
  }

  private getPlayerFromCustomMove(move: CustomMove<CustomMoveType>): PlayerColor | undefined {
    if (isPassCurrentActionCustomMove(move)) {
      return move.data.player
    }
    if (isMovieActionCustomMove(move)) {
      const movieCard = this.material(MaterialType.MovieCards).index(move.data.movieCardIndex).getItem()
      if (movieCard !== undefined) {
        return movieCard.location.player
      }
    }
    return undefined
  }

  private addEndPlayerTurnConsequenceIfNecessary(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    player: PlayerColor,
    consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[],
    before = false
  ): void {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) &&
      this.material(MaterialType.GuestPawns).player(player).location(LocationType.GuestPawnSpotOnTheaterTile).length === (before ? 1 : 0) &&
      this.game.players.includes(player)
    ) {
      consequences.push(this.endPlayerTurn<PlayerColor>(player))
    }
  }
}
