import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { TheaterTileId } from '@gamepark/popcorn/material/TheaterTile'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PlaceGuestsActionRule } from '@gamepark/popcorn/rules/actions/PlaceGuestsActionRule'
import { MaterialComponent, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { guestPawnCss, logContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'
import { LogTheaterMaterialHelpLink } from '../utils/LogTheaterMaterialHelpLink'

export const GuestPlacedOnTheaterTileLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const guestMove = move as MoveItem<PlayerColor, MaterialType, LocationType>
  const rule = new PlaceGuestsActionRule(context.game, guestMove.location.player)
  const guestPawnId = rule.material(MaterialType.GuestPawns).index(guestMove.itemIndex).getItem<GuestPawn>()!.id
  const guestComponent = <MaterialComponent type={MaterialType.GuestPawns} itemId={guestPawnId} css={guestPawnCss} />
  const destinationTile = rule.material(MaterialType.TheaterTiles).index(guestMove.location.parent).getItem<Required<TheaterTileId>>()!
  const playerName = usePlayerName(guestMove.location.player)
  const previousGuest = rule
    .material(MaterialType.GuestPawns)
    .location(LocationType.GuestPawnSpotOnTheaterTile)
    .location((l) => l.x === guestMove.location.x)
    .parent(guestMove.location.parent)
    .index((index) => index !== guestMove.itemIndex)
    .getItem<GuestPawn>()
  const previousGuestComponent =
    previousGuest !== undefined ? <MaterialComponent type={MaterialType.GuestPawns} itemId={previousGuest.id} css={guestPawnCss} /> : <></>
  const tileComponent = <LogTheaterMaterialHelpLink theaterTile={destinationTile} />
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.showingsPhase.placeGuestOnTheaterTile"
        values={{
          player: playerName,
          destinationSeatSpot: guestMove.location.x,
          replaceGuest: rule.action.placeOneGuest && previousGuest !== undefined
        }}
        components={{ guest: guestComponent, theater: tileComponent, previousGuest: previousGuestComponent }}
      />
    </div>
  )
}
