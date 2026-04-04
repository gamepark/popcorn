import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { fontSizeCss, LocationHelpProps, MaterialComponent, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { theaterTileDescription } from '../../material/TheaterTileDescription'

export const TheaterTileDeckHelp: FC<LocationHelpProps> = ({ location }) => {
  const rules = useRules<PopcornRules>()
  const seatsNumberOfLocation = getSeatNumberFromLocationType(location.type)
  const tilesMaterial = rules?.material(MaterialType.TheaterTiles).location(location.type)
  return (
    <div css={containerCss}>
      <MaterialComponent
        type={MaterialType.TheaterTiles}
        itemId={{ back: seatsNumberOfLocation }}
        css={[fontSizeCss(Math.min(50 / theaterTileDescription.width, 50 / theaterTileDescription.width, 3)), pictureCss]}
      />
      <div css={helpTextCss}>
        <h2>
          <Trans i18nKey="help.location.theaterTile.deck.title" values={{ numberOfSeats: seatsNumberOfLocation }} />
        </h2>
        <p>
          <Trans
            i18nKey="help.location.theaterTile.deck.description"
            values={{ numberOfSeats: seatsNumberOfLocation, numberOfTiles: tilesMaterial?.length ?? 0 }}
          />
        </p>
      </div>
    </div>
  )
}

const getSeatNumberFromLocationType = (locationType: LocationType): number => {
  switch (locationType) {
    case LocationType.OneSeatTheaterTileDeckSpot:
      return 1
    case LocationType.TwoSeatTheaterTileDeckSpot:
      return 2
    case LocationType.ThreeSeatTheaterTileDeckSpot:
      return 3
    default:
      return -1
  }
}

const containerCss = css`
  display: flex;
`

const pictureCss = css`
  min-width: ${theaterTileDescription.width + 0.2}em;
  min-height: ${theaterTileDescription.height + 0.2}em;
  transform: rotateY(180deg);
  padding: 0.125em;
`

const helpTextCss = css`
  min-width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
