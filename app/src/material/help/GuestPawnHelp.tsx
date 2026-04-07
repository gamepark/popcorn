import { css } from '@emotion/react'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { getMovieColorFromGuestPawn, MovieCard, movieCardCharacteristics, PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { getSeatColorFromGuestPawn, SeatColor, TheaterTileId, theaterTilesCharacteristics } from '@gamepark/popcorn/material/TheaterTile'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { linkButtonCss, MaterialComponent, Picture, PlayMoveButton, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { FilmStrip } from '../../theme/filmStrip'
import { headerNavyCss, headerTitleCss, helpBodyCss } from '../../theme/helpStyles'
import { colorSymbols, movieTitleDefaults } from '../utils/movieCard.utils'
import { actionSymbols } from '../utils/seatActionSymbols.util'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GuestPawnHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }: { item: Partial<MaterialItem<PlayerColor, LocationType, GuestPawn>> }) => {
  const rules = useRules<PopcornRules>()
  const playerName = usePlayerName(item.location?.player)
  const parentTile = rules?.material(MaterialType.TheaterTiles).index(item.location?.parent).getItem<Required<TheaterTileId>>()
  if (parentTile === undefined) {
    throw new Error('Cannot have an undefined parent tile')
  }
  const tileCharacteristics = theaterTilesCharacteristics[parentTile.id.front]
  const seatNumber = item.location!.x!
  const seatColor = tileCharacteristics.getSeatColor(seatNumber)!
  const seatAction = tileCharacteristics.getSeatAction(seatNumber)!
  const canDoSeatAction = seatColor === SeatColor.Grey || getSeatColorFromGuestPawn(item.id!) === seatColor
  const movieCard = rules
    ?.material(MaterialType.MovieCards)
    .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
    .player(item.location?.player)
    .location((l) => l.x === parentTile.location.x)
    .getItem<Required<PlayableMovieCardId>>()
  if (movieCard === undefined) {
    throw new Error('Cannot have an undefined movie card')
  }
  const movieColor = movieCardCharacteristics[movieCard.id.front].color
  const canDoMovieAction = item.id !== GuestPawn.White && getMovieColorFromGuestPawn(item.id!) === movieColor
  return (
    <>
      <div css={headerNavyCss}>
        <h2 css={headerTitleCss}>
          <Trans
            i18nKey="help.material.guestPawn.title"
            values={{ player: playerName, theater: parentTile.location.x, seatNumber: seatNumber, guestColor: GuestPawn[item.id!] }}
            components={{ nl: <br /> }}
          />
        </h2>
      </div>
      <FilmStrip />
      <div css={helpBodyCss}>
        <p>
          <Trans
            i18nKey="help.material.guestPawn.description.seatAction"
            values={{ canDoSeatAction: canDoSeatAction, seatColor: seatColor }}
            components={{
              guest: (
                <MaterialComponent
                  type={MaterialType.GuestPawns}
                  itemId={item.id}
                  css={css`
                    display: inline-block;
                    font-size: 1.25em;
                    vertical-align: middle;
                  `}
                />
              ),
              seatAction: (
                <Picture
                  src={actionSymbols[seatAction]}
                  css={css`
                    display: inline-block;
                    vertical-align: middle;
                    min-height: 1.25em;
                  `}
                />
              )
            }}
          />
        </p>
        <p>
          <Trans
            i18nKey="help.material.guestPawn.description.movieAction"
            values={{ canDoMovieAction: canDoMovieAction, movieColor: movieColor }}
            components={{
              guest: (
                <MaterialComponent
                  type={MaterialType.GuestPawns}
                  itemId={item.id}
                  css={css`
                    display: inline-block;
                    font-size: 1.25em;
                    vertical-align: middle;
                  `}
                />
              ),
              movie: (
                <PlayMoveButton move={displayMaterialHelp(MaterialType.MovieCards, movieCard)} local transient css={linkButtonCss}>
                  <Picture
                    src={colorSymbols[movieColor]}
                    css={css`
                      display: inline-block;
                      min-height: 1.25em;
                    `}
                  />
                  <Trans i18nKey={`material.movieCard.title.${camelCase(MovieCard[movieCard.id.front])}`} defaults={movieTitleDefaults[movieCard.id.front]} />
                </PlayMoveButton>
              )
            }}
          />
        </p>
      </div>
    </>
  )
}
