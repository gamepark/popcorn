import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import firstPlayerMarker from '../images/Tokens/FirstPlayerToken.png'

class FirstPlayerMarkerDescription extends TokenDescription<PlayerColor, MaterialType, LocationType> {
  width = 5.55
  height = 6.59

  image = firstPlayerMarker
}

export const firstPlayerMarkerDescription = new FirstPlayerMarkerDescription()
