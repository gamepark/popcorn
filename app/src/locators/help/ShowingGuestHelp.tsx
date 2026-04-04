import { css } from '@emotion/react'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { isPopcornMoveItemType, PopcornMove } from '@gamepark/popcorn/material/PopcornMoves'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { LocationHelpProps, MaterialComponent, PlayMoveButton, useLegalMoves, useMaterialContext, usePlayerName, useRules } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const ShowingGuestHelp: FC<LocationHelpProps<PlayerColor, LocationType>> = ({ location }) => {
  const playerName = usePlayerName(location.player)
  const context = useMaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>()
  const legalMoves = useLegalMoves<PopcornMove>(isPopcornMoveItemType(MaterialType.GuestPawns)) as MoveItem<MaterialType>[]
  const rules = useRules<PopcornRules>()
  const guestPawnMaterial = rules?.material(MaterialType.GuestPawns).location(LocationType.PlayerShowingsDrawnGuestSpot).player(location.player)
  const tileMaterial = rules?.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard).player(location.player)
  const guestIndexes = guestPawnMaterial?.getIndexes() ?? []
  return (
    <div
      css={css`
        min-width: 65vw;
      `}
    >
      <h2>
        <Trans i18nKey="help.location.guestPawn.showingsGuest.title" values={{ player: playerName }} />
      </h2>
      <p>
        <Trans i18nKey="help.location.guestPawn.showingsGuest.description" values={{ player: playerName }} />
      </p>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(${Math.min(guestIndexes.length, 4)}, 1fr);
          grid-column-gap: 1em;
        `}
      >
        {guestIndexes.map((guestIndex, index) => {
          const guest = guestPawnMaterial?.index(guestIndex).getItem<GuestPawn>()
          const movesForGuest = legalMoves.filter((move) => move.itemIndex === guestIndex)
          return (
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.25em;
              `}
            >
              <MaterialComponent
                key={`showings-guest-${index}`}
                type={MaterialType.GuestPawns}
                itemId={guest?.id ?? GuestPawn.White}
                css={css`
                  font-size: 2.5em;
                `}
              />
              {context.player !== undefined &&
                context.player === location.player &&
                movesForGuest.map((move, moveIndex) => {
                  const parentTile = tileMaterial?.index(move.location.parent).getItem()
                  return (
                    <PlayMoveButton key={`showings-guest-${index}-m-${moveIndex}`} move={move}>
                      <Trans
                        i18nKey="help.location.guestPawn.showingsGuest.moveButton"
                        values={{ destinationSeat: move.location.x, destinationTile: parentTile?.location.x }}
                      />
                    </PlayMoveButton>
                  )
                })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
