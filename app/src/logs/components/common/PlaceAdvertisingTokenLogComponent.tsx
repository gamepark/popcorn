import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { Picture, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getAdvertisingSpotSymbol } from '../../../material/help/utils/advertisingSpotSymbol.utils'
import { logContainerCss, symbolCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'
import { MaterialComponentWithHelp } from '../utils/MaterialComponentWithHelp'

export const PlaceAdvertisingTokenLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const advertisingTokenMove = move as MoveItem<PlayerColor, MaterialType, LocationType>
  const rule = new PopcornRules(context.game)
  const token = rule.material(MaterialType.AdvertisingTokens).index(advertisingTokenMove.itemIndex).getItem<PlayerColor>()!
  const playerName = usePlayerName(token.id)
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.common.placeAdvertisingToken"
        values={{ player: playerName }}
        components={{
          token: <MaterialComponentWithHelp itemType={MaterialType.AdvertisingTokens} item={token} />,
          tokenSpot: <Picture src={getAdvertisingSpotSymbol(advertisingTokenMove.location.id)} css={symbolCss} />
        }}
      />
    </div>
  )
}
