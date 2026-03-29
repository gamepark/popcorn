import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { PopcornToken } from '@gamepark/popcorn/material/PopcornToken.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { MaterialItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util.ts'

export const PopcornTokenHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }: { item: Partial<MaterialItem<PlayerColor, LocationType, PopcornToken>> }) => {
  return (
    <>
      <h2>
        <Trans i18nKey="" defaults="Popcorn token" />
      </h2>
      <p>
        <Trans
          i18nKey=""
          defaults="This token represents {amount} Popcorn. At the end of the game, the player with the most Popcorn wins the game."
          values={{ amount: item.id }}
        />
      </p>
    </>
  )
}
