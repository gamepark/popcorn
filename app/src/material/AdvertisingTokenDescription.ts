import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { RoundTokenDescription } from '@gamepark/react-game'
import advertisingTokenCyen from '../images/Tokens/Advertising/AdvertisingTokenBlue.jpg'
import advertisingTokenGreen from '../images/Tokens/Advertising/AdvertisingTokenGreen.jpg'
import advertisingTokenOrange from '../images/Tokens/Advertising/AdvertisingTokenOrange.jpg'
import advertisingTokenPurple from '../images/Tokens/Advertising/AdvertisingTokenPurple.jpg'

class AdvertisingTokenDescription extends RoundTokenDescription<PlayerColor, MaterialType, LocationType, PlayerColor> {
  diameter = 1.8
  thickness = 0.2

  images = {
    [PlayerColor.Cyan]: advertisingTokenCyen,
    [PlayerColor.Green]: advertisingTokenGreen,
    [PlayerColor.Orange]: advertisingTokenOrange,
    [PlayerColor.Purple]: advertisingTokenPurple
  }
}

export const advertisingTokenDescription = new AdvertisingTokenDescription()
