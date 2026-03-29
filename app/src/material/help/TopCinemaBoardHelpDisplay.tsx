import { css } from '@emotion/react'
import { LobbySlider } from '@gamepark/popcorn/material/LobbySlider.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { TheaterTile, TheaterTileId } from '@gamepark/popcorn/material/TheaterTile.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { MaterialComponent, MaterialHelpDisplayProps, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { topCinemaBoardDescription } from '../TopCinemaBoardDescription.ts'

export const TopCinemaBoardHelpDisplay: FC<MaterialHelpDisplayProps<PlayerColor, MaterialType, LocationType>> = ({ item }) => {
  const rules = useRules<PopcornRules>()
  const audienceCubeSpot = rules?.material(MaterialType.AudienceCubes).player(item.location?.player).getItem()?.location.x ?? 0
  const theaterTiles = rules
    ?.material(MaterialType.TheaterTiles)
    .player(item.location?.player)
    .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
    .id<Required<TheaterTileId>>((id) => id.front !== TheaterTile.DefaultOneSeatTile && id.front !== TheaterTile.DefaultTwoSeatTile)
    .getItems<Required<TheaterTileId>>()
  return (
    <div
      css={css`
        width: ${topCinemaBoardDescription.width * 3.5}em;
        height: ${topCinemaBoardDescription.height * 3.5}em;
      `}
    >
      <MaterialComponent
        type={MaterialType.BottomCinemaBoard}
        itemId={item.id}
        css={css`
          font-size: 3.5em;
          width: 0;
          height: 0;
        `}
      />
      <MaterialComponent
        type={MaterialType.TopCinemaBoard}
        itemId={item.id}
        css={css`
          font-size: 3.5em;
          position: relative;
          width: 0;
          height: 0;
          top: -0.1em;
          left: -0.15em;
        `}
      />
      <MaterialComponent
        type={MaterialType.LobbySliders}
        itemId={getSliderFromPlayerAndSpot(item.id, 1)}
        css={css`
          font-size: 3.5em;
          position: relative;
          width: 0;
          height: 0;
          top: 2.7em;
          left: 0.85em;
        `}
      />
      <MaterialComponent
        type={MaterialType.LobbySliders}
        itemId={getSliderFromPlayerAndSpot(item.id, 2)}
        css={css`
          font-size: 3.5em;
          position: relative;
          width: 0;
          height: 0;
          top: 2.7em;
          left: 8.6em;
        `}
      />
      <MaterialComponent
        type={MaterialType.LobbySliders}
        itemId={getSliderFromPlayerAndSpot(item.id, 3)}
        css={css`
          font-size: 3.5em;
          position: relative;
          width: 0;
          height: 0;
          top: 2.7em;
          left: 16.3em;
        `}
      />
      <MaterialComponent
        type={MaterialType.AudienceCubes}
        css={css`
          font-size: 3.5em;
          position: relative;
          width: 0;
          height: 0;
          top: 13.9em;
          left: ${2.25 + 1.4 * audienceCubeSpot}em;
        `}
      />
      {theaterTiles?.map((tile, index) => {
        return (
          <MaterialComponent
            key={`cinemaHelp-t-${index}`}
            type={MaterialType.TheaterTiles}
            itemId={tile.id}
            css={css`
              font-size: 3.5em;
              width: 0;
              height: 0;
              position: relative;
              top: 4.95em;
              left: ${3 + (tile.location.x ?? 0) * 7.7}em;
            `}
          />
        )
      })}
    </div>
  )
}

const getSliderFromPlayerAndSpot = (player: PlayerColor, spot: 1 | 2 | 3) => {
  switch (player) {
    case PlayerColor.Cyan:
      switch (spot) {
        case 1:
          return LobbySlider.Cyan1
        case 2:
          return LobbySlider.Cyan2
        case 3:
          return LobbySlider.Cyan3
      }
      break
    case PlayerColor.Green:
      switch (spot) {
        case 1:
          return LobbySlider.Green1
        case 2:
          return LobbySlider.Green2
        case 3:
          return LobbySlider.Green3
      }
      break
    case PlayerColor.Orange:
      switch (spot) {
        case 1:
          return LobbySlider.Orange1
        case 2:
          return LobbySlider.Orange2
        case 3:
          return LobbySlider.Orange3
      }
      break
    case PlayerColor.Purple:
      switch (spot) {
        case 1:
          return LobbySlider.Purple1
        case 2:
          return LobbySlider.Purple2
        case 3:
          return LobbySlider.Purple3
      }
  }
}
