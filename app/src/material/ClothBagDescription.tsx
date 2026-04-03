import { css } from '@emotion/react'
import { Actions } from '@gamepark/popcorn/material/Actions/Actions'
import { ActionType } from '@gamepark/popcorn/material/Actions/ActionType'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { isPopcornMoveItemType } from '@gamepark/popcorn/material/PopcornMoves'
import { Memory } from '@gamepark/popcorn/Memory'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import {
  FlatMaterialDescription,
  getRelativePlayerIndex,
  ItemContext,
  ItemMenuButton,
  MaterialComponent,
  MaterialContext,
  usePlayerName
} from '@gamepark/react-game'
import { MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { groupBy, uniqBy } from 'es-toolkit'
import React from 'react'
import { Trans } from 'react-i18next'
import clothBag from '../images/Bag.png'
import { ClothBagHelp } from './help/ClothBagHelp'

class ClothBagDescription extends FlatMaterialDescription<PlayerColor, MaterialType, LocationType, undefined, RuleId, PlayerColor> {
  image = clothBag
  width = 7.6
  height = 6.7
  transparency = true
  help = ClothBagHelp

  public getStaticItems(
    _context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): MaterialItem<PlayerColor, LocationType, undefined>[] {
    return _context.rules.players.map(
      (playerColor) =>
        ({
          location: {
            type: LocationType.PlayerClothBagSpot,
            player: playerColor
          }
        }) as MaterialItem<PlayerColor, LocationType, undefined>
    )
  }

  public getItemMenu(
    item: MaterialItem<PlayerColor, LocationType, undefined>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    legalMoves: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[]
  ): React.ReactNode {
    if (
      context.player !== undefined &&
      context.rules.game.rule?.id === RuleId.BuyingPhaseRule &&
      context.player === item.location.player &&
      (context.rules.game.view === undefined || context.rules.game.view === context.player)
    ) {
      const playerPendingActions = context.rules.remind<Actions[]>(Memory.PendingActions, context.player)
      if (playerPendingActions.length > 0) {
        const nextPendingAction = playerPendingActions[0]
        if (nextPendingAction.type === ActionType.PickReserveOrExitZoneGuest && nextPendingAction.guest !== GuestPawn.White) {
          return this.getItemMenuForPickReserveOrExitZoneGuest(item, context, legalMoves)
        }
      }
    }
    return super.getItemMenu(item, context, legalMoves)
  }
  private getItemMenuForPickReserveOrExitZoneGuest = (
    item: MaterialItem<PlayerColor, LocationType, undefined>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    legalMoves: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[]
  ) => {
    const movesToBag = uniqBy(
      legalMoves
        .filter(isPopcornMoveItemType(MaterialType.GuestPawns))
        .filter(
          (move) =>
            move.location.type === LocationType.PlayerGuestPawnsUnderClothBagSpot &&
            move.location.player === item.location.player &&
            LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard ===
              context.rules.material(MaterialType.GuestPawns).index(move.itemIndex).getItem()!.location.type
        ),
      (move) => {
        const guest = context.rules.material(MaterialType.GuestPawns).index(move.itemIndex).getItem()!
        return `g-${guest.id}-p-${guest.location.player}`
      }
    )
    const movesByPlayer = groupBy(
      movesToBag,
      (move) => context.rules.material(MaterialType.GuestPawns).index(move.itemIndex).getItem<GuestPawn>()!.location.player!
    )
    return movesToBag.length > 0 ? (
      <>
        {Object.entries(movesByPlayer).flatMap(([, moves]) => {
          return moves.map((move, index) => {
            const guest = context.rules.material(MaterialType.GuestPawns).index(move.itemIndex).getItem()!
            const player = guest.location.player!
            const playerIndex = getRelativePlayerIndex(context, player) - 1
            const playerName = usePlayerName(player)
            return (
              <ItemMenuButton
                key={`guest-p-${playerIndex}-m-${index}`}
                move={move}
                x={3 - 1.5 * index}
                y={-1.25 * (context.rules.game.players.length - 2) + playerIndex * 2.5}
                css={css`
                  width: 1.5em;
                  height: 1.5em;
                `}
                labelPosition="right"
                label={index === 0 ? <Trans i18nKey="" defaults="Pick from {player}'s exit zone" values={{ player: playerName }} /> : undefined}
              >
                <MaterialComponent
                  type={MaterialType.GuestPawns}
                  itemId={guest.id}
                  css={css`
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 0.5em;
                  `}
                />
              </ItemMenuButton>
            )
          })
        })}
      </>
    ) : undefined
  }
}

export const clothBagDescription = new ClothBagDescription()
