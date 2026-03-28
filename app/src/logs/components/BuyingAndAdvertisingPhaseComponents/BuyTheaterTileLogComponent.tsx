import { BuyTheaterTileCustomMove } from '@gamepark/popcorn/material/CustomMoveType.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { MovieAction, MovieColor } from '@gamepark/popcorn/material/MovieCard.ts'
import { BuyableTheaterTileId, TheaterTile, TheaterTileId, theaterTilesCharacteristics } from '@gamepark/popcorn/material/TheaterTile.ts'
import { BuyingPhaseRule } from '@gamepark/popcorn/rules/BuyingPhaseRule.ts'
import { Picture, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getMovieActionSymbol } from '../../../material/utils/movieCard.utils.ts'
import { logContainerCss, symbolCss } from '../../utils/logCss.utils.ts'
import { PopcornMoveComponentProps } from '../../utils/PopcornTypes.util.ts'
import { LogMaterialHelpLink } from '../utils/LogMaterialHelpLink.tsx'
import { MaterialComponentWithHelp } from '../utils/MaterialComponentWithHelp.tsx'

export const BuyTheaterTileLogComponent: FC<PopcornMoveComponentProps> = ({ move, context }) => {
  const buyMove = move as BuyTheaterTileCustomMove
  const rule = new BuyingPhaseRule(context.game)
  const playerName = usePlayerName(buyMove.data.player)
  const boughtTile = rule.material(MaterialType.TheaterTiles).index(buyMove.data.boughtTileIndex).getItem<Required<BuyableTheaterTileId>>()!
  const previousTile = rule
    .material(MaterialType.TheaterTiles)
    .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
    .player(buyMove.data.player)
    .location((l) => l.x === buyMove.data.destinationSpot)
    .getItem<TheaterTileId>()
  const isFirstRightTheaterTile = buyMove.data.destinationSpot === 2 && previousTile === undefined
  const isReplacingDefaultTile =
    previousTile !== undefined && (previousTile.id.front === TheaterTile.DefaultOneSeatTile || previousTile.id.front === TheaterTile.DefaultTwoSeatTile)
  const tileComponent = <MaterialComponentWithHelp<BuyableTheaterTileId> itemType={MaterialType.TheaterTiles} item={boughtTile} displayHelp />
  return (
    <div css={logContainerCss}>
      <Trans
        i18nKey="log.buyingPhase.buyTheaterTile"
        defaults={
          '{player} buys <tile/> for ${price}{isFirstRightTheaterTile, select, true{,} other { and}} places it in their {destinationSpot, select, 0{left} 1{center} 2{right} other{}}' +
          ' theater{replacePreviousTile, select, true{, replacing their <oldTileLink>previous tile</oldTileLink>} other{}}' +
          '{isFirstRightTheaterTile, select, true{, and gains <audienceAdvanceSymbol/> as it is their first tile in the right theater} other{}}'
        }
        values={{
          player: playerName,
          destinationSpot: buyMove.data.destinationSpot,
          replacePreviousTile: previousTile !== undefined && !isReplacingDefaultTile,
          isFirstRightTheaterTile: isFirstRightTheaterTile,
          price: theaterTilesCharacteristics[boughtTile.id.front].getPrice()
        }}
        components={{
          tile: tileComponent,
          oldTileLink:
            previousTile === undefined ||
            previousTile.id.front === TheaterTile.DefaultOneSeatTile ||
            previousTile.id.front === TheaterTile.DefaultTwoSeatTile ? (
              <></>
            ) : (
              <LogMaterialHelpLink itemType={MaterialType.TheaterTiles} item={previousTile}></LogMaterialHelpLink>
            ),
          audienceAdvanceSymbol: <Picture src={getMovieActionSymbol(MovieAction.AudienceTrackAdvance, MovieColor.Blue)} css={symbolCss} />
        }}
      />
    </div>
  )
}
