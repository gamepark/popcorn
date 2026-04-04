import { BuyMovieCardCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { movieCardCharacteristics, PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { TheaterTileId } from '@gamepark/popcorn/material/TheaterTile'
import { BuyingPhaseRule } from '@gamepark/popcorn/rules/BuyingPhaseRule'
import { Picture, usePlayerName } from '@gamepark/react-game'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getMovieActionSymbol } from '../../../material/utils/movieCard.utils'
import { logContainerCss, symbolCss } from '../../utils/logCss.utils'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util'
import { LogMovieMaterialHelpLink } from '../utils/LogMovieMaterialHelpLink'
import { LogTheaterMaterialHelpLink } from '../utils/LogTheaterMaterialHelpLink'

export const BuyMovieCardLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const buyMove = move as BuyMovieCardCustomMove
  const rule = new BuyingPhaseRule(context.game)
  const playerName = usePlayerName(buyMove.data.player)
  const movieCard = rule.material(MaterialType.MovieCards).index(buyMove.data.boughtCardIndex).getItem<Required<PlayableMovieCardId>>()!
  const previousMovie = rule
    .material(MaterialType.MovieCards)
    .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
    .player(buyMove.data.player)
    .location((l) => l.x === buyMove.data.destinationSpot)
    .getItem<Required<PlayableMovieCardId>>()!
  const destinationTheaterTile = rule
    .material(MaterialType.TheaterTiles)
    .player(buyMove.data.player)
    .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
    .location((l) => l.x === buyMove.data.destinationSpot)
    .getItem<Required<TheaterTileId>>()!
  const boughtMovieCharacteristics = movieCardCharacteristics[movieCard.id.front]
  const showingsAction = boughtMovieCharacteristics.getBonusAction(destinationTheaterTile.id.front)
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.buyingAndAdvertisingPhase.buyMovieCard"
        values={{
          player: playerName,
          row: camelCase(LocationType[movieCard.location.type]),
          destinationSpot: buyMove.data.destinationSpot,
          price: boughtMovieCharacteristics.getPrice(movieCard.location.type as LocationType.PremiersRowSpot | LocationType.FeaturesRowSpot),
          isReplacingOtherMovie: previousMovie !== undefined,
          isShowingsBonus: showingsAction !== undefined
        }}
        components={{
          newMovieLink: <LogMovieMaterialHelpLink movieCard={movieCard} />,
          theater: <LogTheaterMaterialHelpLink theaterTile={destinationTheaterTile} showTileType />,
          oldMovie: previousMovie === undefined ? <></> : <LogMovieMaterialHelpLink movieCard={previousMovie} />,
          actionSymbol:
            showingsAction === undefined ? <></> : <Picture src={getMovieActionSymbol(showingsAction, boughtMovieCharacteristics.color)} css={symbolCss} />
        }}
      />
    </div>
  )
}
