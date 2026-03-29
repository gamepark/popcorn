import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { isPopcornMoveItemType, isPopcornMoveItemTypeAtOnce, isPopcornShuffleItemType } from '@gamepark/popcorn/material/PopcornMoves'
import { ShowingsPhaseRule } from '@gamepark/popcorn/rules/ShowingsPhaseRule'
import { MaterialComponent, usePlayerName } from '@gamepark/react-game'
import { MoveItem, MoveItemsAtOnce } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { guestPawnCss, logContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'

export const DrawGuestsLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const playerName = usePlayerName((move as MoveItem | MoveItemsAtOnce).location.player)
  const rule = new ShowingsPhaseRule(context.game)
  const guestMaterial = rule.material(MaterialType.GuestPawns)
  if (isPopcornMoveItemTypeAtOnce(MaterialType.GuestPawns)(move)) {
    const player = move.location.player!
    const numberOfGuestsDrawn = move.indexes.length
    const numberOfGuestsToDraw = rule.getNumberOfGuestsToDraw(player)
    const playerGuestPawnMaterial = guestMaterial.player(player)
    const exitZoneGuestsNumber = playerGuestPawnMaterial.location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard).length
    const guestDrawnComponents = (
      <>
        {move.indexes
          .map((guestIndex) =>
            move.reveal !== undefined ? (move.reveal[guestIndex].id as GuestPawn) : guestMaterial.index(guestIndex).getItem<GuestPawn>()!.id
          )
          .map((id, index) => (
            <MaterialComponent
              key={`a-${context.action.id}-c-${context.consequenceIndex}-g-${index}`}
              type={MaterialType.GuestPawns}
              itemId={id}
              css={guestPawnCss}
            />
          ))}
      </>
    )
    const previousConsequences = context.action.consequences.slice(0, context.consequenceIndex ?? 0)
    const isFirstDrawMoveForPlayer =
      context.consequenceIndex === 0 ||
      previousConsequences
        .filter(isPopcornMoveItemTypeAtOnce(MaterialType.GuestPawns))
        .some((m) => m.location.type === move.location.type && m.location.player === move.location.player)
    const existsPreviousShuffleConsequence = previousConsequences.filter(isPopcornShuffleItemType(MaterialType.GuestPawns)).some((m) => {
      const pawn = guestMaterial.index(m.indexes[0]).getItem()
      return pawn?.location.type === LocationType.PlayerGuestPawnsUnderClothBagSpot && pawn.location.player === player
    })
    const transValues = {
      player: playerName,
      audience: numberOfGuestsToDraw,
      numberOfGuestsDrawn,
      existsPreviousShuffleConsequence: existsPreviousShuffleConsequence ? 1 : 0
    }
    const transComponents = { guests: guestDrawnComponents }
    if (isFirstDrawMoveForPlayer && !existsPreviousShuffleConsequence) {
      if (numberOfGuestsToDraw === numberOfGuestsDrawn || exitZoneGuestsNumber > 0) {
        return (
          <div css={logContainerCss}>
            <Trans
              i18nKey="log.showingsPhase.placeGuest.firstGuestDraw"
              defaults="{player}'s audience is {audience, plural, =1{# Guest} other{# Guests}}. {player} draws {numberOfGuestsDrawn, plural, =1{# Guest} other{# Guests}} from their bag: <guests/>"
              values={transValues}
              components={transComponents}
            />
          </div>
        )
      } else {
        return (
          <div css={logContainerCss}>
            <Trans
              i18nKey="log.showingsPhase.placeGuest.firstGuestDrawNotEnough"
              defaults="{player}'s audience is {audience, plural, =1{# Guest} other{# Guests}}. {player} draws {numberOfGuestsDrawn, plural, =1{# Guest} other{# Guests}} from their bag: <guests/>. {player} cannot draw anymore Guests as their exit zone is empty"
              values={transValues}
              components={transComponents}
            />
          </div>
        )
      }
    } else {
      const numberOfGuestsAlreadyDrawn = playerGuestPawnMaterial.location(LocationType.PlayerShowingsDrawnGuestSpot).length
      if (numberOfGuestsAlreadyDrawn + numberOfGuestsDrawn === numberOfGuestsToDraw) {
        return (
          <div css={logContainerCss}>
            <Trans
              i18nKey="log.showingsPhase.placeGuest.secondGuestDraw"
              defaults="{player} draws{existsPreviousShuffleConsequence, plural, =1{ another} other{}} {numberOfGuestsDrawn, plural, =1{# Guest} other{# Guests}} from their bag: <guests/>"
              values={transValues}
              components={transComponents}
            />
          </div>
        )
      } else {
        return (
          <div css={logContainerCss}>
            <Trans
              i18nKey="log.showingsPhase.placeGuest.secondGuestDrawNotEnough"
              defaults="{player} draws{existsPreviousShuffleConsequence, plural, =1{ another} other{}} {numberOfGuestsDrawn, plural, =1{# Guest} other{# Guests}} from their bag: <guests/>. {player} cannot draw anymore Guests as their exit zone is empty"
              values={transValues}
              components={transComponents}
            />
          </div>
        )
      }
    }
  }
  if (isPopcornMoveItemType(MaterialType.GuestPawns)(move)) {
    const guestComponent = (
      <MaterialComponent
        type={MaterialType.GuestPawns}
        itemId={move.reveal !== undefined ? move.reveal.id : guestMaterial.index(move.itemIndex).getItem<GuestPawn>()!.id}
        css={guestPawnCss}
      />
    )
    return (
      <div css={logContainerCss}>
        <Trans
          i18nKey="log.showingsPhase.placeGuest.drawOneGuest"
          defaults="{player} draws <guest/> from their bag{destination, select, guestPawnExitZoneSpotOnTopPlayerCinemaBoard{, but cannot place it. {player} sends it to their exit zone} other{}}"
          values={{ player: playerName, destination: camelCase(LocationType[move.location.type!]) }}
          components={{ guest: guestComponent }}
        />
      </div>
    )
  }
  return <></>
}
