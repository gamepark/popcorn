import { AdvertisingTokenSpot } from '@gamepark/popcorn/material/AdvertisingTokenSpot.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { Picture, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getAdvertisingSpotSymbol } from '../../../material/help/utils/advertisingSpotSymbol.utils.ts'
import { logContainerCss, symbolCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'
import { MaterialComponentWithHelp } from '../utils/MaterialComponentWithHelp.tsx'

export const UseAdvertisingTokenLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const tokenMove = move as MoveItem<PlayerColor, MaterialType, LocationType>
  const rule = new PopcornRules(context.game)
  const token = rule.material(MaterialType.AdvertisingTokens).index(tokenMove.itemIndex).getItem<PlayerColor>()!
  const sourceSpot = token.location.id as AdvertisingTokenSpot
  const playerName = usePlayerName(token.id)
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.buyingAndAdvertisingPhase.useAdvertisingToken"
        defaults="{player} uses their <token/> on <tokenSpot/>"
        values={{ player: playerName }}
        components={{
          token: <MaterialComponentWithHelp itemType={MaterialType.AdvertisingTokens} item={token} />,
          tokenSpot: <Picture src={getAdvertisingSpotSymbol(sourceSpot)} css={symbolCss} />
        }}
      />
    </div>
  )
}
