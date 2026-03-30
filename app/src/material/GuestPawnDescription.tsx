import { faBan, faHandPointDown, faHandPointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Actions } from '@gamepark/popcorn/material/Actions/Actions'
import { ActionType } from '@gamepark/popcorn/material/Actions/ActionType'
import { isPassCurrentActionCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { isPopcornMoveItemType, PopcornMove } from '@gamepark/popcorn/material/PopcornMoves'
import { Memory } from '@gamepark/popcorn/Memory'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { ItemContext, ItemMenuButton, TokenDescription } from '@gamepark/react-game'
import { isMoveItemType, isSelectItemType, Location, MaterialItem, MaterialMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import blueGuestPawn from '../images/GuestPawns/BlueGuestPawn.png'
import greenGuestPawn from '../images/GuestPawns/GreenGuestPawn.png'
import redGuestPawn from '../images/GuestPawns/RedGuestPawn.png'
import whiteGuestPawn from '../images/GuestPawns/WhiteGuestPawn.png'
import yellowGuestPawn from '../images/GuestPawns/YellowGuestPawn.png'
import { bottomCinemaBoardLocator } from '../locators/BottomCinemaBoardLocator'
import { guestPawnOnTheaterTileLocator } from '../locators/GuestPawnOnTheaterTileLocator'
import { theaterTileOnCinemaBoardLocator } from '../locators/TheaterTileOnTopCinemaBoardLocator'
import { GuestPawnHelp } from './help/GuestPawnHelp'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp

class GuestPawnDescription extends TokenDescription<PlayerColor, MaterialType, LocationType, GuestPawn, RuleId, PlayerColor> {
  width = 1.8
  height = 1.8
  transparency = true

  images = {
    [GuestPawn.Blue]: blueGuestPawn,
    [GuestPawn.Green]: greenGuestPawn,
    [GuestPawn.Red]: redGuestPawn,
    [GuestPawn.White]: whiteGuestPawn,
    [GuestPawn.Yellow]: yellowGuestPawn
  }

  help = GuestPawnHelp

  public isMenuAlwaysVisible(
    item: MaterialItem<PlayerColor, LocationType, GuestPawn>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): boolean {
    if (context.player !== undefined) {
      if (context.rules.game.rule?.id === RuleId.ShowingsPhaseRule && context.rules.game.players.includes(context.player)) {
        const pendingActions = context.rules.remind<Actions[]>(Memory.PendingActions, context.player)
        return pendingActions.length > 0 && pendingActions[0].type === ActionType.ChooseSeatAction
      }
    }
    return super.isMenuAlwaysVisible(item, context)
  }

  public getItemMenu(
    item: MaterialItem<PlayerColor, LocationType, GuestPawn>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    legalMoves: PopcornMove[]
  ): React.ReactNode {
    if (context.player !== undefined) {
      const pendingActions = context.rules.remind<Actions[]>(Memory.PendingActions, context.player)
      const nextPendingAction = pendingActions[0]
      if (
        nextPendingAction !== undefined &&
        nextPendingAction.type === ActionType.PickReserveOrExitZoneGuest &&
        nextPendingAction.guest === GuestPawn.White &&
        item.id === GuestPawn.White &&
        (item.location.type === LocationType.GuestPawnReserveSpot ||
          (item.location.type === LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard && item.location.player === context.player))
      ) {
        return this.getWhiteGuestToBagItemMenu(context, legalMoves)
      }
      if (context.rules.game.rule?.id === RuleId.ShowingsPhaseRule && context.rules.game.players.includes(context.player)) {
        if (nextPendingAction !== undefined && nextPendingAction.type === ActionType.ChooseSeatAction && nextPendingAction.guestIndex === context.index) {
          return this.getChooseSeatActionItemMenu(item, context, legalMoves)
        }
        if (nextPendingAction !== undefined && nextPendingAction.type === ActionType.PlaceGuests) {
          return this.getPlaceGuestItemMenu(item, context, legalMoves)
        }
      }
    }
    return super.getItemMenu(item, context, legalMoves)
  }

  public displayHelp(
    item: MaterialItem<PlayerColor, LocationType, GuestPawn>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> | undefined {
    if (
      item.location.type === LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard ||
      item.location.type === LocationType.GuestPawnReserveSpot ||
      item.location.type === LocationType.PlayerShowingsDrawnGuestSpot
    ) {
      return displayLocationHelp(item.location)
    }
    return super.displayHelp(item, context)
  }

  private getWhiteGuestToBagItemMenu(
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    legalMoves: PopcornMove[]
  ): React.ReactNode {
    const itemIndex = context.index
    const moveForItem = legalMoves.filter(isMoveItemType(MaterialType.GuestPawns)).filter((move) => move.itemIndex === itemIndex)
    if (moveForItem.length > 0) {
      const playerNumbers = moveForItem.length
      return (
        <>
          {moveForItem.map((move, moveIndex) => (
            <ItemMenuButton
              key={`guestPawn-${moveIndex}-bagMove`}
              move={move}
              x={1.25}
              y={(playerNumbers - 1 - 2 * moveIndex) * 0.75 * this.height}
              label={<Trans key={`player.${move.location.player}`} defaults={`Send to Player ${move.location.player}'s bag`} />}
              labelPosition="right"
            >
              <FontAwesomeIcon icon={faHandPointer} size="xs" />
            </ItemMenuButton>
          ))}
        </>
      )
    }
    return undefined
  }

  private getChooseSeatActionItemMenu(
    item: MaterialItem<PlayerColor, LocationType, GuestPawn>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    legalMoves: PopcornMove[]
  ): React.ReactNode {
    const currentItemIndex = context.rules.material(MaterialType.GuestPawns).location(item.location.type).parent(item.location.parent).id(item.id).getIndex()
    const selectCurrentGuestMoves = legalMoves
      .filter(isSelectItemType<MaterialType>(MaterialType.GuestPawns))
      .filter((move) => move.itemIndex === currentItemIndex)
    const passCurrentGuestMoves = legalMoves.filter(isPassCurrentActionCustomMove)
    if (passCurrentGuestMoves.length > 0 && selectCurrentGuestMoves.length > 0) {
      return (
        <>
          {selectCurrentGuestMoves.map((move) => (
            <ItemMenuButton key={`guestPawn-${move.itemIndex}-selectMove`} move={move} x={-1.25} y={this.height / 2}>
              <FontAwesomeIcon icon={faHandPointer} size="xs" />
            </ItemMenuButton>
          ))}
          {passCurrentGuestMoves.map((move) => (
            <ItemMenuButton key={`guestPawn-${currentItemIndex}-passMove`} move={move} x={1.25} y={this.height / 2}>
              <FontAwesomeIcon icon={faBan} size="xs" />
            </ItemMenuButton>
          ))}
          {this.getHelpButton(item, context, {
            x: 0,
            y: this.height / 2 + 2,
            label: ''
          })}
        </>
      )
    }
    return undefined
  }

  private getPlaceGuestItemMenu(
    item: MaterialItem<PlayerColor, LocationType, GuestPawn>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    legalMoves: PopcornMove[]
  ): React.ReactNode {
    if (item.location.type === LocationType.PlayerShowingsDrawnGuestSpot && context.player === item.location.player) {
      const movesForItem = legalMoves.filter(isPopcornMoveItemType(MaterialType.GuestPawns)).filter((move) => move.itemIndex === context.index)
      if (movesForItem.length > 0) {
        const guestCoordinates = context.locators[LocationType.PlayerShowingsDrawnGuestSpot]?.getItemCoordinates(item, context) ?? { x: 0, y: 0 }
        const boardCoordinates = bottomCinemaBoardLocator.coordinates
        const tileLocator = theaterTileOnCinemaBoardLocator
        const guestOnTileLocator = guestPawnOnTheaterTileLocator
        return (
          <>
            {movesForItem.map((move, index) => {
              const parentTile = context.rules.material(MaterialType.TheaterTiles).index(move.location.parent).getItem()!
              const tileCoordinates = tileLocator.getLocationCoordinates(
                { type: LocationType.TheaterTileSpotOnTopPlayerCinemaBoard, player: move.location.player, x: parentTile.location.x },
                context
              )
              const guestOnTileCoordinates = guestOnTileLocator.getLocationCoordinates(move.location as Location<PlayerColor, LocationType>, context)
              return (
                <ItemMenuButton
                  key={`guest-${context.index}-m-${index}`}
                  move={move}
                  x={-(guestCoordinates.x ?? 0) + boardCoordinates.x + (tileCoordinates.x ?? 0) + (guestOnTileCoordinates.x ?? 0)}
                  y={-(guestCoordinates.y ?? 0) + boardCoordinates.y + (tileCoordinates.y ?? 0) + (guestOnTileCoordinates.y ?? 0) - 1}
                >
                  <FontAwesomeIcon icon={faHandPointDown} size="lg" />
                </ItemMenuButton>
              )
            })}
          </>
        )
      }
    }
    return undefined
  }
}

export const guestPawnDescription = new GuestPawnDescription()
