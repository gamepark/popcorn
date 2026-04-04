import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PopcornToken } from '@gamepark/popcorn/material/PopcornToken'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { MaterialComponent, usePlayerName } from '@gamepark/react-game'
import { CreateItem, MaterialItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { logContainerCss, materialComponentCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'
import { MaterialComponentWithHelp } from '../utils/MaterialComponentWithHelp'

export const TheaterTrophyAwardedLogComponent: FC<PopcornMoveComponentProps> = ({ move }) => {
  const trophyMove = move as CreateItem<MaterialType>
  const playerName = usePlayerName(trophyMove.item.location.player)
  const amount = trophyMove.item.id as number
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.finalEndOfRoundPhase.trophyAwarded"
        values={{ player: playerName, amount: amount }}
        components={{
          popcorn: <MaterialComponent type={MaterialType.PopcornTokens} itemId={PopcornToken.Token1} css={materialComponentCss} />,
          trophy: <MaterialComponentWithHelp itemType={MaterialType.TheaterTrophies} item={trophyMove.item as MaterialItem<PlayerColor>} />
        }}
      />
    </div>
  )
}
