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
import seatNumber1 from '../../images/Symbols/SeatNumber1.jpg'
import seatNumber2 from '../../images/Symbols/SeatNumber2.jpg'
import seatNumber3 from '../../images/Symbols/SeatNumber3.jpg'
import { FilmStrip } from '../../theme/filmStrip'
import {
  headerNavyCss,
  headerRowCss,
  headerSubCss,
  headerTitleCss,
  helpBodyCss,
  priceTagCss,
  seatIconCss,
  sectionHeaderCss,
  tableCellCss,
  tableCss,
  tableHeadCenterCss,
  tableHeadCss,
  tableRowHoverCss
} from '../../theme/helpStyles'
import { actionSymbols } from '../utils/seatActionSymbols.util'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util'

export const TheaterTileHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }: { item: Partial<MaterialItem<PlayerColor, LocationType, TheaterTileId>> }) => {
  const playerName = usePlayerName(item.location?.player)
  const numberOfSeats = item.id!.back === SeatsNumber.Default ? getDefaultNumberOfGuests(item.id!.front!) : getMaximumNumberOfGuests(item.id!.back)

  if (item.id?.front === undefined) {
    return (
      <>
        <div css={headerNavyCss}>
          <div css={headerTitleCss} style={{ fontSize: '1.25em' }}>
            <Trans i18nKey="help.material.theaterTile.type" values={{ numberOfSeats }} />
          </div>
        </div>
        <FilmStrip />
        <div css={helpBodyCss}>
          <p>
            <Trans i18nKey="help.theaterTile.description.accomodatedGuestsNumber" values={{ numberOfGuests: numberOfSeats }} components={{ s: <strong /> }} />
          </p>
        </div>
      </>
    )
  }

  const tileCharacteristics = theaterTilesCharacteristics[item.id.front as TheaterTile]
  const seatActions = tileCharacteristics.getActions()
  const isOnPlayerBoard = item.location?.type === LocationType.TheaterTileSpotOnTopPlayerCinemaBoard

  return (
    <>
      {/* Navy header with seat icon and price */}
      <div css={headerNavyCss}>
        <div css={headerRowCss}>
          <div css={headerLeftCss}>
            <div css={seatIconCss}>
              <span>{numberOfSeats}</span>
            </div>
            <div>
              <div css={headerTitleCss} style={{ fontSize: '1.25em' }}>
                <Trans i18nKey="help.material.theaterTile.type" values={{ numberOfSeats }} />
              </div>
              {isOnPlayerBoard && (
                <div css={headerSubCss}>
                  <Trans i18nKey="help.material.theaterTile.playerTile" values={{ name: playerName, theaterNumber: item.location!.x ?? -1 }} />
                </div>
              )}
            </div>
          </div>
          <div css={priceTagCss}>${tileCharacteristics.getPrice()}</div>
        </div>
      </div>
      <FilmStrip />

      {/* Body */}
      <div css={helpBodyCss}>
        <p>
          <Trans i18nKey="help.theaterTile.description.accomodatedGuestsNumber" values={{ numberOfGuests: numberOfSeats }} components={{ s: <strong /> }} />
        </p>

        <h4 css={sectionHeaderCss}>
          <Trans i18nKey="help.material.theaterTile.header.seatActions" defaults="Seat Actions" />
        </h4>
        <table css={tableCss}>
          <colgroup>
            <col style={{ width: '2.2em' }} />
            <col style={{ width: '5em' }} />
            <col style={{ width: '2em' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th css={tableHeadCenterCss}>
                <Trans i18nKey="help.material.theaterTile.actions.table.header.seatNumber" defaults="Seat" />
              </th>
              <th css={tableHeadCss}>
                <Trans i18nKey="help.material.theaterTile.actions.table.header.requiredGuestColor" defaults="Required" />
              </th>
              <th css={tableHeadCss} colSpan={2}>
                <Trans i18nKey="help.material.theaterTile.actions.table.header.actionDescription" defaults="Action" />
              </th>
            </tr>
          </thead>
          <tbody>
            {seatActions.map((action, index) => {
              const seatColor = tileCharacteristics.getSeatColor(index)!
              return (
                <tr key={`theaterTileHelp-${item.id!.front}-${item.location!.player}-${index}`} css={tableRowHoverCss}>
                  <td css={tableCellCss}>
                    <Picture
                      src={getSeatNumberFromIndex(index)}
                      css={css`
                        max-height: 1.5em;
                      `}
                    />
                  </td>
                  <td css={tableCellCss}>
                    <Trans i18nKey={`help.material.theaterTile.actions.table.requiredGuestColorForSeatColor.${camelCase(SeatColor[seatColor])}`} />
                  </td>
                  <td css={[tableCellCss, noBorderRightCss]}>
                    <Picture src={actionSymbols[action]} css={pictureCss} />
                  </td>
                  <td css={[tableCellCss, noBorderLeftCss]}>
                    <Trans i18nKey={getActionKey(action)} values={{ money: getAmountFromAction(action), popcorn: getAmountFromAction(action) }} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
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

const getSeatNumberFromIndex = (index: number): string | undefined => {
  switch (index) {
    case 0:
      return seatNumber1
    case 1:
      return seatNumber2
    case 2:
      return seatNumber3
    default:
      return undefined
  }
}

const headerLeftCss = css`
  display: flex;
  align-items: center;
  gap: 0.7em;
`

const noBorderRightCss = css`
  border-right: none !important;
  padding: 0.25em;
`

const noBorderLeftCss = css`
  border-left: none !important;
`

const pictureCss = css`
  max-width: 2em;
  max-height: 2em;
  margin: 0.25em 0.5em;
`
