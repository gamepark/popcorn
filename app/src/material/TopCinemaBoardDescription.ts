import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { BoardDescription, getRelativePlayerIndex, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import cyanTopCinemaBoard from '../images/Boards/PlayerBoards/BlueTop.png'
import greenTopCinemaBoard from '../images/Boards/PlayerBoards/GreenTop.png'
import orangeTopCinemaBoard from '../images/Boards/PlayerBoards/OrangeTop.png'
import purpleTopCinemaBoard from '../images/Boards/PlayerBoards/PurpleTop.png'

class TopCinemaBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType, PlayerColor> {
  width = 24
  height = 16.5

  images = {
    [PlayerColor.Cyan]: cyanTopCinemaBoard,
    [PlayerColor.Green]: greenTopCinemaBoard,
    [PlayerColor.Orange]: orangeTopCinemaBoard,
    [PlayerColor.Purple]: purpleTopCinemaBoard
  }

  public getStaticItems(context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<PlayerColor, LocationType>[] {
    return context.rules.players.map((playerColor) => ({
      id: playerColor,
      location: {
        type: LocationType.TopPlayerCinemaBoardSpotOnBottomPlayerCinemaBoard,
        player: getRelativePlayerIndex(context, playerColor)
      }
    }))
  }
}

export const topCinemaBoardDescription = new TopCinemaBoardDescription()
