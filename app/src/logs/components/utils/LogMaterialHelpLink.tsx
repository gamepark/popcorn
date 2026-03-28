import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { PlayMoveButton } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { PropsWithChildren } from 'react'
import { popcornLinkCss, popcornRuleLinkCss } from '../../utils/logCss.utils.ts'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

type LogMaterialHelpLinkProps<Id> = {
  itemType: MaterialType
  item: MaterialItem<PlayerColor, LocationType, Id>
  isRuleLog?: boolean
}

export const LogMaterialHelpLink = <Id,>({ itemType, item, isRuleLog = false, children }: PropsWithChildren<LogMaterialHelpLinkProps<Id>>) => (
  <PlayMoveButton move={displayMaterialHelp(itemType, item)} local transient css={isRuleLog ? popcornRuleLinkCss : popcornLinkCss}>
    {children}
  </PlayMoveButton>
)
