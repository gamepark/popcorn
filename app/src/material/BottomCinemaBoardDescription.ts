import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { BoardDescription, getRelativePlayerIndex, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import cyanBottomCinemaBoard from '../images/Boards/PlayerBoards/BlueBottom.jpg'
import greenBottomCinemaBoard from '../images/Boards/PlayerBoards/GreenBottom.jpg'
import orangeBottomCinemaBoard from '../images/Boards/PlayerBoards/OrangeBottom.jpg'
import purpleBottomCinemaBoard from '../images/Boards/PlayerBoards/PurpleBottom.jpg'

class BottomCinemaBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType, PlayerColor> {
  width = 24
  height = 16.5

  images = {
    [PlayerColor.Cyan]: cyanBottomCinemaBoard,
    [PlayerColor.Green]: greenBottomCinemaBoard,
    [PlayerColor.Orange]: orangeBottomCinemaBoard,
    [PlayerColor.Purple]: purpleBottomCinemaBoard
  }

  public getStaticItems(context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<PlayerColor, LocationType>[] {
    return context.rules.players.map((playerColor) => {
      return {
        id: playerColor,
        location: {
          type: LocationType.BottomPlayerCinemaBoardSpot,
          player: getRelativePlayerIndex(context, playerColor)
        }
      }
    })
  }
}

export const bottomCinemaBoardDescription = new BottomCinemaBoardDescription()
