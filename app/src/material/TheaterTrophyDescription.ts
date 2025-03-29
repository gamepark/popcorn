import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { TheaterTrophy } from '@gamepark/game-template/material/TheaterTrophy'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { ComponentSize, TokenDescription } from '@gamepark/react-game'
import trophySecond from '../images/Tokens/3TheatreTrophy.png'
import trophyFirst from '../images/Tokens/5TheatreTrophy.png'

const trophySizes = {
  [TheaterTrophy.TrophyFirst]: { width: 3.83, height: 6.94 },
  [TheaterTrophy.TrophySecond]: { width: 3.28, height: 5.92 }
}

class TheaterTrophyDescription extends TokenDescription<PlayerColor, MaterialType, LocationType, TheaterTrophy> {
  public getSize(id: TheaterTrophy): ComponentSize {
    return trophySizes[id]
  }

  images = {
    [TheaterTrophy.TrophyFirst]: trophyFirst,
    [TheaterTrophy.TrophySecond]: trophySecond
  }
}

export const theaterTrophyDescription = new TheaterTrophyDescription()
