import { MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { PlayerColor } from '../../PlayerColor'

export const hideLocationToOther = (item: MaterialItem<PlayerColor, LocationType>, player: PlayerColor | undefined) => {
  return player === undefined || (item.location.player !== undefined && item.location.player !== player) ? ['location'] : []
}

export const hideItemIdAndLocationToOther = (item: MaterialItem<PlayerColor, LocationType>, player: PlayerColor | undefined) => {
  return player === undefined || (item.location.player !== undefined && item.location.player !== player) ? ['location', 'id'] : []
}
