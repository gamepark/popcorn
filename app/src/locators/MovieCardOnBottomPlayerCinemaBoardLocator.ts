import { isBuyMovieCardCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PopcornMove } from '@gamepark/popcorn/material/PopcornMoves'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { DropAreaDescription, ItemContext, ListLocator, LocationContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { bottomCinemaBoardDescription } from '../material/BottomCinemaBoardDescription'
import { movieCardDescription } from '../material/MovieCardDescription'
import { hideItemIfOwningPlayerIsNotDisplayed } from './utils/hideItemIfOwningPlayerIsNotDisplayed'

class MovieCardOnBottomPlayerCinemaBoardLocator extends ListLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  parentItemType = MaterialType.BottomCinemaBoard
  coordinates = { x: -7.7, y: -7.5 }
  gap = { x: 7.7, z: 0 }
  locationDescription = new MovieCardOnBottomPlayerCinemaBoardLocationDescription()

  public getParentItem(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): MaterialItem<PlayerColor, LocationType> | undefined {
    return bottomCinemaBoardDescription.getStaticItems(context).find((boardItem) => boardItem.location.player === location.player)
  }

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    const baseCoordinates = super.getCoordinates(location, context)
    return { ...baseCoordinates, y: (baseCoordinates.y ?? 0) + (location.y ?? 0) }
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return hideItemIfOwningPlayerIsNotDisplayed(item, context)
  }
}

class MovieCardOnBottomPlayerCinemaBoardLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType> {
  constructor() {
    super(movieCardDescription)
  }
  public isMoveToLocation(
    move: PopcornMove,
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): boolean {
    if (isBuyMovieCardCustomMove(move)) {
      return location.player === move.data.player && location.x === move.data.destinationSpot
    }
    return super.isMoveToLocation(move, location, context)
  }

  public getLocationTransform(
    location: Location<PlayerColor, LocationType>,
    context: LocationContext<PlayerColor, MaterialType, LocationType, number, number>
  ): string[] {
    return super.getLocationTransform(location, context).concat('translateY(-4em)')
  }
}

export const movieCardOnBottomPlayerCinemaBoardLocator = new MovieCardOnBottomPlayerCinemaBoardLocator()
