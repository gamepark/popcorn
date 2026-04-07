import { css } from '@emotion/react'
import { AdvertisingTokenSpot, advertisingTokenSpots } from '@gamepark/popcorn/material/AdvertisingTokenSpot'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { Picture } from '@gamepark/react-game'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { FilmStrip } from '../../theme/filmStrip'
import { headerNavyCss, headerTitleCss, helpBodyCss, sectionHeaderCss, tableCellCss, tableCss, tableHeadCss, tableRowHoverCss } from '../../theme/helpStyles'
import { getAdvertisingSpotSymbol } from './utils/advertisingSpotSymbol.utils'
import { getColorFromSpot } from './utils/getColorFromSpot.util'

export const AdvertisingBoardHelp: FC = () => {
  return (
    <>
      <div css={headerNavyCss}>
        <h2 css={headerTitleCss}>
          <Trans i18nKey="help.material.advertisingBoard.title" />
        </h2>
      </div>
      <FilmStrip />
      <div css={helpBodyCss}>
        <p>
          <Trans i18nKey="help.material.advertisingBoard.description" />
        </p>
        <div css={sectionHeaderCss}>
          <Trans i18nKey="help.advertisingBoard.table.header.symbol" />
        </div>
        <table css={tableCss}>
          <thead>
            <tr>
              <th css={tableHeadCss}>
                <Trans i18nKey="help.advertisingBoard.table.header.symbol" />
              </th>
              <th css={tableHeadCss}>
                <Trans i18nKey="help.advertisingBoard.table.header.meaning" />
              </th>
            </tr>
          </thead>
          <tbody>
            {advertisingTokenSpots.map((spot) => {
              const pawnColor = getColorFromSpot(spot)
              const colorValue = pawnColor === undefined ? '' : <Trans i18nKey={`material.guestPawn.color.${camelCase(GuestPawn[pawnColor])}`} />
              return (
                <tr key={spot} css={tableRowHoverCss}>
                  <td css={tableCellCss}>
                    <Picture src={getAdvertisingSpotSymbol(spot)} css={pictureCss} />
                  </td>
                  <td css={tableCellCss}>
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
      </div>
    </>
  )
}

const pictureCss = css`
  height: 3em;
  width: 3em;
  margin: 0.25em 1em;
`
