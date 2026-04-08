import { ItemMove, Material, MoveItem, PlayMoveContext } from '@gamepark/rules-api'
import { uniq } from 'es-toolkit'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { PlaceGuestAction } from '../../material/Actions/PlaceGuestAction'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MovieCardId } from '../../material/MovieCard'
import { isPopcornMoveItemType, PopcornMove } from '../../material/PopcornMoves'
import { getMaximumNumberOfGuests, SeatsNumber, TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { PlayerColor } from '../../PlayerColor'
import { ActionRule } from './ActionRule'
import { buildPendingActionsForGuest } from './utils/buildPendingActionsForGuest'

export class PlaceGuestsActionRule extends ActionRule<PlaceGuestAction> {
  public consequencesBeforeRuleForPlayer(): PopcornMove[] {
    return []
  }

  public getActivePlayerLegalMoves(player: PlayerColor): PopcornMove[] {
    return this.action.placeOneGuest ? this.getMoveForMovieOrSeatAction(player) : this.getMovesForPlacingGuestsPhase(player)
  }

  public getMovesAfterPlayersDone(): PopcornMove[] {
    return []
  }

  public beforeItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, context?: PlayMoveContext): PopcornMove[] {
    if (
      isPopcornMoveItemType(MaterialType.GuestPawns)(move) &&
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

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): PopcornMove[] {
    if (isPopcornMoveItemType(MaterialType.GuestPawns)(move)) {
      const player = this.material(MaterialType.GuestPawns).index(move.itemIndex).getItems()[0].location.player
      if (player === undefined) {
        throw new Error('Invalid move')
      }
      if (move.location.type === LocationType.GuestPawnSpotOnTheaterTile && move.location.parent !== undefined) {
        return this.buildConsequencesForGuestPlacedOnTile(player, move)
      }
      if (move.location.type === LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard && move.itemIndex) {
        this.removeCurrentActionForPlayer(player)
        this.updatePendingActionsForPlayer(player, (pendingActions) =>
          pendingActions.filter((a) => (a.type !== ActionType.ChooseSeatAction && a.type !== ActionType.ChooseMovieAction) || a.guestIndex !== move.itemIndex)
        )
      }
    }
    return super.afterItemMove(move, _context)
  }

  private areAllSeatsOccupied = (playerTheaterTileMaterial: Material<PlayerColor, MaterialType, LocationType>): boolean => {
    const playerTheaterTileIndexes = playerTheaterTileMaterial.getIndexes()
    const maxNumberOfGuestsForPlayer = playerTheaterTileMaterial
      .getItems<Required<TheaterTileId>>()
      .reduce((previousTotal, currentTile) => previousTotal + getMaximumNumberOfGuests(theaterTilesCharacteristics[currentTile.id.front].getSeatsNumber()), 0)
    const numberOfPlacedGuests = this.material(MaterialType.GuestPawns)
      .location(LocationType.GuestPawnSpotOnTheaterTile)
      .parent((parent) => parent !== undefined && playerTheaterTileIndexes.includes(parent)).length
    return maxNumberOfGuestsForPlayer === numberOfPlacedGuests
  }

  private getMovesForPlacingGuestsPhase(player: PlayerColor): PopcornMove[] {
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

  private getMoveForMovieOrSeatAction(player: PlayerColor): PopcornMove[] {
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
      .filter((item, index) => item.selected !== true || guestPawnMaterial.parent(index).exists)
      .getIndexes()
    const drawnGuestPawnMaterial = this.material(MaterialType.GuestPawns).location(LocationType.PlayerShowingsDrawnGuestSpot).player(player)
    return destinationTilesIndexes.flatMap((tileItemIndex) => {
      const parentTile = this.material(MaterialType.TheaterTiles).index(tileItemIndex).getItems<Required<TheaterTileId>>()[0]
      const seatsNumber = theaterTilesCharacteristics[parentTile.id.front].getSeatsNumber()
      const pawnsOnTileMaterial = this.material(MaterialType.GuestPawns).parent(tileItemIndex)
      const destinationSpotsOnTile = pawnsOnTileMaterial
        .sort((item) => -(item.location.x ?? 0))
        .limit(parentTile.selected === true ? pawnsOnTileMaterial.length - 1 : pawnsOnTileMaterial.length)
        .entries.map((entry) => entry[1].location.x)
      const movesForOccupiedSpots: PopcornMove[] = destinationSpotsOnTile.flatMap((spot) =>
        drawnGuestPawnMaterial.moveItems({
          type: LocationType.GuestPawnSpotOnTheaterTile,
          parent: tileItemIndex,
          player: player,
          x: spot
        })
      )
      return movesForOccupiedSpots.concat(this.getMoveForFirstUnoccupiedSeatOnTile(seatsNumber, tileItemIndex, player))
    })
    // TODO Check with Iello about special case
    // .concat(
    //   drawnGuestPawnMaterial.moveItems({
    //     type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
    //     player: player
    //   })
    // )
  }

  private getMoveForFirstUnoccupiedSeatOnTile(
    seatsNumber: Exclude<SeatsNumber, SeatsNumber.Default>,
    tileItemIndex: number,
    player: PlayerColor
  ): PopcornMove[] {
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

  private buildConsequencesForGuestPlacedOnTile(player: PlayerColor, move: MoveItem<PlayerColor, MaterialType, LocationType>): PopcornMove[] {
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
    const areAllSeatsOccupied = this.areAllSeatsOccupied(playerTheaterTileMaterial)
    const existsRemainingGuestsToPlace = remainingGuestMaterial.exists
    const guestAlreadyInSpot = this.material(MaterialType.GuestPawns)
      .location(LocationType.GuestPawnSpotOnTheaterTile)
      .parent(move.location.parent)
      .location((l) => l.x === move.location.x)
    const consequences: PopcornMove[] = []
    if (!existsRemainingGuestsToPlace || areAllSeatsOccupied) {
      if (guestAlreadyInSpot.length === 1) {
        this.removeCurrentActionForPlayer(player)
      }
      if (this.action.placeOneGuest && this.action.guestIndexToMoveToExitZone !== undefined) {
        consequences.push(
          this.material(MaterialType.GuestPawns).index(this.action.guestIndexToMoveToExitZone).moveItem({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        )
      }
      const isParentTileNotActivated = playerTheaterTileMaterial.index(move.location.parent).selected(true).length === 0
      const activateTileActions = this.getPendingActionsForPlayer(player, (a) => a.type === ActionType.PickTheaterTileToActivate)
      const theaterTilesWithGuestsIndexes = uniq(
        this.material(MaterialType.GuestPawns)
          .location(LocationType.GuestPawnSpotOnTheaterTile)
          .player(player)
          .getItems()
          .map((item) => item.location.parent)
          .filter((tileIndex) => tileIndex !== undefined)
      )
      if (isParentTileNotActivated && activateTileActions.length === 0) {
        this.addPendingActionsForPlayer(player, new Array(theaterTilesWithGuestsIndexes.length).fill({ type: ActionType.PickTheaterTileToActivate }))
      } else if (isParentTileNotActivated && activateTileActions.length !== 0 && this.action.placeOneGuest) {
        const indexOfParentTileOfGuestPerformingAction = this.material(MaterialType.GuestPawns).index(this.action.guestIndexPerformingAction).getItem()!
          .location.parent
        const tilesToActivate = playerTheaterTileMaterial
          .index((tileIndex) => tileIndex !== indexOfParentTileOfGuestPerformingAction)
          .filter((tile) => tile.selected !== true)
        this.addPendingActionsForPlayer(
          player,
          new Array(tilesToActivate.length - activateTileActions.length).fill({ type: ActionType.PickTheaterTileToActivate })
        )
      }
      if (areAllSeatsOccupied && existsRemainingGuestsToPlace) {
        return consequences.concat(
          remainingGuestMaterial.moveItemsAtOnce({
            type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
            player: player
          })
        )
      }
      const parentTheaterTileMaterial = playerTheaterTileMaterial.index(move.location.parent)
      if (this.action.placeOneGuest && playerTheaterTileMaterial.index(move.location.parent).selected().length === 1) {
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
    const previousGuestsOnTileIndex = this.material(MaterialType.GuestPawns)
      .player(player)
      .location(LocationType.GuestPawnSpotOnTheaterTile)
      .location((l) => l.x === move.location.x)
      .parent(move.location.parent)
      .index((index) => index !== move.itemIndex)
      .getIndex()
    const newGuest = this.material(MaterialType.GuestPawns).index(move.itemIndex).getItem<GuestPawn>()!
    const parentTheaterTile = parentTheaterTileMaterial.getItem<Required<TheaterTileId>>()!
    const tileCharacteristics = theaterTilesCharacteristics[parentTheaterTile.id.front]
    const newActions: Actions[] = buildPendingActionsForGuest(
      tileCharacteristics.getSeatColor(move.location.x!),
      newGuest.id,
      move.itemIndex,
      this.getMovieColorFromSpot(player, parentTheaterTile.location.x!)
    )
    this.updatePendingActionsForPlayer(player, (pendingActions) => {
      const previousGuestLastActionIndex = pendingActions
        .reverse()
        .findIndex((a) => (a.type === ActionType.ChooseMovieAction || a.type === ActionType.ChooseSeatAction) && a.guestIndex === previousGuestsOnTileIndex)
      return pendingActions
        .reverse()
        .slice(0, previousGuestLastActionIndex === -1 ? 0 : pendingActions.length - previousGuestLastActionIndex)
        .concat(newActions)
        .concat(pendingActions.slice(previousGuestLastActionIndex === -1 ? 0 : pendingActions.length - previousGuestLastActionIndex))
    })
  }
}
