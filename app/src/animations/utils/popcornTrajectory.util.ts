import { ItemContext, Trajectory, Waypoint } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { playerGuestPawnUnderClothBagLocator } from '../../locators/PlayerGuestPawnUnderClothBagLocator.ts'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { isPopcornCreateItem, isPopcornDeleteItem, isPopcornMoveItem, isPopcornMoveItemsAtOnce, PopcornMove } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { movieCardOnBottomPlayerCinemaBoardLocator } from '../../locators/MovieCardOnBottomPlayerCinemaBoardLocator.ts'
import { playerPopcornPileLocator } from '../../locators/PlayerPopcornPileLocator.ts'
import { onPlayerPanelLocator } from '../../locators/OnPlayerPanelLocator.ts'
import { besidePlayerPanelLocator } from '../../locators/BesidePlayerPanelLocator.ts'

const combineTrajectoriesWaypoints: (
  ...trajectories: ((
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    move: PopcornMove
  ) => Trajectory<PlayerColor, MaterialType, LocationType>)[]
) => (
  context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
  move: PopcornMove
) => Trajectory<PlayerColor, MaterialType, LocationType> =
  (...trajectories) =>
  (context, move) => ({
    waypoints: trajectories.flatMap((trajectory) => trajectory(context, move).waypoints ?? [])
  })
export const toPanelTrajectory = (
  _context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
  move: PopcornMove
): Trajectory<PlayerColor, MaterialType, LocationType> => {
  if (!isPopcornMoveItem(move) && !isPopcornMoveItemsAtOnce(move) && !isPopcornCreateItem(move)) {
    throw new Error('Invalid move to animate')
  }
  return {
    waypoints: [
      { at: 0.75, locator: besidePlayerPanelLocator, location: { player: 'location' in move ? move.location.player : move.item.location.player } },
      { at: 1, locator: onPlayerPanelLocator, location: { player: 'location' in move ? move.location.player : move.item.location.player } }
    ]
  }
}
export const fromPanelTrajectory = (
  context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
  move: PopcornMove
): Trajectory<PlayerColor, MaterialType, LocationType> => {
  if (!isPopcornMoveItem(move) && !isPopcornDeleteItem(move)) {
    throw new Error('Error')
  }
  const movedItem = context.rules.material(move.itemType).index(move.itemIndex).getItem()!
  const originPlayer = movedItem.location.player
  return {
    waypoints: [
      { at: 0, locator: onPlayerPanelLocator, location: { player: originPlayer } },
      { at: 0.25, locator: besidePlayerPanelLocator, location: { player: originPlayer } }
    ]
  }
}
export const fromPanelToAnotherPanelTrajectory = combineTrajectoriesWaypoints(fromPanelTrajectory, toPanelTrajectory)
export const clothBagWaypoints: (direction: 'to' | 'from') => Waypoint<PlayerColor, MaterialType, LocationType>[] = (direction) =>
  direction === 'from'
    ? [
        { at: 0, elevation: 0 },
        { at: 0.25, locator: playerGuestPawnUnderClothBagLocator, location: { y: -3 }, elevation: 0 },
        { at: 0.26, locator: playerGuestPawnUnderClothBagLocator, location: { y: -3 }, elevation: 2 }
      ]
    : [
        { at: 0.74, locator: playerGuestPawnUnderClothBagLocator, location: { y: -3 }, elevation: 2 },
        { at: 0.75, locator: playerGuestPawnUnderClothBagLocator, location: { y: -3 }, elevation: 0 },
        { at: 1, elevation: 0 }
      ]
export const popcornWayPoints: (direction: 'to' | 'from') => Waypoint<PlayerColor, MaterialType, LocationType>[] = (direction) => [
  { at: 0, elevation: 0 },
  { at: direction === 'from' ? 0.25 : 0.75, locator: playerPopcornPileLocator, location: { y: -3 } }
]
export const fromPanelToClothBagTrajectory = (
  context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
  move: PopcornMove
): Trajectory<PlayerColor, MaterialType, LocationType> => ({
  waypoints: fromPanelTrajectory(context, move).waypoints?.concat(clothBagWaypoints('to')) ?? []
})
export const viewableToMovieArchiveTrajectory = (context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>, move: PopcornMove) => {
  if (!isPopcornMoveItem(move) && !isPopcornMoveItemsAtOnce(move)) {
    throw new Error('animation filtering logic error')
  }
  const currentLocation = context.rules
    .material(MaterialType.MovieCards)
    .index('indexes' in move ? move.indexes : move.itemIndex)
    .getItem()!.location
  return {
    waypoints: [
      { at: 0, elevation: 0 },
      { at: 0.25, elevation: 0, locator: movieCardOnBottomPlayerCinemaBoardLocator, location: { ...currentLocation, y: -5 } },
      { at: 0.26, elevation: 2, locator: movieCardOnBottomPlayerCinemaBoardLocator, location: { ...currentLocation, y: -4.9 } }
    ]
  }
}

export const viewableBuyMovieTrajectory = (_context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>, move: PopcornMove) => {
  if (!isPopcornMoveItem(move)) {
    throw new Error('animation filtering logic error')
  }
  return {
    waypoints: [
      {
        at: 0.74,
        locator: movieCardOnBottomPlayerCinemaBoardLocator,
        location: { player: move.location.player, x: move.location.x, y: -5.1 },
        elevation: 2
      },
      {
        at: 0.75,
        locator: movieCardOnBottomPlayerCinemaBoardLocator,
        location: { player: move.location.player, x: move.location.x, y: -5 },
        elevation: 0
      },
      { at: 1, locator: movieCardOnBottomPlayerCinemaBoardLocator, location: move.location, elevation: 0 }
    ]
  }
}
