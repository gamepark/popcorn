import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PopcornToken } from '@gamepark/popcorn/material/PopcornToken.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { MaterialComponent, usePlayerName } from '@gamepark/react-game'
import { CreateItem, MaterialItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss, materialComponentCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'
import { MaterialComponentWithHelp } from '../utils/MaterialComponentWithHelp.tsx'

export const TheaterTrophyAwardedLogComponent: FC<PopcornMoveComponentProps> = ({ move }) => {
  const trophyMove = move as CreateItem<MaterialType>
  const playerName = usePlayerName(trophyMove.item.location.player)
  const amount = trophyMove.item.id as number
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.finalEndOfRoundPhaseTheaterTrophy.trophyAwarded"
        defaults="{player} gains the <trophy/> trophy and is awarded {amount} Popcorn (<popcorn/>)"
        values={{ player: playerName, amount: amount }}
        components={{
          popcorn: <MaterialComponent type={MaterialType.PopcornTokens} itemId={PopcornToken.Token1} css={materialComponentCss} />,
          trophy: <MaterialComponentWithHelp itemType={MaterialType.TheaterTrophies} item={trophyMove.item as MaterialItem<PlayerColor>} />
        }}
      />
    </div>
  )
}
