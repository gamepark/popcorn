import { PopcornMaterialAnimationContext } from './popcornAnimationTypes.util.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'

export const getDisplayedPlayerFromContext = (context: PopcornMaterialAnimationContext): PlayerColor =>
  context.rules.game.view ?? context.player ?? context.rules.game.players[0]