import { Location } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { PlayerColor } from '../../PlayerColor'

export const getAudienceFromCubeLocation = (audienceCubeLocation: Location<PlayerColor, LocationType> | undefined): number => {
  switch (audienceCubeLocation?.x ?? -1) {
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
