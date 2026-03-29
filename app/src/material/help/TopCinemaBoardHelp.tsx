import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { TheaterTile, TheaterTileId, theaterTilesCharacteristics } from '@gamepark/popcorn/material/TheaterTile.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { getAudienceFromCubeLocation } from '@gamepark/popcorn/rules/utils/getAudienceFromCubeLocation.util.ts'
import { MaterialComponent, Picture, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util.ts'
import unknownGuestSymbol from '../../images/GuestPawns/UnknownGuestPawn.png'
import audienceSymbol from '../../images/Symbols/Audience.png'

export const TopCinemaBoardHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }: { item: Partial<MaterialItem<PlayerColor, LocationType, PlayerColor>> }) => {
  const playerName = usePlayerName(item.id)
  const rules = useRules<PopcornRules>()
  const theaterTiles = rules
    ?.material(MaterialType.TheaterTiles)
    .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
    .player(item.location?.player)
    .id<Required<TheaterTileId>>((id) => id.front !== TheaterTile.DefaultOneSeatTile && id.front !== TheaterTile.DefaultTwoSeatTile)
    .getItems<Required<TheaterTileId>>()
  const theaterTilesTotalPrice =
    theaterTiles?.map((tile) => theaterTilesCharacteristics[tile.id.front].getPrice()).reduce((total, currentTilePrice) => total + currentTilePrice, 0) ?? 0
  const audienceCubeLocation = rules?.material(MaterialType.AudienceCubes).player(item.location?.player).getItem()?.location
  const audience = getAudienceFromCubeLocation(audienceCubeLocation)
  return (
    <>
      <h2>
        <Trans i18nKey="" defaults="{player}'s Cinema board" values={{ player: playerName }} />
      </h2>
      <p>
        <Trans
          i18nKey=""
          defaults="This is {player}'s cinema board. This is where {player} will slide their Movie cards and place their Theater tiles."
          values={{ player: playerName }}
        />
      </p>
      {!theaterTiles?.some((tile) => tile.location.x === 2) && (
        <p>
          <Trans
            i18nKey=""
            defaults="The right theater is empty. When {player} places their first Theater tile in the right theater, they will move their Audience cube (<cube/>) 1 spot on the audience track."
            values={{ player: playerName }}
            components={{
              cube: (
                <MaterialComponent
                  type={MaterialType.AudienceCubes}
                  css={css`
                    font-size: 1.25em;
                    display: inline-block;
                    vertical-align: middle;
                  `}
                />
              )
            }}
          />
        </p>
      )}
      <p>
        <Trans
          i18nKey=""
          defaults="<s>Total price of theater tiles:</s> ${totalPrice}"
          values={{ totalPrice: theaterTilesTotalPrice }}
          components={{ s: <strong></strong> }}
        />
      </p>
      <p>
        <Trans
          i18nKey=""
          defaults="<s><audience/>Audience:</s> {audience}. {player} will draw {audience} Guests (<guest/>) from their bag at the beginning of the next Showings Phase."
          values={{ player: playerName, audience: audience }}
          components={{
            audience: (
              <Picture
                src={audienceSymbol}
                css={css`
                  font-size: 1.5em;
                  display: inline-block;
                `}
              />
            ),
            guest: (
              <Picture
                src={unknownGuestSymbol}
                css={css`
                  font-size: 1.5em;
                  display: inline-block;
                  vertical-align: middle;
                `}
              />
            ),
            s: <strong></strong>
          }}
        />
      </p>
    </>
  )
}
