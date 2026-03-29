import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import cyanTopCinemaBoard from '../images/Boards/PlayerBoards/BlueTop.png'
import greenTopCinemaBoard from '../images/Boards/PlayerBoards/GreenTop.png'
import orangeTopCinemaBoard from '../images/Boards/PlayerBoards/OrangeTop.png'
import purpleTopCinemaBoard from '../images/Boards/PlayerBoards/PurpleTop.png'
import { TopCinemaBoardHelp } from './help/TopCinemaBoardHelp'
import { TopCinemaBoardHelpDisplay } from './help/TopCinemaBoardHelpDisplay'

class TopCinemaBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType, PlayerColor, RuleId, PlayerColor> {
  width = 24.2
  height = 16.7
  thickness = 0.2
  transparency = true

  helpDisplay = TopCinemaBoardHelpDisplay
  help = TopCinemaBoardHelp

  images = {
    [PlayerColor.Cyan]: cyanTopCinemaBoard,
    [PlayerColor.Green]: greenTopCinemaBoard,
    [PlayerColor.Orange]: orangeTopCinemaBoard,
    [PlayerColor.Purple]: purpleTopCinemaBoard
  }

  public getStaticItems(
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): MaterialItem<PlayerColor, LocationType, PlayerColor>[] {
    return context.rules.players.map((playerColor) => ({
      id: playerColor,
      location: {
        type: LocationType.TopPlayerCinemaBoardSpotOnBottomPlayerCinemaBoard,
        player: playerColor
      }
    }))
  }
}

export const topCinemaBoardDescription = new TopCinemaBoardDescription()
