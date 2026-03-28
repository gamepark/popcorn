import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { TheaterTileId, theaterTilesCharacteristics } from '@gamepark/popcorn/material/TheaterTile.ts'
import { ShowingsPhaseRule } from '@gamepark/popcorn/rules/ShowingsPhaseRule.ts'
import { MaterialComponent, Picture, usePlayerName } from '@gamepark/react-game'
import { SelectItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { actionSymbols } from '../../../material/utils/seatActionSymbols.util.ts'
import { guestPawnCss, logContainerCss, symbolCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'
import { LogTheaterMaterialHelpLink } from '../utils/LogTheaterMaterialHelpLink.tsx'

export const SeatActionTakenLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const guestMove = move as SelectItem<MaterialType>
  const rule = new ShowingsPhaseRule(context.game)
  const guest = rule.material(MaterialType.GuestPawns).index(guestMove.itemIndex).getItem<GuestPawn>()!
  const guestComponent = <MaterialComponent type={MaterialType.GuestPawns} itemId={guest.id} css={guestPawnCss} />
  const playerName = usePlayerName(guest.location.player)
  const theaterTile = rule
    .material(MaterialType.TheaterTiles)
    .location((l) => l.type === LocationType.TheaterTileSpotOnTopPlayerCinemaBoard && l.x === guest.location.x && l.player === guest.location.player)
    .getItem<Required<TheaterTileId>>()!
  const theaterTileLinkComponent = <LogTheaterMaterialHelpLink theaterTile={theaterTile} />
  const seatAction = theaterTilesCharacteristics[theaterTile.id.front].getSeatAction(guest.location.x!)!
  const seatActionComponent = <Picture src={actionSymbols[seatAction]} css={symbolCss} />

  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.showigsPhase.seatAction"
        defaults="Using <guest/>, {player} takes the {seatNumber, select, 0{first} 1{second} 2{third} other{}} Seat Action ( <action/> ) of their <theater/>"
        values={{ player: playerName, seatNumber: guest.location.x }}
        components={{ guest: guestComponent, action: seatActionComponent, theater: theaterTileLinkComponent }}
      />
    </div>
  )
}
