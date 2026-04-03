import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { isPopcornCreateItemType, isPopcornMoveItemType, isPopcornMoveItemTypeAtOnce } from '@gamepark/popcorn/material/PopcornMoves'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { and, MaterialGameAnimations, not, or } from '@gamepark/react-game'
import {
  clothBagWaypoints,
  fromPanelToAnotherPanelTrajectory,
  fromPanelToClothBagTrajectory,
  fromPanelTrajectory,
  popcornWayPoints,
  toPanelTrajectory,
  viewableBuyMovieTrajectory,
  viewableToMovieArchiveTrajectory
} from './utils/popcornTrajectory.util'
import { PopcornAnimationPredicate } from './utils/popcornAnimationTypes.util'
import {
  isCreateItemMoveNotViewableByDisplayedPlayer,
  isDeleteItemTypeNotViewableByDisplayedPlayer,
  isDestinationViewableByDisplayedPlayer
} from './utils/animationPredicates/commonAnimationPredicates.util'
import {
  isGuestMoveNotViewableByDisplayedPlayer,
  isGuestPawnFromNotDisplayedPlayerToDisplayedBagMove,
  isGuestPawnFromNotDisplayedPlayerToReserveMove,
  isGuestPawnMoveBetweenTwoNotDisplayedPlayers,
  isNotViewableGuestPawnFromReserveOrExitZoneToBagMove,
  isViewableGuestPawnFromBagToExitZoneMove,
  isViewableGuestPawnFromBagToShowingsReserveMove,
  isViewableGuestPawnFromReserveOrExitZoneToBagMove
} from './utils/animationPredicates/guestPawnMovesAnimationPredicates.util'
import {
  isMovieCardToPlayerPanelMove,
  isNotViewableMovieCardMove,
  isViewableBuyMovieCardMove,
  isViewableMovieCardToArchiveMove
} from './utils/animationPredicates/movieCardMovesAnimationPredicates.util'
import { isNotViewableDiscardAwardCardMove, isNotViewableDrawAwardCardMove } from './utils/animationPredicates/awardCardMovesAnimationPredicate.util'
import {
  isNotViewableBuyTheaterTileMove,
  isNotViewableReturnTheaterTileToDeckOrRowMove
} from './utils/animationPredicates/theaterTilesMovesAnimationPredicates.util'
import {
  isNotViewableAdvertisingTokenFromBoardToPlayerMove,
  isNotViewableAdvertisingTokenFromPlayerToBoardMove
} from './utils/animationPredicates/advertisingTokenMovesAnimationPredicates.utils'
import {
  isFirstPlayerMarkerBetweenTwoNotDisplayedPlayersMove,
  isFirstPlayerMarkerFromDisplayedPlayerToNotDisplayedPlayerMove,
  isFirstPlayerMarkerFromNotDisplayedPlayerToDisplayedPlayerMove
} from './utils/animationPredicates/firstPlayerMarkerMovesAnimationPredicates.util'

export const popcornAnimations = new MaterialGameAnimations<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>()

const isLobbySliderMoveNotViewableByDisplayedPlayer: PopcornAnimationPredicate = and(
  or(isPopcornMoveItemType(MaterialType.LobbySliders), isPopcornMoveItemTypeAtOnce(MaterialType.LobbySliders)),
  not(isDestinationViewableByDisplayedPlayer)
)

// Award card move to player panel
popcornAnimations.configure(isNotViewableDrawAwardCardMove).trajectory(toPanelTrajectory)

// Award card move from player panel
popcornAnimations.configure(isNotViewableDiscardAwardCardMove).trajectory(fromPanelTrajectory)

// Buy Movie Card move
popcornAnimations.configure(isViewableBuyMovieCardMove).trajectory(viewableBuyMovieTrajectory)

// Movie card to player archive move
popcornAnimations.configure(isViewableMovieCardToArchiveMove).trajectory(viewableToMovieArchiveTrajectory)

// Theater tile move to panel
popcornAnimations.configure(isNotViewableBuyTheaterTileMove).trajectory(toPanelTrajectory)

//Theater tile move from panel
popcornAnimations.configure(isNotViewableReturnTheaterTileToDeckOrRowMove).trajectory(fromPanelTrajectory)

// Money or popcorn move to player panel (players not displayed)
popcornAnimations
  .configure(
    or(
      isMovieCardToPlayerPanelMove,
      isCreateItemMoveNotViewableByDisplayedPlayer(MaterialType.PopcornTokens),
      isCreateItemMoveNotViewableByDisplayedPlayer(MaterialType.MoneyTokens)
    )
  )
  .trajectory(toPanelTrajectory)

// Guest pawn from reserve or exit zone to bag for displayed
popcornAnimations.configure(isViewableGuestPawnFromReserveOrExitZoneToBagMove).through(...clothBagWaypoints('to'))

// Guest pawn from reserve or exit zone to bag of other player
popcornAnimations.configure(isNotViewableGuestPawnFromReserveOrExitZoneToBagMove).trajectory(toPanelTrajectory)

// Guest pawn move from bag to showings reserve
popcornAnimations.configure(isViewableGuestPawnFromBagToShowingsReserveMove).through(...clothBagWaypoints('from'))

// Guest pawn move from bag to exit zone (cannot place guest or final end of round)
popcornAnimations.configure(isViewableGuestPawnFromBagToExitZoneMove).through(...clothBagWaypoints('from'))

// Guest pawn moves coming from other players
popcornAnimations.configure(isGuestPawnFromNotDisplayedPlayerToDisplayedBagMove).trajectory(fromPanelToClothBagTrajectory)

popcornAnimations.configure(isGuestPawnFromNotDisplayedPlayerToReserveMove).trajectory(fromPanelTrajectory)

// Guest moves between to different players
popcornAnimations.configure(isGuestPawnMoveBetweenTwoNotDisplayedPlayers).trajectory(fromPanelToAnotherPanelTrajectory)

// Popcorn to displayed cup
popcornAnimations.configure(and(isPopcornCreateItemType(MaterialType.PopcornTokens), isDestinationViewableByDisplayedPlayer)).through(...popcornWayPoints('to'))

// Money from panel to pile
popcornAnimations.configure(isDeleteItemTypeNotViewableByDisplayedPlayer(MaterialType.MoneyTokens)).trajectory(fromPanelTrajectory)

// Advertising token move to player panel
popcornAnimations.configure(isNotViewableAdvertisingTokenFromBoardToPlayerMove).trajectory(toPanelTrajectory)

// Advertising token move from player panel
popcornAnimations.configure(isNotViewableAdvertisingTokenFromPlayerToBoardMove).trajectory(fromPanelTrajectory)

// First player token move to panel
popcornAnimations.configure(isFirstPlayerMarkerFromDisplayedPlayerToNotDisplayedPlayerMove).trajectory(toPanelTrajectory)

// First player token move between to players not displayed
popcornAnimations.configure(isFirstPlayerMarkerBetweenTwoNotDisplayedPlayersMove).trajectory(fromPanelToAnotherPanelTrajectory)

// First player token move from panel
popcornAnimations.configure(isFirstPlayerMarkerFromNotDisplayedPlayerToDisplayedPlayerMove).trajectory(fromPanelTrajectory)

// Skip animations that cannot be viewed
popcornAnimations.configure(or(isLobbySliderMoveNotViewableByDisplayedPlayer, isNotViewableMovieCardMove, isGuestMoveNotViewableByDisplayedPlayer)).skip()
