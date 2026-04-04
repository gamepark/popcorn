import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { PopcornToken } from '@gamepark/popcorn/material/PopcornToken'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { MaterialItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util'

export const PopcornTokenHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }: { item: Partial<MaterialItem<PlayerColor, LocationType, PopcornToken>> }) => {
  return (
    <>
      <h2>
        <Trans i18nKey="help.material.popcornToken.title" />
      </h2>
      <p>
        <Trans i18nKey="help.material.popcornToken.description" values={{ amount: item.id }} />
      </p>
    </>
  )
}
