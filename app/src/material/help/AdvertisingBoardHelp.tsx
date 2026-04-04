import { css } from '@emotion/react'
import { AdvertisingTokenSpot, advertisingTokenSpots } from '@gamepark/popcorn/material/AdvertisingTokenSpot'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { Picture } from '@gamepark/react-game'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getAdvertisingSpotSymbol } from './utils/advertisingSpotSymbol.utils'

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
  return (
    <>
      <h2>
        <Trans i18nKey="help.material.advertisingBoard.title" />
      </h2>
      <p>
        <Trans i18nKey="help.material.advertisingBoard.description" />
      </p>
      <table css={tableCss}>
        <thead>
          <tr>
            <th>
              <Trans i18nKey="help.advertisingBoard.table.header.symbol" />
            </th>
            <th>
              <Trans i18nKey="help.advertisingBoard.table.header.meaning" />
            </th>
          </tr>
        </thead>
        <tbody>
          {advertisingTokenSpots.map((spot) => {
            const pawnColor = getColorFromSpot(spot)
            const colorValue = pawnColor === undefined ? '' : <Trans i18nKey={`material.guestPawn.color.${camelCase(GuestPawn[pawnColor])}`} />
            return (
              <tr>
                <td>
                  <Picture src={getAdvertisingSpotSymbol(spot)} css={pictureCss} />
                </td>
                <td css={transCss}>
                  <Trans
                    i18nKey={
                      'help.material.advertisingBoard.spot.' +
                      (spot === AdvertisingTokenSpot.AnyGuestPawn
                        ? 'anyGuestPawn'
                        : spot === AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag
                          ? 'placeWhiteTokenIntoAnyBag'
                          : 'coloredGuestPawn')
                    }
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
