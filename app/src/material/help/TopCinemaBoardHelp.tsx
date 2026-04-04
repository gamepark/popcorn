import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { TheaterTile, TheaterTileId, theaterTilesCharacteristics } from '@gamepark/popcorn/material/TheaterTile'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { getAudienceFromCubeLocation } from '@gamepark/popcorn/rules/utils/getAudienceFromCubeLocation.util'
import { MaterialComponent, Picture, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import unknownGuestSymbol from '../../images/GuestPawns/UnknownGuestPawn.png'
import audienceSymbol from '../../images/Symbols/Audience.png'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util'

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
        <Trans i18nKey="help.material.topCinemaBoard.title" values={{ player: playerName }} />
      </h2>
      <p>
        <Trans i18nKey="help.material.topCinemaBoard.description" values={{ player: playerName }} />
      </p>
      {!theaterTiles?.some((tile) => tile.location.x === 2) && (
        <p>
          <Trans
            i18nKey="help.material.topCinemaBoard.description.noTileInRightTheaterBonus"
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
          i18nKey="help.material.topCinemaBoard.description.totalTheaterTilePrice"
          values={{ totalPrice: theaterTilesTotalPrice }}
          components={{ s: <strong></strong> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="help.material.topCinemaBoard.description.audience"
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
