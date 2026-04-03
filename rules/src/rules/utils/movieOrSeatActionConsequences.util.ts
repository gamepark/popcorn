import { MaterialRulesPart } from '@gamepark/rules-api'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getMaximumNumberOfGuests, TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export const canPlayerPlaceAGuestAfterSeatOrMovieAction = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
  player: PlayerColor,
  guestPerformingActionIndex: number
): boolean => {
  const guest = rule.material(MaterialType.GuestPawns).index(guestPerformingActionIndex).getItem()!
  const currentGuestSeat = guest.location.x!
  return rule
    .material(MaterialType.TheaterTiles)
    .player(player)
    .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
    .filter<Required<TheaterTileId>>((theaterTile, tileIndex) => {
      const guestOnTileMaterial = rule.material(MaterialType.GuestPawns).parent(tileIndex)
      if (theaterTile.selected !== true) {
        // Tile hasn't been activated, guests can be replaced
        return true
      }
      if (guestOnTileMaterial.length === 0) {
        // Tile has already been activated and all guests have been used, cannot use this tile
        return false
      } else {
        if (currentGuestSeat !== undefined) {
          return getMaximumNumberOfGuests(theaterTilesCharacteristics[theaterTile.id.front].getSeatsNumber()) > currentGuestSeat + 1
        }
        const maxLocationXForTile = getMaximumNumberOfGuests(theaterTilesCharacteristics[theaterTile.id.front].getSeatsNumber()) - 1
        const lastGuestOnTile = guestOnTileMaterial
          .parent(tileIndex)
          .maxBy((guestMaterial) => guestMaterial.location.x ?? 0)
          .getItem<GuestPawn>()
        return lastGuestOnTile === undefined || lastGuestOnTile.location.x! < maxLocationXForTile
      }
    }).exists
}
