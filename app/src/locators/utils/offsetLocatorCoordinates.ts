import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { MaterialContext } from '@gamepark/react-game'

const offsetOtherLocatorCoordinates = (
  context: MaterialContext<PlayerColor, MaterialType, LocationType>,
  locationType: LocationType,
  player: PlayerColor | undefined,
  xOffset: number,
  yOffset: number,
  isPlayerItemLocator: boolean
) => {
  const location = isPlayerItemLocator
    ? {
        type: locationType,
        player: player
      }
    : {
        type: locationType
      }
  const locatorCoordinates = context.locators[locationType]?.getCoordinates(location, context)
  return {
    x: (locatorCoordinates?.x ?? 0) + xOffset,
    y: (locatorCoordinates?.y ?? 0) + yOffset
  }
}

export const offsetPlayerCinemaBoardCoordinates = (
  context: MaterialContext<PlayerColor, MaterialType, LocationType>,
  player: PlayerColor | undefined,
  xOffset: number,
  yOffset: number
) => offsetOtherLocatorCoordinates(context, LocationType.BottomPlayerCinemaBoardSpot, player, xOffset, yOffset, true)

export const offsetAdvertisingBoardCoordinates = (context: MaterialContext<PlayerColor, MaterialType, LocationType>, xOffset: number, yOffset: number) =>
  offsetOtherLocatorCoordinates(context, LocationType.AdvertisingBoardSpot, undefined, xOffset, yOffset, false)

export const offsetPremiersTileCoordinates = (context: MaterialContext<PlayerColor, MaterialType, LocationType>, xOffset: number, yOffset: number) =>
  offsetOtherLocatorCoordinates(context, LocationType.PremiersTileSpot, undefined, xOffset, yOffset, false)
