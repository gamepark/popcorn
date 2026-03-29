import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PickGuestFromReserveOrExitZoneActionRule } from '@gamepark/popcorn/rules/actions/PickGuestFromReserveOrExitZoneActionRule'
import { usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'
import { LogMovieMaterialHelpLink } from '../utils/LogMovieMaterialHelpLink'
import { MaterialComponentWithHelp } from '../utils/MaterialComponentWithHelp'

export const ReserveOrExitZoneMoveToBagLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const guestMove = move as MoveItem<PlayerColor, MaterialType, LocationType>
  const actionPlayer = context.action.playerId
  const rule = new PickGuestFromReserveOrExitZoneActionRule(context.game, actionPlayer)
  const guestPawn = rule.material(MaterialType.GuestPawns).index(guestMove.itemIndex).getItem<GuestPawn>()!
  const actionPLayerName = usePlayerName(actionPlayer)
  const playerName = usePlayerName(guestMove.location.player)
  const otherPLayerName = usePlayerName(guestPawn.location.player)
  if (rule.action.guest === GuestPawn.White) {
    return (
      <div css={logContainerCss}>
        <Trans
          i18nKey="log.buyingAndAdvertisingPhase.whiteGuestMoveToBag"
          defaults="{player} picks <guest/> from {origin, select, guestPawnReserveSpot{the reserve} other{their Exit zone}} and puts it in {isOwnBag, select, true{their} other{{destinationPlayer}'s}} bag"
          values={{
            player: actionPLayerName,
            origin: camelCase(LocationType[guestPawn.location.type]),
            isOwnBag: actionPlayer === guestMove.location.player,
            destinationPlayer: playerName
          }}
          components={{ guest: <MaterialComponentWithHelp itemType={MaterialType.GuestPawns} item={guestPawn} /> }}
        />
      </div>
    )
  }
  const boughtMovie =
    rule.action.boughtCardData !== undefined
      ? rule.material(MaterialType.MovieCards).index(rule.action.boughtCardData.boughtCardIndex).getItem<Required<PlayableMovieCardId>>()
      : undefined
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.buyingAndAdvertisingPhase.guestMoveToBag"
        defaults="{player} picks <guest/> from {origin, select, guestPawnReserveSpot{the reserve} other{{isOwnExitZone, select, true{their} other{{otherPlayer}'s}} Exit zone}} and places it in their bag{isPremiersRowGuest, select, true{ since {player} bought <movie/> from the Premiers row} other{}}"
        values={{
          player: playerName,
          otherPlayer: otherPLayerName,
          origin: camelCase(LocationType[guestPawn.location.type]),
          isOwnExitZone:
            guestPawn.location.type === LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard && guestPawn.location.player === guestMove.location.player,
          isPremiersRowGuest: rule.action.boughtCardData !== undefined
        }}
        components={{
          guest: <MaterialComponentWithHelp itemType={MaterialType.GuestPawns} item={guestPawn} />,
          movie: boughtMovie !== undefined ? <LogMovieMaterialHelpLink movieCard={boughtMovie} /> : <></>
        }}
      />
    </div>
  )
}
