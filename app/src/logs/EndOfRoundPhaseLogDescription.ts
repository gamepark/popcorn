import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { isPopcornCreateItemType, isPopcornMoveItemType, isPopcornMoveItemTypeAtOnce, PopcornMove } from '@gamepark/popcorn/material/PopcornMoves.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'
import { LogDescription, MovePlayedLogDescription } from '@gamepark/react-game'
import { isDeleteItemTypeAtOnce } from '@gamepark/rules-api'
import { LobbySliderMovesLogComponent } from './components/EndOfRoundPhaseComponents/LobbySliderMovesLogComponent.tsx'
import { MovieCardsDeletedLogComponent } from './components/EndOfRoundPhaseComponents/MovieCardsDeletedLogComponent.tsx'
import { NewFeatureMoviesLogComponent } from './components/EndOfRoundPhaseComponents/NewFeatureMoviesLogComponent.tsx'
import { NewFirstPlayerLogComponent } from './components/EndOfRoundPhaseComponents/NewFirstPlayerLogComponent.tsx'
import { NewPremierMoviesLogComponent } from './components/EndOfRoundPhaseComponents/NewPremierMoviesLogComponent.tsx'
import { PremierToFeatureMoviesLogComponent } from './components/EndOfRoundPhaseComponents/PremierToFeatureMoviesLogComponent.tsx'
import { StartFinalRoundLogComponent } from './components/RuleComponents/StartFinalRoundLogComponent.tsx'
import { isPopcornMoveFromLocation } from './utils/PopcornMove.utils.ts'
import { PopcornGame, PopcornMoveComponentContext } from './utils/PopcornTypes.util.ts'

export class EndOfRoundPhaseLogDescription implements LogDescription<PopcornMove, PlayerColor, PopcornGame> {
  public getMovePlayedLogDescription(move: PopcornMove, context: PopcornMoveComponentContext): MovePlayedLogDescription<PopcornMove, PlayerColor> | undefined {
    if (context.game.rule?.id === RuleId.EndOfRoundPhaseTheatricalRunRule) {
      if (isPopcornMoveItemType(MaterialType.LobbySliders)(move)) {
        if (!context.action.consequences.slice((context.consequenceIndex ?? 0) + 1).some(isPopcornMoveItemType(MaterialType.LobbySliders))) {
          return { Component: LobbySliderMovesLogComponent }
        }
      }
    }
    if (context.game.rule?.id === RuleId.EndOfRoundPhaseNewLineUpRule) {
      if (isDeleteItemTypeAtOnce(MaterialType.MovieCards)(move) && isPopcornMoveFromLocation(move, LocationType.FeaturesRowSpot, context)) {
        return { Component: MovieCardsDeletedLogComponent }
      }
      if (
        isPopcornMoveItemTypeAtOnce(MaterialType.MovieCards)(move) &&
        isPopcornMoveFromLocation(move, LocationType.MovieCardDeckSpot, context) &&
        move.location.type === LocationType.PremiersRowSpot
      ) {
        return { Component: NewPremierMoviesLogComponent }
      }
      if (
        isPopcornMoveItemType(MaterialType.MovieCards)(move) &&
        move.location.type === LocationType.FeaturesRowSpot &&
        isPopcornMoveFromLocation(move, LocationType.PremiersRowSpot, context) &&
        !context.action.consequences
          .slice((context.consequenceIndex ?? 0) + 1)
          .some(
            (m) =>
              isPopcornMoveItemType(MaterialType.MovieCards)(m) &&
              m.location.type === LocationType.FeaturesRowSpot &&
              isPopcornMoveFromLocation(move, LocationType.PremiersRowSpot, context)
          )
      ) {
        return { Component: PremierToFeatureMoviesLogComponent }
      }
      if (
        isPopcornMoveItemTypeAtOnce(MaterialType.MovieCards)(move) &&
        move.location.type === LocationType.FeaturesRowSpot &&
        isPopcornMoveFromLocation(move, LocationType.MovieCardDeckSpot, context)
      ) {
        return { Component: NewFeatureMoviesLogComponent }
      }
      if (isPopcornMoveItemType(MaterialType.FirstPlayerMarker)(move)) {
        return { Component: NewFirstPlayerLogComponent, player: move.location.player }
      }
      if (isPopcornCreateItemType(MaterialType.MovieCards)(move)) {
        return { Component: StartFinalRoundLogComponent, css: ruleCss }
      }
    }
    return undefined
  }
}

const ruleCss = css`
  justify-content: center;
`
