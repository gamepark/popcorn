import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { awardCardDescription } from './AwardCardDescription'
import { movieCardDescription } from './MovieCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.MovieCards]: movieCardDescription,
  [MaterialType.AwardCards]: awardCardDescription
}
