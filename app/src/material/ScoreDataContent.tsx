import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { usePlayerName } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { FC } from 'react'
import { ScoreDataLocationId } from '../locators/ScoreDataSpotOnScoreSheetLocator'

export const ScoreDataContent: FC<{ location: Location<PlayerColor, LocationType, ScoreDataLocationId> }> = ({ location }) => {
  const player = usePlayerName(location.player)
  return <span css={fontCss}>{location.id === ScoreDataLocationId.Name ? player : location.z}</span>
}

const fontCss = css`
  color: black;
  font-size: 0.75em;
  font-weight: bold;
  font-family: cursive;
`
