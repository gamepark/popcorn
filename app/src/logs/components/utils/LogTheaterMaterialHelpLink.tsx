import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { TheaterTileId, theaterTilesCharacteristics } from '@gamepark/popcorn/material/TheaterTile'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { Picture } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { seatsNumberSymbols } from '../../../material/utils/movieCard.utils'
import { symbolCss } from '../../utils/logCss.utils'
import { LogMaterialHelpLink } from './LogMaterialHelpLink'

type LogTheaterMaterialHelpLinkProps = {
  theaterTile: MaterialItem<PlayerColor, LocationType, Required<TheaterTileId>>
  showTileType?: boolean
}

export const LogTheaterMaterialHelpLink: FC<LogTheaterMaterialHelpLinkProps> = ({ theaterTile, showTileType = false }) => {
  const tileSeatNumbers = theaterTilesCharacteristics[theaterTile.id.front].getSeatsNumber()

  return (
    <>
      {showTileType && <Picture src={seatsNumberSymbols[tileSeatNumbers]} css={symbolCss} />}
      <LogMaterialHelpLink itemType={MaterialType.TheaterTiles} item={theaterTile}>
        <Trans
          i18nKey="log.common.theaterTileSpot"
          defaults="{spot, select, 0{left} 1{center} 2{right} other{}} theater"
          values={{ spot: theaterTile.location.x }}
        />
      </LogMaterialHelpLink>
    </>
  )
}
