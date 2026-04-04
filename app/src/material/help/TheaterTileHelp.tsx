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
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { actionSymbols } from '../utils/seatActionSymbols.util'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util'

export const TheaterTileHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }: { item: Partial<MaterialItem<PlayerColor, LocationType, TheaterTileId>> }) => {
  const playerName = usePlayerName(item.location?.player)
  const numberOfSeats = item.id!.back === SeatsNumber.Default ? getDefaultNumberOfGuests(item.id!.front!) : getMaximumNumberOfGuests(item.id!.back)
  const title = (
    <h2>
      <Trans i18nKey="help.material.theaterTile.type" values={{ numberOfSeats }} />
      {item.location?.type === LocationType.TheaterTileSpotOnTopPlayerCinemaBoard && (
        <>
          &nbsp;&mdash;&nbsp;
          <Trans i18nKey="help.material.theaterTile.playerTile" values={{ name: playerName, theaterNumber: item.location.x ?? -1 }} />
        </>
      )}
    </h2>
  )
  const numberOfAccommodatedGuestsComponent = (
    <Trans
      i18nKey="help.theaterTile.description.accomodatedGuestsNumber"
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
        <Trans i18nKey="help.material.theaterTile.description.price" values={{ price: tileCharacteristics.getPrice() }} components={{ s: <strong></strong> }} />
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
              <Trans i18nKey="help.material.theaterTile.actions.table.header.seatNumber" />
            </th>
            <th>
              <Trans i18nKey="help.material.theaterTile.actions.table.header.requiredGuestColor" />
            </th>
            <th colSpan={2}>
              <Trans i18nKey="help.material.theaterTile.actions.table.header.actionDescription" />
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
                  <Trans i18nKey={`help.material.theaterTile.actions.table.requiredGuestColorForSeatColor.${SeatColor[seatColor]}`} />
                </td>
                <td css={borderRightNoneCss}>
                  <Picture src={actionSymbols[action]} css={pictureCss} />
                </td>
                <td css={borderLeftNoneCss}>
                  <Trans i18nKey={getActionKey(action)} values={{ money: getAmountFromAction(action), popcorn: getAmountFromAction(action) }} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

const getActionKey = (action: SeatAction): string => {
  switch (action) {
    case SeatAction.Get1Money:
    case SeatAction.Get2Money:
    case SeatAction.Get3Money:
      return 'help.material.theaterTile.action.getMoney'
    case SeatAction.Get1Popcorn:
    case SeatAction.Get2Popcorn:
      return 'help.material.theaterTile.action.getPopcorn'
    case SeatAction.DrawGuestAndPlaceThem:
      return 'help.material.theaterTile.action.drawGuestAndPlaceThem'
    case SeatAction.MoveGuestFromExitZoneToBag:
      return 'help.material.theaterTile.action.moveGuestFromExitZoneToBag'
    case SeatAction.MovieAction:
      return 'help.material.theaterTile.action.movieAction'
    case SeatAction.PlaceGuestInReserve:
      return 'help.material.theaterTile.action.placeGuestInReserve'
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
