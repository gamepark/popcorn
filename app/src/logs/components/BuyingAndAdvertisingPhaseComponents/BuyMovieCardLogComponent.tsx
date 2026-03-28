import { BuyMovieCardCustomMove } from '@gamepark/popcorn/material/CustomMoveType.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { movieCardCharacteristics, PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard.ts'
import { TheaterTileId } from '@gamepark/popcorn/material/TheaterTile.ts'
import { BuyingPhaseRule } from '@gamepark/popcorn/rules/BuyingPhaseRule.ts'
import { Picture, usePlayerName } from '@gamepark/react-game'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getMovieActionSymbol } from '../../../material/utils/movieCard.utils.ts'
import { logContainerCss, symbolCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'
import { LogMovieMaterialHelpLink } from '../utils/LogMovieMaterialHelpLink.tsx'
import { LogTheaterMaterialHelpLink } from '../utils/LogTheaterMaterialHelpLink.tsx'

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
        defaults={
          '{player} buys <newMovieLink/> from the {row, select, featuresRowSpot{Features} premiersRowSpot{Premiers} other{}}' +
          ' row for ${price}{isShowingsBonus, select, true{,} other{ and}} places it in their <theater/>{isReplacingOtherMovie, select, true{ replacing <oldMovie/>} other{}}' +
          '{isShowingsBonus, select, true{, earning the showing bonus <actionSymbol/>} other{}}'
        }
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
