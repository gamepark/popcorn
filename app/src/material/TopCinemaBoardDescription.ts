import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import cyanTopCinemaBoard from '../images/Boards/PlayerBoards/BlueTop.png'
import greenTopCinemaBoard from '../images/Boards/PlayerBoards/GreenTop.png'
import orangeTopCinemaBoard from '../images/Boards/PlayerBoards/OrangeTop.png'
import purpleTopCinemaBoard from '../images/Boards/PlayerBoards/PurpleTop.png'

class TopCinemaBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType, PlayerColor> {
  width = 24.2
  height = 16.7
  thickness = 0.2
  transparency = true

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
        player: playerColor
      }
    }))
  }

  // public getItemExtraCss(_item: MaterialItem<PlayerColor, LocationType>, _context: ItemContext<PlayerColor, MaterialType, LocationType>): Interpolation<Theme> {
  //   const transform = this.getItemTransform(_item, _context)
  //   return css`
  //     clip-path: path(
  //       'm 885.64715,1.7180019 h 26.56114 V 628.48728 H 1.5623143 L 3.5996839, 3.6088253 30.631512, 3.6034117 49.354957, 15.229313 l 2.20917, 339.933677 227.849233, -0.0783 0.23487, -158.29076 -166.55974, -1.0178 0.15659, -86.49204 177.23827, -0.39146 V 14.32187 L 301.86651, 2.9112507 h 18.92329 l 11.38316, 11.3261953 -0.5004, 340.750104 H 570.71755 V 187.84979 l -166.4508, 1.19324 V 108.89264 L 582.10071, 107.6994 V 13.128622 L 593.48387, 1.7180019 h 18.87511 0.23558 L 623.97772, 13.044198 V 354.98755 h 239.045 V 187.84979 H 696.07018 V 107.6994 h 178.3357 V 13.128622 L 885.78904, 1.7180019'
  //     );
  //   `
  // }
}

export const topCinemaBoardDescription = new TopCinemaBoardDescription()
