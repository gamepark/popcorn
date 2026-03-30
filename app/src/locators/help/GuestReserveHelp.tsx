import { css } from '@emotion/react'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MovieAction, MovieColor } from '@gamepark/popcorn/material/MovieCard'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { linkButtonCss, LocationHelpProps, Picture, PlayMoveButton, useRules } from '@gamepark/react-game'
import { isSameLocationArea, MaterialMoveBuilder } from '@gamepark/rules-api'
import { countBy } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getMovieActionSymbol } from '../../material/utils/movieCard.utils'
import { GuestNumberTable } from '../utils/GuestNumberTable'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GuestReserveHelp: FC<LocationHelpProps<PlayerColor, LocationType>> = ({ location }) => {
  const rules = useRules<PopcornRules>()
  const guests =
    rules
      ?.material(MaterialType.GuestPawns)
      .location((l) => isSameLocationArea(l, location))
      .getItems<GuestPawn>() ?? []
  const numberOfGuests = guests.length
  const numberOfGuestsPerColor = countBy(guests, (guest) => guest.id)
  return (
    <>
      <h2>
        <Trans i18nKey="" defaults="Guest Pawn reserve" />
      </h2>
      <p>
        <Trans
          i18nKey=""
          defaults="Using the <movieAction/> Movie Action, players can send Guests pawns back to the reserve. They can pick a Guest from the reserve using Advertising Tokens on the <boardHelpLink>Advertising Board</boardHelpLink>. There {numberOfGuests, plural, =0{are currently no Guests} =1{is currently # Guest} other{are currently # Guests}} in the reserve."
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
