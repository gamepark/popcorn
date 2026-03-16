import { isMoveItemType, ItemMove, Material, MaterialMove, MoveItem, PlayMoveContext } from '@gamepark/rules-api'
import { uniq } from 'es-toolkit'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { PlaceGuestAction } from '../../material/Actions/PlaceGuestAction'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MovieCardId } from '../../material/MovieCard'
import { getMaximumNumberOfGuests, SeatsNumber, TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'
import { addPendingActionsForPlayer } from './utils/addPendingActionForPlayer.util'
import { buildPendingActionsForGuest } from './utils/buildPendingActionsForGuest'
import { getMovieColorFromSpot } from './utils/getMovieColorFromSpot'

export class PlaceGuestsActionRule extends ActionRule<PlaceGuestAction> {
  public consequencesBeforeRuleForPlayer(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.action.placeOneGuest ? this.getMoveForSeatAction(player) : this.getMovesForPlacingGuestsPhase(player)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) &&
      move.location.type === LocationType.GuestPawnSpotOnTheaterTile &&
      move.location.parent !== undefined
    ) {
      const guestAlreadyInSpot = this.material(MaterialType.GuestPawns)
        .location(move.location.type)
        .parent(move.location.parent)
        .location((l) => l.x === move.location.x)
      if (guestAlreadyInSpot.length === 1) {
        return [
          guestAlreadyInSpot.moveItem({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: move.location.player
          })
        ]
      }
    }
    return super.beforeItemMove(move, context)
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move)) {
      const player = this.material(MaterialType.GuestPawns).index(move.itemIndex).getItems()[0].location.player
      if (player === undefined) {
        throw new Error('Invalid move')
      }
      if (move.location.type === LocationType.GuestPawnSpotOnTheaterTile && move.location.parent !== undefined) {
        return this.buildConsequencesForGuestPlacedOnTile(player, move)
      }
      if (move.location.type === LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard) {
        this.removeCurrentActionForPlayer(player)
        this.memorize<Actions[]>(
          Memory.PendingActions,
          (pendingActions) =>
            pendingActions.filter(
              (a) => (a.type !== ActionType.ChooseSeatAction && a.type !== ActionType.ChooseMovieAction) || a.guestIndex !== move.itemIndex
            ),
          player
        )
      }
    }
    return super.afterItemMove(move, _context)
  }

  private areAllGuestPlaced = (playerTheaterTileMaterial: Material<PlayerColor, MaterialType, LocationType>): boolean => {
    const playerTheaterTileIndexes = playerTheaterTileMaterial.getIndexes()
    const maxNumberOfGuestsForPlayer = playerTheaterTileMaterial
      .getItems<Required<TheaterTileId>>()
      .reduce((previousTotal, currentTile) => previousTotal + getMaximumNumberOfGuests(theaterTilesCharacteristics[currentTile.id.front].getSeatsNumber()), 0)
    const numberOfPlacedGuests = this.material(MaterialType.GuestPawns)
      .location(LocationType.GuestPawnSpotOnTheaterTile)
      .parent((parent) => parent !== undefined && playerTheaterTileIndexes.includes(parent)).length
    return maxNumberOfGuestsForPlayer === numberOfPlacedGuests
  }

  private getMovesForPlacingGuestsPhase(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const validDestinationSpots = this.material(MaterialType.MovieCards)
      .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
      .player(player)
      .getItems<Required<MovieCardId>>()
      .map((item) => item.location.x)
    const destinationTilesIndexes = this.material(MaterialType.TheaterTiles)
      .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
      .player(player)
      .location((location) => validDestinationSpots.includes(location.x))
      .getIndexes()
    return destinationTilesIndexes.flatMap((tileItemIndex) => {
      const parentTile = this.material(MaterialType.TheaterTiles).index(tileItemIndex).getItems<Required<TheaterTileId>>()[0]
      const seatsNumber = theaterTilesCharacteristics[parentTile.id.front].getSeatsNumber()
      return this.getMoveForFirstUnoccupiedSeatOnTile(seatsNumber, tileItemIndex, player)
    })
  }

  private getMoveForSeatAction(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const guestPawnMaterial = this.material(MaterialType.GuestPawns).player(player).location(LocationType.GuestPawnSpotOnTheaterTile)
    const validDestinationSpots = this.material(MaterialType.MovieCards)
      .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
      .player(player)
      .getItems<Required<MovieCardId>>()
      .map((item) => item.location.x)
    const destinationTilesIndexes = this.material(MaterialType.TheaterTiles)
      .player(player)
      .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
      .location((location) => validDestinationSpots.includes(location.x))
      .filter((item, index) => item.selected !== true || guestPawnMaterial.parent(index).length > 0)
      .getIndexes()
    return destinationTilesIndexes.flatMap((tileItemIndex) => {
      const parentTile = this.material(MaterialType.TheaterTiles).index(tileItemIndex).getItems<Required<TheaterTileId>>()[0]
      const seatsNumber = theaterTilesCharacteristics[parentTile.id.front].getSeatsNumber()
      const pawnsOnTileMaterial = this.material(MaterialType.GuestPawns).parent(tileItemIndex)
      const destinationSpotsOnTile = pawnsOnTileMaterial
        .sort((item) => -(item.location.x ?? 0))
        .limit(parentTile.selected === true ? pawnsOnTileMaterial.length - 1 : pawnsOnTileMaterial.length)
        .entries.map((entry) => entry[1].location.x)
      const movesForOccupiedSpots: MaterialMove<PlayerColor, MaterialType, LocationType>[] = destinationSpotsOnTile.flatMap((spot) =>
        this.material(MaterialType.GuestPawns).location(LocationType.PlayerShowingsDrawnGuestSpot).player(player).moveItems({
          type: LocationType.GuestPawnSpotOnTheaterTile,
          parent: tileItemIndex,
          player: player,
          x: spot
        })
      )
      if (parentTile.selected) {
        return movesForOccupiedSpots
      } else {
        return movesForOccupiedSpots.concat(this.getMoveForFirstUnoccupiedSeatOnTile(seatsNumber, tileItemIndex, player))
      }
    })
  }

  private getMoveForFirstUnoccupiedSeatOnTile(
    seatsNumber: Exclude<SeatsNumber, SeatsNumber.Default>,
    tileItemIndex: number,
    player: PlayerColor
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const maxGuestNumber = getMaximumNumberOfGuests(seatsNumber)
    if (this.material(MaterialType.GuestPawns).parent(tileItemIndex).length === maxGuestNumber) {
      return []
    }
    return this.material(MaterialType.GuestPawns)
      .location(LocationType.PlayerShowingsDrawnGuestSpot)
      .player(player)
      .moveItems({
        type: LocationType.GuestPawnSpotOnTheaterTile,
        player: player,
        parent: tileItemIndex,
        x: this.material(MaterialType.GuestPawns).parent(tileItemIndex).length
      })
  }

  private buildConsequencesForGuestPlacedOnTile(
    player: PlayerColor,
    move: MoveItem<PlayerColor, MaterialType, LocationType>
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const movieSpots = this.material(MaterialType.MovieCards)
      .player(player)
      .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
      .getItems<Required<MovieCardId>>()
      .map((item) => item.location.x)
    const playerTheaterTileMaterial = this.material(MaterialType.TheaterTiles)
      .player(player)
      .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
      .location((location) => movieSpots.includes(location.x))
    const remainingGuestMaterial = this.material(MaterialType.GuestPawns).location(LocationType.PlayerShowingsDrawnGuestSpot).player(player)
    const areAllGuestPlaced = this.areAllGuestPlaced(playerTheaterTileMaterial)
    const existsRemainingGuestsToPlace = remainingGuestMaterial.length > 0
    const guestAlreadyInSpot = this.material(MaterialType.GuestPawns)
      .location(LocationType.GuestPawnSpotOnTheaterTile)
      .parent(move.location.parent)
      .location((l) => l.x === move.location.x)
    const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    if (!existsRemainingGuestsToPlace || areAllGuestPlaced) {
      if (guestAlreadyInSpot.length === 1) {
        this.removeCurrentActionForPlayer(player)
      }
      if (this.action.guestIndexToMoveToExitZone !== undefined) {
        consequences.push(
          this.material(MaterialType.GuestPawns).index(this.action.guestIndexToMoveToExitZone).moveItem({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        )
      }
      if (playerTheaterTileMaterial.index(move.location.parent).selected(true).length === 0) {
        const theaterTilesWithGuestsIndexes = uniq(
          this.material(MaterialType.GuestPawns)
            .location(LocationType.GuestPawnSpotOnTheaterTile)
            .player(player)
            .getItems()
            .map((item) => item.location.parent)
            .filter((index) => index !== undefined)
        )
        addPendingActionsForPlayer(this, new Array(theaterTilesWithGuestsIndexes.length).fill({ type: ActionType.PickTheaterTileToActivate }), player)
      }
      if (areAllGuestPlaced && existsRemainingGuestsToPlace) {
        return consequences.concat(
          remainingGuestMaterial.moveItemsAtOnce({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        )
      }
      const parentTheaterTileMaterial = playerTheaterTileMaterial.index(move.location.parent)
      if (this.action.placeOneGuest && playerTheaterTileMaterial.index(move.location.parent).selected(true).length === 1) {
        this.updatePendingActionsForNewGuest(move, parentTheaterTileMaterial, player)
      }
    }
    return consequences
  }
  private updatePendingActionsForNewGuest = (
    move: MoveItem<PlayerColor, MaterialType, LocationType>,
    parentTheaterTileMaterial: Material<PlayerColor, MaterialType, LocationType>,
    player: PlayerColor
  ): void => {
    const lastPreviousGuestsOnTileIndex = this.material(MaterialType.GuestPawns)
      .location(LocationType.GuestPawnSpotOnTheaterTile)
      .parent(move.location.parent)
      .location((l) => (l.x ?? 99) < (move.location.x ?? -1))
      .maxBy((guest) => guest.location.x ?? -1)
      .getIndex()
    const newGuest = this.material(MaterialType.GuestPawns).index(move.itemIndex).getItem<GuestPawn>()!
    const parentTheaterTile = parentTheaterTileMaterial.getItem<Required<TheaterTileId>>()!
    const tileCharacteristics = theaterTilesCharacteristics[parentTheaterTile.id.front]
    const newActions: Actions[] = buildPendingActionsForGuest(
      tileCharacteristics.getSeatColor(move.location.x!),
      newGuest.id,
      move.itemIndex,
      getMovieColorFromSpot(this, player, parentTheaterTile.location.x!)
    )
    this.memorize<Actions[]>(
      Memory.PendingActions,
      (pendingActions) => {
        const previousGuestLastActionIndex = pendingActions
          .reverse()
          .findIndex(
            (a) => (a.type === ActionType.ChooseMovieAction || a.type === ActionType.ChooseSeatAction) && a.guestIndex === lastPreviousGuestsOnTileIndex
          )
        return pendingActions
          .slice(0, previousGuestLastActionIndex === -1 ? 0 : pendingActions.length - previousGuestLastActionIndex)
          .concat(newActions)
          .concat(pendingActions.slice(previousGuestLastActionIndex === -1 ? 1 : pendingActions.length - previousGuestLastActionIndex))
      },
      player
    )
  }
}
