import { css, Interpolation, Theme } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { MaterialComponent, usePlay } from '@gamepark/react-game'
import { MaterialItem, MaterialMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { guestPawnCss, materialComponentCss } from '../../utils/logCss.utils'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

type MaterialComponentWithHelpProps<Id> = {
  itemType: MaterialType
  item: MaterialItem<PlayerColor, LocationType, Id>
  displayHelp?: boolean
  extraCss?: Interpolation<Theme>
}

export const MaterialComponentWithHelp = <Id,>({ itemType, item, displayHelp = false, extraCss }: MaterialComponentWithHelpProps<Id>) => {
  const play = usePlay<MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>>()
  const baseCss = [
    itemType === MaterialType.GuestPawns ? guestPawnCss : materialComponentCss,
    css`
      cursor: ${displayHelp ? 'pointer' : 'default'};
    `
  ]
  const componentCss =
    item.id === undefined || (typeof item.id === 'object' && item.id.front === undefined)
      ? [
          ...baseCss,
          css`
            transform: rotateY(180deg);
          `
        ]
      : baseCss
  return (
    <MaterialComponent
      type={itemType}
      itemId={item.id}
      css={extraCss !== undefined ? [componentCss, extraCss] : componentCss}
      onClick={displayHelp ? () => play(displayMaterialHelp(itemType, item)) : undefined}
    />
  )
}
