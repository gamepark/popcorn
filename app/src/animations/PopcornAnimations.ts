import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { MaterialGameAnimations } from '@gamepark/react-game'

export const popcornAnimations = new MaterialGameAnimations<PlayerColor, MaterialType, LocationType>()

// popcornAnimations
//   .when()
//   .move(
//     (move) =>
//       isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.MovieCards)(move) &&
//       move.location.type === LocationType.MovieCardSpotOnBottomPlayerCinemaBoard &&
//       move.location.y === 0
//   )
//   .duration(0)
