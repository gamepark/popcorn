import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PopcornMove } from '@gamepark/popcorn/material/PopcornMoves'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { MoveComponentContext, MoveComponentProps } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'

export type PopcornGame = MaterialGame<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>

export type PopcornMoveComponentProps = MoveComponentProps<PopcornMove, PlayerColor, PopcornGame>

export type PopcornMoveComponentContext = MoveComponentContext<PopcornMove, PlayerColor, PopcornGame>
