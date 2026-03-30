import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { TheaterTileId } from '@gamepark/popcorn/material/TheaterTile'
import { ShowingsPhaseRule } from '@gamepark/popcorn/rules/ShowingsPhaseRule'
import { usePlayerName } from '@gamepark/react-game'
import { SelectItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'
import { LogTheaterMaterialHelpLink } from '../utils/LogTheaterMaterialHelpLink'

export const TheaterTileActivatedLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const tileSelectMove = move as SelectItem<MaterialType>
  const rule = new ShowingsPhaseRule(context.game)
  const selectedTile = rule.material(MaterialType.TheaterTiles).index(tileSelectMove.itemIndex).getItem<Required<TheaterTileId>>()!
  const playerName = usePlayerName(selectedTile.location.player)
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.showingsPhase.thaterTileActivated"
        defaults="{player} activates their <theater/>"
        values={{ player: playerName, destinationTileSpot: selectedTile.location.x }}
        components={{
          theater: <LogTheaterMaterialHelpLink theaterTile={selectedTile} />
        }}
      />
    </div>
  )
}
