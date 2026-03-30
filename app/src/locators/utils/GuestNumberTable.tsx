import { css } from '@emotion/react'
import { GuestPawn } from '@gamepark/popcorn/material/GuestPawn'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MaterialComponent } from '@gamepark/react-game'
import { FC } from 'react'

export const GuestNumberTable: FC<{ numberOfGuestsPerColor: Record<GuestPawn, number> }> = ({ numberOfGuestsPerColor }) => {
  return (
    <table>
      <tbody>
        <tr>
          {Object.entries(numberOfGuestsPerColor).map(([colorString, numberOfGuestOfColor]) => {
            const color = parseInt(colorString) as GuestPawn
            return (
              <td>
                <MaterialComponent
                  key={`guest-c-${color}`}
                  type={MaterialType.GuestPawns}
                  itemId={color}
                  css={css`
                    display: inline-block;
                    vertical-align: middle;
                    min-height: 1.25em;
                  `}
                />
                : {numberOfGuestOfColor}
              </td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}
