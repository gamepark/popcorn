import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { getMovieColorFromGuestPawn, movieCardCharacteristics, PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard.ts'
import { isPopcornSelectItemType } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { TheaterTileId } from '@gamepark/popcorn/material/TheaterTile.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { ShowingsPhaseRule } from '@gamepark/popcorn/rules/ShowingsPhaseRule.ts'
import { MaterialComponent, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { guestPawnCss, logContainerCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'
import { LogMovieMaterialHelpLink } from '../utils/LogMovieMaterialHelpLink.tsx'

export const GuestSentToExitZoneLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const guestMove = move as MoveItem<PlayerColor, MaterialType, LocationType>
  const rule = new ShowingsPhaseRule(context.game)
  const guest = rule.material(MaterialType.GuestPawns).index(guestMove.itemIndex).getItem<GuestPawn>()!
  const guestComponent = <MaterialComponent type={MaterialType.GuestPawns} itemId={guest.id} css={guestPawnCss} />
  const theaterTile = rule.material(MaterialType.TheaterTiles).index(guest.location.parent).getItem<Required<TheaterTileId>>()!
  const playerName = usePlayerName(theaterTile.location.player)
  const movieCard = rule
    .material(MaterialType.MovieCards)
    .location((l) => l.type === LocationType.MovieCardSpotOnBottomPlayerCinemaBoard && l.player === guest.location.player && l.x === guest.location.x)
    .getItem<Required<PlayableMovieCardId>>()!
  const movieLinkComponent = <LogMovieMaterialHelpLink movieCard={movieCard} />
  const movieColor = movieCardCharacteristics[movieCard.id.front].color
  const canDoMovieAction = getMovieColorFromGuestPawn(guest.id) === movieColor
  const isAfterSeatAction = isPopcornSelectItemType(MaterialType.GuestPawns)(context.action.move)
  if (isAfterSeatAction && !canDoMovieAction) {
    return (
      <div css={logContainerCss}>
        <Trans
          i18nKey="log.showingsPhase.guestToExitZone.cannotDoMovieActionAfterSeatAction"
          defaults="<guest/> cannot be used to carry out a Movie Action for <movie/>, so {player} sends it to their exit zone"
          values={{ player: playerName }}
          components={{ guest: guestComponent, movie: movieLinkComponent }}
        />
      </div>
    )
  }
  return (
    <div css={logContainerCss}>
      <Trans defaults="Then {player} sends <guest/> to their exit zone" values={{ player: playerName }} components={{ guest: guestComponent }} />
    </div>
  )
}
