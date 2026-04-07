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
import { FilmStrip } from '../../theme/filmStrip'
import { headerDarkCss, headerTitleCss, helpBodyCss, sectionHeaderCss, pillsCss, pillCss, pillLabelCss, pillValueCss, pillValuePriceCss } from '../../theme/helpStyles'
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
      <div css={headerDarkCss}>
        <h2 css={headerTitleCss}>
          <Trans i18nKey="help.material.topCinemaBoard.title" values={{ player: playerName }}/>
        </h2>
      </div>
      <FilmStrip/>
      <div css={helpBodyCss}>
        <p>
          <Trans i18nKey="help.material.topCinemaBoard.description" values={{ player: playerName }}/>
        </p>
        {!theaterTiles?.some((tile) => tile.location.x === 2) && (
          <p>
            <Trans
              i18nKey="help.material.topCinemaBoard.description.noTileInRightTheaterBonus"
              values={{ player: playerName }}
              components={{
                cube: <MaterialComponent type={MaterialType.AudienceCubes} css={inlineComponentCss}/>
              }}
            />
          </p>
        )}

        <h4 css={sectionHeaderCss}>
          <Trans i18nKey="help.material.topCinemaBoard.header.stats" defaults="Stats"/>
        </h4>
        <div css={pillsCss}>
          <div css={pillCss}>
            <span css={pillLabelCss}><Trans i18nKey="help.material.topCinemaBoard.pill.tilePrice" defaults="Theater Tiles"/></span>
            <span css={pillValuePriceCss}>${theaterTilesTotalPrice}</span>
          </div>
          <div css={pillCss}>
            <span css={pillLabelCss}><Trans i18nKey="help.material.topCinemaBoard.pill.audience" defaults="Audience"/></span>
            <span css={pillValueCss}>{audience}</span>
            <Picture src={audienceSymbol} css={inlineIconCss}/>
          </div>
          <div css={pillCss}>
            <span css={pillLabelCss}><Trans i18nKey="help.material.topCinemaBoard.pill.guestsDraw" defaults="Guests drawn"/></span>
            <span css={pillValueCss}>{audience}</span>
            <Picture src={unknownGuestSymbol} css={inlineIconCss}/>
          </div>
        </div>
      </div>
    </>
  )
}

const inlineComponentCss = css`
  font-size: 0.8em;
  display: inline-block;
  vertical-align: middle;
`

const inlineIconCss = css`
  height: 1.2em !important;
  vertical-align: middle;
`
