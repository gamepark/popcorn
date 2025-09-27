import { faBan, faHandPointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Actions } from '@gamepark/popcorn/material/Actions/Actions'
import { ActionType } from '@gamepark/popcorn/material/Actions/ActionType'
import { isPassCurrentActionCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { Memory } from '@gamepark/popcorn/Memory'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { ItemContext, ItemMenuButton, TokenDescription } from '@gamepark/react-game'
import { isSelectItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import React from 'react'
import blueGuestPawn from '../images/GuestPawns/BlueGuestPawn.png'
import greenGuestPawn from '../images/GuestPawns/GreenGuestPawn.png'
import redGuestPawn from '../images/GuestPawns/RedGuestPawn.png'
import whiteGuestPawn from '../images/GuestPawns/WhiteGuestPawn.png'
import yellowGuestPawn from '../images/GuestPawns/YellowGuestPawn.png'

class GuestPawnDescription extends TokenDescription<PlayerColor, MaterialType, LocationType, GuestPawn> {
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

  public isMenuAlwaysVisible(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): boolean {
    if (context.player !== undefined) {
      if (context.rules.game.rule?.id === RuleId.ShowingsPhaseRule && context.rules.game.players.includes(context.player)) {
        const pendingActions = context.rules.remind<Actions[]>(Memory.PendingActions, context.player)
        return pendingActions.length > 0 && pendingActions[0].type === ActionType.ChooseSeatAction
      }
    }
    return super.isMenuAlwaysVisible(item, context)
  }

  public getItemMenu(
    item: MaterialItem<PlayerColor, LocationType>,
    context: ItemContext<PlayerColor, MaterialType, LocationType>,
    _legalMoves: MaterialMove<PlayerColor, MaterialType, LocationType>[]
  ): React.ReactNode {
    if (context.player !== undefined) {
      if (context.rules.game.rule?.id === RuleId.ShowingsPhaseRule && context.rules.game.players.includes(context.player)) {
        const pendingActions = context.rules.remind<Actions[]>(Memory.PendingActions, context.player)
        if (pendingActions.length > 0) {
          const pendingAction = pendingActions[0]
          if (pendingAction.type === ActionType.ChooseSeatAction && pendingAction.guestIndex === context.index) {
            const currentItemIndex = context.rules
              .material(MaterialType.GuestPawns)
              .location(item.location.type)
              .parent(item.location.parent)
              .id(item.id)
              .getIndex()
            const selectCurrentGuestMoves = _legalMoves
              .filter(isSelectItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns))
              .filter((move) => move.itemIndex === currentItemIndex)
            const passCurrentGuestMoves = _legalMoves.filter(isPassCurrentActionCustomMove)
            return passCurrentGuestMoves.length > 0 && selectCurrentGuestMoves.length > 0 ? (
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
            ) : undefined
          }
        }
      }
    }
    return super.getItemMenu(item, context, _legalMoves)
  }
}

export const guestPawnDescription = new GuestPawnDescription()
