import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { PlaceGuestAction } from '../../material/Actions/PlaceGuestAction'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MovieCardId } from '../../material/MovieCard'
import { getMaximumNumberOfGuests, SeatsNumber, TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'

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

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) &&
      move.location.type === LocationType.GuestPawnSpotOnTheaterTile &&
      move.location.parent !== undefined
    ) {
      const player = this.material(MaterialType.GuestPawns).index(move.itemIndex).getItems()[0].location.player
      if (player === undefined) {
        throw new Error('Invalid move')
      }
      const movieSpots = this.material(MaterialType.MovieCards)
        .player(player)
        .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
        .getItems<Required<MovieCardId>>()
        .map((item) => item.location.x)
      const playerTheaterTileMaterial = this.material(MaterialType.TheaterTiles)
        .player(player)
        .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
        .location((location) => movieSpots.includes(location.x))
      const playerTheaterTileIndexes = playerTheaterTileMaterial.getIndexes()
      const maxNumberOfGuestsForPlayer = playerTheaterTileMaterial
        .getItems<Required<TheaterTileId>>()
        .reduce((previousTotal, currentTile) => previousTotal + getMaximumNumberOfGuests(theaterTilesCharacteristics[currentTile.id.front].getSeatsNumber()), 0)
      const numberOfPlacedGuests = this.material(MaterialType.GuestPawns)
        .location(LocationType.GuestPawnSpotOnTheaterTile)
        .parent((parent) => parent !== undefined && playerTheaterTileIndexes.includes(parent)).length
      const remainingGuestMaterial = this.material(MaterialType.GuestPawns).location(LocationType.PlayerShowingsDrawnGuestSpot).player(player)
      if (remainingGuestMaterial.length === 0 || maxNumberOfGuestsForPlayer === numberOfPlacedGuests) {
        this.removeCurrentActionForPlayer(player)
        this.memorize<Actions[]>(
          Memory.PendingActions,
          (pendingActions) => pendingActions.concat(playerTheaterTileIndexes.map((_) => ({ type: ActionType.PickTheaterTileToActivate }))),
          player
        )
        if (numberOfPlacedGuests === maxNumberOfGuestsForPlayer && remainingGuestMaterial.length > 0) {
          return [
            remainingGuestMaterial.moveItemsAtOnce({
              type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
              player: player
            })
          ]
        }
      }
    }
    return super.afterItemMove(move, _context)
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

  private getMoveForSeatAction(_player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    /*const currentTheaterTileIndex = this.remind<PlayerActionMemory>(Memory.PlayerActions, player)[RuleId.ShowingsPhaseRule].currentTheaterTileIndex
    if (currentTheaterTileIndex === undefined) {
      throw new Error('Issue with current theater tile')
    }
    const validDestinationSpots = this.material(MaterialType.MovieCards)
      .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
      .player(player)
      .getItems<Required<MovieCardId>>()
      .map((item) => item.location.x)
    const destinationTilesIndexes = this.material(MaterialType.TheaterTiles)
      .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
      .player(player)
      .location((location) => validDestinationSpots.includes(location.x))
      .filter((item, index) => !item.selected || index === currentTheaterTileIndex)
      .getIndexes()
    return destinationTilesIndexes.flatMap((tileItemIndex) => {
      const parentTile = this.material(MaterialType.TheaterTiles).index(tileItemIndex).getItems<Required<TheaterTileId>>()[0]
      const seatsNumber = theaterTilesCharacteristics[parentTile.id.front].getSeatsNumber()
      if (parentTile.selected) {
        const pawnsOnTileMaterial = this.material(MaterialType.GuestPawns).parent(tileItemIndex)
        const destinationSpotsOnTile = pawnsOnTileMaterial
          .sort((item) => -(item.location.x ?? 0))
          .limit(pawnsOnTileMaterial.length - 1)
          .entries.map((entry) => entry[1].location.x)
        return destinationSpotsOnTile.flatMap((spot) =>
          this.material(MaterialType.GuestPawns).location(LocationType.PlayerShowingsDrawnGuestSpot).player(player).moveItems({
            type: LocationType.GuestPawnSpotOnTheaterTile,
            parent: tileItemIndex,
            x: spot
          })
        )
      } else {
        return this.getMoveForFirstUnoccupiedSeatOnTile(seatsNumber, tileItemIndex, player)
      }
    })*/
    return []
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
}
