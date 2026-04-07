import { css } from '@emotion/react'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MovieAction, MovieColor } from '@gamepark/popcorn/material/MovieCard'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { linkButtonCss, LocationHelpProps, Picture, PlayMoveButton, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { countBy } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getMovieActionSymbol } from '../../material/utils/movieCard.utils'
import { GuestNumberTable } from '../utils/GuestNumberTable'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GuestReserveHelp: FC<LocationHelpProps<PlayerColor, LocationType>> = () => {
  const rules = useRules<PopcornRules>()
  const guests = rules?.material(MaterialType.GuestPawns).location(LocationType.GuestPawnReserveSpot).getItems<GuestPawn>() ?? []
  const numberOfGuests = guests.length
  const numberOfGuestsPerColor = countBy(guests, (guest) => guest.id)
  return (
    <>
      <h2>
        <Trans i18nKey="help.location.guestPawn.reserve.title" />
      </h2>
      <p>
        <Trans
          i18nKey="help.location.guestPawn.reserve.description"
          values={{ numberOfGuests: numberOfGuests }}
          components={{
            movieAction: (
              <Picture
                src={getMovieActionSymbol(MovieAction.PlaceGuestInReserve, MovieColor.Blue)}
                css={css`
                  min-height: 1.25em;
                  display: inline-block;
                  vertical-align: middle;
                `}
              />
            ),
            boardHelpLink: <PlayMoveButton move={displayMaterialHelp(MaterialType.AdvertisingBoard)} local transient css={linkButtonCss}></PlayMoveButton>
          }}
        />
      </p>
      <GuestNumberTable numberOfGuestsPerColor={numberOfGuestsPerColor} />
    </>
  )
}
