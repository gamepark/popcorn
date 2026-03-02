import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { getRelativePlayerIndex, HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { offsetPlayerCinemaBoardCoordinates } from './utils/PlayerItemsUtils.ts'

class AwardCardsHandLocator extends HandLocator<PlayerColor, MaterialType, LocationType> {
  radius = 100
  maxAngle = 5
  gapMaxAngle = 2
  clockwise = true

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    return offsetPlayerCinemaBoardCoordinates(context, location.player, 16, 0)
  }

  public getBaseAngle(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    return getRelativePlayerIndex(context, location.player) % 2 == 0 ? 90 : -90
  }

  public getItemRotateZ(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): number {
    return getRelativePlayerIndex(context, item.location.player) % 2 == 0 ? 0 : 180
  }
}

export const awardCardsHandLocator = new AwardCardsHandLocator()
