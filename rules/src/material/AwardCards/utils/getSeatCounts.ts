import { Material } from '@gamepark/rules-api'
import { countBy } from 'es-toolkit'
import { PlayerColor } from '../../../PlayerColor'
import { LocationType } from '../../LocationType'
import { MaterialType } from '../../MaterialType'
import { SeatColor, TheaterTileId, theaterTilesCharacteristics } from '../../TheaterTile'

export const getSeatCounts = (playerTheaterTilesMaterial: Material<PlayerColor, MaterialType, LocationType>): Partial<Record<SeatColor, number>> => {
  return countBy(
    playerTheaterTilesMaterial.getItems<Required<TheaterTileId>>().flatMap((tile) => theaterTilesCharacteristics[tile.id.front].getSeatColors()),
    (seatColor) => seatColor
  )
}
