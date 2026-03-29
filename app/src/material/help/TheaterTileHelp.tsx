import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import {
  getMaximumNumberOfGuests,
  SeatAction,
  SeatColor,
  SeatsNumber,
  TheaterTile,
  TheaterTileId,
  theaterTilesCharacteristics
} from '@gamepark/popcorn/material/TheaterTile'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { Picture, usePlayerName } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { actionSymbols } from '../utils/seatActionSymbols.util'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util'

export const TheaterTileHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }: { item: Partial<MaterialItem<PlayerColor, LocationType, TheaterTileId>> }) => {
  const playerName = usePlayerName(item.location?.player)
  const numberOfSeats = item.id!.back === SeatsNumber.Default ? getDefaultNumberOfGuests(item.id!.front!) : getMaximumNumberOfGuests(item.id!.back)
  const title = (
    <h2>
      <Trans
        i18nKey="help.theaterTile.type"
        defaults="{numberOfSeats, select, 1{One seat} 2{Two seats} 3{Three seat} other{}} theater tile"
        values={{ numberOfSeats }}
      />
      {item.location?.type === LocationType.TheaterTileSpotOnTopPlayerCinemaBoard && (
        <>
          &nbsp;&mdash;&nbsp;
          <Trans
            i18nKey="help.theaterTile.playerTile"
            defaults="{name}'s {theaterNumber, select, 0{left} 1{center} 2{right} other{unused}} theater"
            values={{ name: playerName, theaterNumber: item.location.x ?? -1 }}
          />
        </>
      )}
    </h2>
  )
  const numberOfAccommodatedGuestsComponent = (
    <Trans
      i18nKey="help.theaterTile.description.accomodatedGuestsNumber"
      defaults="<s>Number of accomodated guests:</s> {numberOfGuests, plural, =1{# Guest} other{# Guests}}"
      values={{ numberOfGuests: numberOfSeats }}
      components={{
        s: <strong></strong>
      }}
    />
  )
  if (item.id?.front === undefined) {
    return (
      <>
        {title}
        <p>{numberOfAccommodatedGuestsComponent}</p>
      </>
    )
  }
  const tileCharacteristics = theaterTilesCharacteristics[item.id.front as TheaterTile]
  const seatActions = tileCharacteristics.getActions()
  return (
    <>
      {title}
      <p>
        <Trans
          i18nKey="help.theaterTile.description.cost"
          defaults="<s>Price:</s> ${price}"
          values={{ price: tileCharacteristics.getPrice() }}
          components={{ s: <strong>#</strong> }}
        />
      </p>
      <p>{numberOfAccommodatedGuestsComponent}</p>
      <table css={tableCss}>
        <colgroup>
          <col css={seatNumberColumnCss} />
          <col css={requiredGuestColorColumnCss} />
          <col css={actionSymbolColumnCss} />
          <col css={actionDescriptionColumnCss} />
        </colgroup>
        <thead>
          <tr>
            <th>
              <Trans i18nKey="help.theaterTile.table.heading.seatNumber" defaults="Seat number" />
            </th>
            <th>
              <Trans i18nKey="help.theaterTile.table.heading.requiredGuestColor" defaults="Guest color required" />
            </th>
            <th colSpan={2}>
              <Trans i18nKey="help.theaterTile.table.heading.action" defaults="Seat action description" />
            </th>
          </tr>
        </thead>
        <tbody>
          {seatActions.map((action, index) => {
            const seatColor = tileCharacteristics.getSeatColor(index)!
            return (
              <tr key={`theaterTileHelp-${item.id!.front}-${item.location!.player}-${index}`}>
                <td css={textCenterCss}>{index + 1}</td>
                <td css={textCenterCss}>
                  <Trans i18nKey={`help.theaterTile.table.requiredGuestColor.${SeatColor[seatColor]}`} defaults={requiredGuestColorDefaults[seatColor]} />
                </td>
                <td css={borderRightNoneCss}>
                  <Picture src={actionSymbols[action]} css={pictureCss} />
                </td>
                <td css={borderLeftNoneCss}>
                  <Trans
                    i18nKey={`help.theaterTile.action.${camelCase(SeatAction[action])}`}
                    defaults={getActionDefaults(action)}
                    values={{ money: getAmountFromAction(action), popcorn: getAmountFromAction(action) }}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

const requiredGuestColorDefaults = {
  [SeatColor.Blue]: 'Blue',
  [SeatColor.Green]: 'Green',
  [SeatColor.Red]: 'Red',
  [SeatColor.Yellow]: 'Yellow',
  [SeatColor.Grey]: 'Any color'
}

const actionDefaults = {
  [SeatAction.DrawGuestAndPlaceThem]:
    'Draw 1 Guest from your bag and place it on a seat that hasn’t yet been activated this showing. If you place it on a seat that already has a Guest, move the replaced (and unactivated) Guest to your exit zone.',
  [SeatAction.MoveGuestFromExitZoneToBag]: 'Choose 1 Guest in your exit zone and add it to your bag.',
  [SeatAction.MovieAction]: 'Use 1 available Movie action on the movie showing in this theater that hasn’t been used yet this round.',
  [SeatAction.PlaceGuestInReserve]: 'Choose 1 Guest in your cinema (in a theater or your exit zone, but not in your bag) and place it in the reserve.'
}

const getActionDefaults = (action: SeatAction): string => {
  switch (action) {
    case SeatAction.Get1Money:
    case SeatAction.Get2Money:
    case SeatAction.Get3Money:
      return 'Get ${money}'
    case SeatAction.Get1Popcorn:
    case SeatAction.Get2Popcorn:
      return 'Get {popcorn, plural, =1{# Popcorn} other{# Popcorns}}'
    default:
      return actionDefaults[action]
  }
}

const getAmountFromAction = (action: SeatAction): number => {
  switch (action) {
    case SeatAction.Get1Money:
    case SeatAction.Get1Popcorn:
      return 1
    case SeatAction.Get2Money:
    case SeatAction.Get2Popcorn:
      return 2
    case SeatAction.Get3Money:
      return 3
    default:
      return -1
  }
}

const getDefaultNumberOfGuests = (theaterTile: TheaterTile): number => {
  switch (theaterTile) {
    case TheaterTile.DefaultOneSeatTile:
      return 1
    case TheaterTile.DefaultTwoSeatTile:
      return 2
    default:
      return -1
  }
}

const tableCss = css`
  width: 95%;
  border-collapse: collapse;
  border: 2px solid;
  margin: 0 auto;

  td,
  th {
    border: 2px solid;
  }
`

const seatNumberColumnCss = css`
  max-width: 15%;
`

const requiredGuestColorColumnCss = css`
  max-width: 15%;
`

const actionDescriptionColumnCss = css`
  min-width: 65%;
  width: 70%;
`

const actionSymbolColumnCss = css`
  width: 3em;
`

const textCenterCss = css`
  text-align: center;
`

const borderRightNoneCss = css`
  border-right: none !important;
`

const borderLeftNoneCss = css`
  border-left: none !important;
`

const pictureCss = css`
  max-width: 2em;
  max-height: 2em;
  margin: 0.25em 0.5em;
`
