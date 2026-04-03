import { AnimationPredicate, MaterialAnimationContext } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { RuleId } from '@gamepark/popcorn/rules/RuleId.ts'

export type PopcornAnimationPredicate = AnimationPredicate<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
export type PopcornMaterialAnimationContext = MaterialAnimationContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>