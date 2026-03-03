import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { getRelativePlayerIndex, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

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

export const getPlayerItemRotateZ = (
  location: Location<PlayerColor, LocationType>,
  context: MaterialContext<PlayerColor, MaterialType, LocationType>
): number => {
  switch (context.rules.players.length) {
    case 2:
    case 3:
      return getRelativePlayerIndex(context, location.player) === 0 ? 0 : 180
    case 4:
      return getRelativePlayerIndex(context, location.player) < 2 ? 0 : 180
    default:
      throw new Error('Invalid number of players')
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
