import { css } from '@emotion/react'
import { AdvertisingTokenSpot, advertisingTokenSpots } from '@gamepark/popcorn/material/AdvertisingTokenSpot.ts'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn.ts'
import { Picture } from '@gamepark/react-game'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import advertisingBoardAnyGuestSymbol from '../../images/Symbols/AdvertisingBoardAnyGuest.png'
import advertisingBoardBlueGuestSymbol from '../../images/Symbols/AdvertisingBoardBlueGuest.png'
import advertisingBoardGreenGuestSymbol from '../../images/Symbols/AdvertisingBoardGreenGuest.png'
import advertisingBoardRedGuestSymbol from '../../images/Symbols/AdvertisingBoardRedGuest.png'
import advertisingBoardWhiteToBagSymbol from '../../images/Symbols/AdvertisingBoardWhiteToBag.png'
import advertisingBoardYellowGuestSymbol from '../../images/Symbols/AdvertisingBoardYellowGuest.png'

const picturesMap = {
  [AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag]: advertisingBoardWhiteToBagSymbol,
  [AdvertisingTokenSpot.YellowGuestPawn]: advertisingBoardYellowGuestSymbol,
  [AdvertisingTokenSpot.GreenGuestPawn]: advertisingBoardGreenGuestSymbol,
  [AdvertisingTokenSpot.RedGuestPawn]: advertisingBoardRedGuestSymbol,
  [AdvertisingTokenSpot.BlueGuestPawn]: advertisingBoardBlueGuestSymbol,
  [AdvertisingTokenSpot.AnyGuestPawn]: advertisingBoardAnyGuestSymbol
}

const getTransDefault = (spot: AdvertisingTokenSpot): string => {
  switch (spot) {
    case AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag:
      return 'Take 1 white Guest from the reserve or your cinema (in a theater or in the exit zone), then add it to any player’s bag (including your own). If there are none available, nothing happens.'
    case AdvertisingTokenSpot.AnyGuestPawn:
      return 'Take 1 Guest of any color from the reserve (or, if there aren’t any, from any other player’s exit zone) and add it to your bag. If there are none available, nothing happens.'
    default:
      return 'Take 1 {guestColor} Guest from the reserve (or, if there aren’t any, from any other player’s exit zone) and add it to your bag. If there are none available, nothing happens.'
  }
}

const getColorFromSpot = (spot: AdvertisingTokenSpot): GuestPawn | undefined => {
  switch (spot) {
    case AdvertisingTokenSpot.YellowGuestPawn:
      return GuestPawn.Yellow
    case AdvertisingTokenSpot.GreenGuestPawn:
      return GuestPawn.Green
    case AdvertisingTokenSpot.RedGuestPawn:
      return GuestPawn.Red
    case AdvertisingTokenSpot.BlueGuestPawn:
      return GuestPawn.Blue
    default:
      return undefined
  }
}

export const AdvertisingBoardHelp: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2>
        <Trans i18nKey="help.advertisingBoard.title" defaults="Advertising board" />
      </h2>
      <p>
        <Trans
          i18nKey="help.advertisingBoard.description"
          defaults="Players place their advertising tokens on the board as the result of a movie action or a showing bonus."
        />
      </p>
      <table css={tableCss}>
        <thead>
          <tr>
            <th>
              <Trans i18nKey="help.advertisingBoard.table.header.symbol" defaults="Symbol" />
            </th>
            <th>
              <Trans i18nKey="help.advertisingBoard.table.header.meaning" defaults="Meaning" />
            </th>
          </tr>
        </thead>
        <tbody>
          {advertisingTokenSpots.map((spot) => {
            const pawnColor = getColorFromSpot(spot)
            const colorValue = pawnColor === undefined ? '' : t(`guest.color.${GuestPawn[pawnColor].toLowerCase()}`)
            return (
              <tr>
                <td>
                  <Picture src={picturesMap[spot]} css={pictureCss} />
                </td>
                <td css={transCss}>
                  <Trans
                    i18nKey={`help.advertisingBoard.${camelCase(AdvertisingTokenSpot[spot])}`}
                    defaults={getTransDefault(spot)}
                    values={{ guestColor: colorValue }}
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

const pictureCss = css`
  height: 3em;
  width: 3em;
  margin: 0.25em 1em;
`

const tableCss = css`
  border-collapse: collapse;
  border: 2px solid;
  td,
  th {
    border: 2px solid;
  }
`

const transCss = css`
  padding: 0 0.25em;
`
