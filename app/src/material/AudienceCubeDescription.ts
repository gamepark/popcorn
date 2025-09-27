import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import audienceCube from '../images/AudienceCube.png'

class AudienceCubeDescription extends TokenDescription<PlayerColor, MaterialType, LocationType> {
  width = 1
  height = 1
  transparency = true

  image = audienceCube
}

export const audienceCubeDescription = new AudienceCubeDescription()
