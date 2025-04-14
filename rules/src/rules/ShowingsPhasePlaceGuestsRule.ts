import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MovieCardId } from '../material/MovieCard'
import { getMaximumNumberOfGuests, TheaterTileId, theaterTilesCharacteristics } from '../material/TheaterTile'
import { Memorize, PlayerActionMemory } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class ShowingsPhasePlaceGuestsRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const validDestionationSpots = this.material(MaterialType.MovieCards)
      .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
      .player(player)
      .getItems<Required<MovieCardId>>()
      .map((item) => item.location.x)
    const destinationTilesIndexes = this.material(MaterialType.TheaterTiles)
      .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
      .player(player)
      .location((location) => validDestionationSpots.includes(location.x))
      .getIndexes()
    return destinationTilesIndexes.flatMap((tileItemIndex) => {
      const parentTile = this.material(MaterialType.TheaterTiles).index(tileItemIndex).getItems<Required<TheaterTileId>>()[0]
      const seatsNumber = theaterTilesCharacteristics[parentTile.id.front].getSeatsNumber()
      const maxGuestNumber = getMaximumNumberOfGuests(seatsNumber)
      if (this.material(MaterialType.GuestPawns).parent(tileItemIndex).length === maxGuestNumber) {
        return []
      }
      return this.material(MaterialType.GuestPawns)
        .location(LocationType.PlayerShowingsDrawnGuestSpot)
        .player(player)
        .moveItems({
          type: LocationType.GuestPawnSpotOnTheaterTile,
          parent: tileItemIndex,
          x: this.material(MaterialType.GuestPawns).parent(tileItemIndex).length
        })
    })
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move) &&
      move.location.type === LocationType.GuestPawnSpotOnTheaterTile &&
      move.location.parent !== undefined
    ) {
      const player = this.material(MaterialType.GuestPawns).index(move.itemIndex).getItems()[0].location.player
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
      const numberOfPlacedGuests =
        this.material(MaterialType.GuestPawns)
          .location(LocationType.GuestPawnSpotOnTheaterTile)
          .parent((parent) => parent !== undefined && playerTheaterTileIndexes.includes(parent)).length + 1
      const remainingGuestMaterial = this.material(MaterialType.GuestPawns)
        .location(LocationType.PlayerShowingsDrawnGuestSpot)
        .player(player)
        .index((pawnIndex) => pawnIndex !== move.itemIndex)
      if (remainingGuestMaterial.length === 0 || maxNumberOfGuestsForPlayer === numberOfPlacedGuests) {
        this.memorize<PlayerActionMemory>(
          Memorize.PlayerActions,
          (memory) => {
            memory[RuleId.ShowingsPhaseRule].guestPlaced = true
            return memory
          },
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
}
