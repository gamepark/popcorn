import { isMoveItemType, ItemMove, Material, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { uniq } from 'es-toolkit'
import { ActionType } from '../../material/Actions/ActionType'
import { PlaceGuestAction } from '../../material/Actions/PlaceGuestAction'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MovieCardId } from '../../material/MovieCard'
import { getMaximumNumberOfGuests, SeatsNumber, TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'
import { addPendingActionsForPlayer } from './utils/addPendingActionForPlayer.util'

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
      const remainingGuestMaterial = this.material(MaterialType.GuestPawns).location(LocationType.PlayerShowingsDrawnGuestSpot).player(player)
      const areAllGuestPlaced = this.areAllGuestPlaced(playerTheaterTileMaterial)
      const existsRemainingGuestsToPlace = remainingGuestMaterial.length > 0
      if (!existsRemainingGuestsToPlace || areAllGuestPlaced) {
        const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
        if (this.action.guestIndexToMoveToExitZone !== undefined) {
          consequences.push(
            this.material(MaterialType.GuestPawns).index(this.action.guestIndexToMoveToExitZone).moveItem({
              type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
              player: player
            })
          )
        }
        this.removeCurrentActionForPlayer(player)
        if (playerTheaterTileMaterial.index(move.location.parent).selected(true).length === 0) {
          const theaterTilesWithGuestsIndexes = uniq(this.material(MaterialType.GuestPawns)
            .location(LocationType.GuestPawnSpotOnTheaterTile)
            .player(player)
            .getItems()
            .map((item) => item.location.parent)
            .filter((index) => index !== undefined))
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
        return consequences
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
      .filter((_, index) => guestPawnMaterial.parent(index).length > 0)
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
}
