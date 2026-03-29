import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MoneyToken } from '@gamepark/popcorn/material/MoneyToken'
import { PopcornToken } from '@gamepark/popcorn/material/PopcornToken'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { MaterialComponent } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util'
import { css } from '@emotion/react'

export const MoneyTokenHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }: { item: Partial<MaterialItem<PlayerColor, LocationType, MoneyToken>> }) => {
  return (
    <>
      <h2>
        <Trans i18nKey="" defaults="Money token" />
      </h2>
      <p>
        <Trans
          i18nKey=""
          defaults="This token represents ${amount}. Money is used to buy movie cards and theater tiles. At the end of the game, players earn 1 Popcorn (<popcorn/>) for each $5 they have."
          values={{ amount: item.id }}
          components={{
            popcorn: (
              <MaterialComponent
                type={MaterialType.PopcornTokens}
                itemId={PopcornToken.Token1}
                css={css`
                  display: inline-block;
                  vertical-align: middle;
                `}
              />
            )
          }}
        />
      </p>
    </>
  )
}
