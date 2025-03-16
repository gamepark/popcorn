import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import audienceCube from '../images/AudienceCube.png'

class AudienceCubeDescription extends TokenDescription<PlayerColor, MaterialType, LocationType> {
  width = 0.5
  height = 0.5

  image = audienceCube
}

export const audienceCubeDescription = new AudienceCubeDescription()
