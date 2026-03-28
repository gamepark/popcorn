import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { getAudienceFromCubeLocation } from '@gamepark/popcorn/rules/utils/getAudienceFromCubeLocation.util.ts'
import { MaterialComponent, Picture, usePlayerName } from '@gamepark/react-game'
import { Location, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import audience4Symbol from '../../../images/Symbols/Audience4.png'
import audience5Symbol from '../../../images/Symbols/Audience5.png'
import audience6Symbol from '../../../images/Symbols/Audience6.png'
import audience7Symbol from '../../../images/Symbols/Audience7.png'
import { logContainerCss, materialComponentCss, symbolCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'

export const AudienceCubeMoveLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const cubeMove = move as MoveItem<PlayerColor, MaterialType, LocationType>
  const rule = new PopcornRules(context.game)
  const cube = rule.material(MaterialType.AudienceCubes).index(cubeMove.itemIndex).getItem()!
  const audienceBeforeMove = getAudienceFromCubeLocation(cube.location)
  const audienceAfterMove = getAudienceFromCubeLocation(cubeMove.location as Location)
  const cubeComponent = (
    <MaterialComponent
      type={MaterialType.AudienceCubes}
      css={[
        materialComponentCss,
        css`
          font-size: 1.5em;
        `
      ]}
    />
  )
  const audienceSymbol = audienceAfterMove !== audienceBeforeMove ? <Picture src={getSymbolFromAudience(audienceAfterMove)} css={symbolCss} /> : <></>
  const playerName = usePlayerName(cubeMove.location.player)
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.common.audienceCubeAdvance"
        defaults="{player} advances their <cube/> to the next spot on the track{isNewAudience, select, true{. {player}'s new audience is <audience/>} other{}}"
        values={{ player: playerName, isNewAudience: audienceBeforeMove !== audienceAfterMove }}
        components={{ cube: cubeComponent, audience: audienceSymbol }}
      />
    </div>
  )
}

const getSymbolFromAudience = (audience: number) => {
  switch (audience) {
    case 4:
      return audience4Symbol
    case 5:
      return audience5Symbol
    case 6:
      return audience6Symbol
    case 7:
      return audience7Symbol
    default:
      return ''
  }
}
