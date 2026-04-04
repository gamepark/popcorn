import { CustomMove, EndPlayerTurn, ItemMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { uniq } from 'es-toolkit'
import { Actions } from '../material/Actions/Actions'
import { ActionType } from '../material/Actions/ActionType'
import { CustomMoveType, isMovieActionCustomMove, isPassCurrentActionCustomMove } from '../material/CustomMoveType'
import { GuestPawn } from '../material/GuestPawn'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import {
  isPopcornMoveItem,
  isPopcornMoveItemsAtOnce,
  isPopcornMoveItemType,
  isPopcornMoveItemTypeAtOnce,
  isPopcornSelectItem,
  isPopcornShuffleItemType,
  PopcornMove
} from '../material/PopcornMoves'
import { popcornTokens } from '../material/PopcornToken'
import { Memory } from '../Memory'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { getActionRule } from './utils/getActionRule.util'
import { getAudienceFromCubeLocation } from './utils/getAudienceFromCubeLocation.util'
import { canPlayerPlaceAGuestAfterSeatOrMovieAction } from './utils/movieOrSeatActionConsequences.util'

export class ShowingsPhaseRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): PopcornMove[] {
    return this.game.players.flatMap((player) => {
      const theoreticalNumberOfGuestsToDraw = this.getNumberOfGuestsToDraw(player)
      const playerGuestInBagMaterial = this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(player)
      const numberOfGuestsToDraw = Math.min(playerGuestInBagMaterial.length, theoreticalNumberOfGuestsToDraw)
      const consequences: PopcornMove[] = [
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
        if (exitGuestDeck.exists) {
          consequences.push(
            exitGuestDeck.moveItemsAtOnce({
              type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
              player: player
            }),
            exitGuestDeck.shuffle()
          )
        }
      }
      return consequences
    })
  }

  public getActivePlayerLegalMoves(player: PlayerColor): PopcornMove[] {
    const pendingActions = this.remind<Actions[]>(Memory.PendingActions, player)
    if (pendingActions.length > 0) {
      const subRule = getActionRule(pendingActions[0], this)
      return subRule.getActivePlayerLegalMoves(player)
    }
    return []
  }

  public getMovesAfterPlayersDone(): PopcornMove[] {
    if (this.isFinalRound()) {
      const playersToActivate = uniq(
        this.material(MaterialType.AdvertisingTokens)
          .location(LocationType.AdvertisingTokenSpotOnAdvertisingBoard)
          .getItems<PlayerColor>()
          .map((token) => token.id)
      )
      const popCornMaterial = this.material(MaterialType.PopcornTokens).location(LocationType.PlayerPopcornPileUnderPopcornCupSpot).money(popcornTokens)
      this.game.players.forEach((player) => this.memorize<number>(Memory.GamePopcornScoreBeforeFinalRoundScore, popCornMaterial.player(player).count, player))
      return [this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.FinalEndOfRoundPhaseAdvertisingTokenMovesRule, playersToActivate)]
    }
    return [this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.EndOfRoundPhaseTheatricalRunRule, [])]
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, context?: PlayMoveContext): PopcornMove[] {
    if (isPopcornShuffleItemType(MaterialType.GuestPawns)(move)) {
      const guestPawns = this.material(MaterialType.GuestPawns)
        .index((guestIndex) => move.indexes.includes(guestIndex))
        .getItems<GuestPawn>()
      const players = uniq(guestPawns.map((guestPawn) => guestPawn.location.player))
      const player = players[0]
      if (player === undefined) {
        throw new Error('Undefined played after shuffle')
      }
      const pendingAction = this.remind<Actions[]>(Memory.PendingActions, player)[0]
      if (pendingAction?.type === ActionType.PlaceGuests) {
        const numberOfRemainingGuestToDraw = pendingAction.placeOneGuest
          ? 1
          : this.getNumberOfGuestsToDraw(player) -
            this.material(MaterialType.GuestPawns).location(LocationType.PlayerShowingsDrawnGuestSpot).player(player).length
        const canPlaceGuest = !pendingAction.placeOneGuest || canPlayerPlaceAGuestAfterSeatOrMovieAction(this, player, pendingAction.guestIndexPerformingAction)
        return [
          this.material(MaterialType.GuestPawns)
            .location(LocationType.PlayerGuestPawnsUnderClothBagSpot)
            .player(player)
            .deck()
            .dealAtOnce(
              {
                type: canPlaceGuest ? LocationType.PlayerShowingsDrawnGuestSpot : LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
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
    const consequences: PopcornMove[] = []
    const pendingActions = this.remind<Actions[]>(Memory.PendingActions, player)
    if (pendingActions.length > 0) {
      const subRule = getActionRule(pendingActions[0], this)
      consequences.push(...subRule.afterItemMove(move, context))
    }
    this.addEndPlayerTurnConsequenceIfNecessary(move, player, consequences)
    return consequences
  }

  public beforeItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, context?: PlayMoveContext): PopcornMove[] {
    const player = this.getPlayerFromMove(move)
    if (player === undefined) {
      return super.beforeItemMove(move, context)
    }
    const consequences: PopcornMove[] = []
    const pendingActions = this.remind<Actions[]>(Memory.PendingActions, player)
    if (pendingActions.length > 0) {
      const subRule = getActionRule(pendingActions[0], this)
      consequences.push(...subRule.beforeItemMove(move, context))
    }
    if (isPopcornMoveItemType(MaterialType.GuestPawns)(move) && move.location.type === LocationType.GuestPawnReserveSpot) {
      const guestPawnBeingMoved = this.material(move.itemType).index(move.itemIndex).getItem()!
      if (guestPawnBeingMoved.location.type === LocationType.GuestPawnSpotOnTheaterTile && guestPawnBeingMoved.location.player === player) {
        this.addEndPlayerTurnConsequenceIfNecessary(move, player, consequences, true)
      }
    }
    return consequences
  }

  public onCustomMove(move: CustomMove<CustomMoveType>, context?: PlayMoveContext): PopcornMove[] {
    const player = this.getPlayerFromCustomMove(move)
    if (player === undefined) {
      return super.onCustomMove(move, context)
    }
    const pendingAction = this.remind<Actions[]>(Memory.PendingActions, player)[0]
    const subRule = getActionRule(pendingAction, this)
    return subRule.onCustomMove(move, context)
  }

  public onPlayerTurnEnd(move: EndPlayerTurn<PlayerColor>, _context?: PlayMoveContext): PopcornMove[] {
    const player = move.player
    const exitZoneGuests = this.material(MaterialType.GuestPawns).player(player).location(LocationType.GuestPawnSpotOnTheaterTile)
    return exitZoneGuests.exists
      ? [
          this.material(MaterialType.GuestPawns).player(player).location(LocationType.GuestPawnSpotOnTheaterTile).moveItemsAtOnce({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        ]
      : []
  }

  public onRuleEnd(_move: RuleMove<PlayerColor, RuleId>, _context?: PlayMoveContext): PopcornMove[] {
    this.game.players.forEach((player) => this.memorize<Actions[]>(Memory.PendingActions, [], player))
    return super.onRuleEnd(_move, _context)
  }

  public getNumberOfGuestsToDraw(player: PlayerColor): number {
    const audienceCubeLocation = this.material(MaterialType.AudienceCubes).player(player).getItems()[0].location
    return getAudienceFromCubeLocation(audienceCubeLocation)
  }

  private getPlayerFromMove(move: ItemMove<PlayerColor, MaterialType, LocationType>): PlayerColor | undefined {
    if (isPopcornMoveItem(move) || isPopcornMoveItemsAtOnce(move)) {
      if (move.location.player !== undefined) {
        return move.location.player
      }
      if (isPopcornMoveItem(move)) {
        const item = this.material(move.itemType).index(move.itemIndex).getItem()
        if (item !== undefined) {
          return item.location.player
        }
      }
    }
    if (isPopcornSelectItem(move)) {
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
    consequences: PopcornMove[],
    before = false
  ): void {
    const remainingSeatedGuestsIndexes = this.material(MaterialType.GuestPawns).player(player).location(LocationType.GuestPawnSpotOnTheaterTile).getIndexes()
    const playerPendingActions = this.remind<Actions[]>(Memory.PendingActions, player)
    const remainingGuestsHaveActions =
      playerPendingActions.some((action) => action.type === ActionType.PickTheaterTileToActivate || action.type === ActionType.PlaceGuests) ||
      remainingSeatedGuestsIndexes.some((guestIndex) =>
        playerPendingActions.some(
          (action) => action.type === (ActionType.ChooseSeatAction || action.type === ActionType.ChooseMovieAction) && action.guestIndex === guestIndex
        )
      )
    if (
      (isPopcornMoveItemType(MaterialType.GuestPawns)(move) || isPopcornMoveItemTypeAtOnce(MaterialType.GuestPawns)(move)) &&
      move.location.type !== LocationType.PlayerShowingsDrawnGuestSpot &&
      move.location.type !== LocationType.PlayerGuestPawnsUnderClothBagSpot &&
      (this.material(MaterialType.GuestPawns).player(player).location(LocationType.GuestPawnSpotOnTheaterTile).length === (before ? 1 : 0) ||
        !remainingGuestsHaveActions) &&
      this.activePlayers.includes(player)
    ) {
      consequences.push(this.endPlayerTurn<PlayerColor>(player))
    }
  }

  public isFinalRound(): boolean {
    const numberOfPlayers = this.game.players.length
    const numberOfCardsInDeckForFinalRound = numberOfPlayers === 2 ? 10 : 5
    return this.material(MaterialType.MovieCards).location(LocationType.MovieCardDeckSpot).length <= numberOfCardsInDeckForFinalRound
  }
}
