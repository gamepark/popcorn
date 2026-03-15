import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { SeatsNumber } from '@gamepark/popcorn/material/TheaterTile.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { fontSizeCss, LocationHelpProps, MaterialComponent, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { theaterTileDescription } from '../../material/TheaterTileDescription.tsx'

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
          <Trans
            i18nKey="help.theaterTile.deck.title"
            defaults={'{numberOfSeats, plural, =1{One seat} =2{Two seats} =3{Three seats} other{# seats}} theater tiles stack'}
            values={{ numberOfSeats: seatsNumberOfLocation }}
          />
        </h2>
        <p>
          <Trans
            i18nKey={`help.theaterTile.deck.${SeatsNumber[seatsNumberOfLocation].toLowerCase()}`}
            defaults="Stack of {numberOfSeats, plural, =1{one seat} =2{two seats} =3{three seats} other{# seats}} theater tiles. Once a player buys a theater tile below, a new tile is immediately taken from the stack if there is one available. Currently, there {numberOfTiles, plural, =0{are no tiles} =1{is 1 tile} other{are # tiles}} in the stack"
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
