import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { MaterialContext, RoundTokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import advertisingTokenCyen from '../images/Tokens/Advertising/AdvertisingTokenBlue.jpg'
import advertisingTokenGreen from '../images/Tokens/Advertising/AdvertisingTokenGreen.jpg'
import advertisingTokenOrange from '../images/Tokens/Advertising/AdvertisingTokenOrange.jpg'
import advertisingTokenPurple from '../images/Tokens/Advertising/AdvertisingTokenPurple.jpg'
import { AdvertisingTokenHelp } from './help/AdvertisingTokenHelp'

class AdvertisingTokenDescription extends RoundTokenDescription<PlayerColor, MaterialType, LocationType, PlayerColor, RuleId, PlayerColor> {
  diameter = 1.8
  thickness = 0.2

  images = {
    [PlayerColor.Cyan]: advertisingTokenCyen,
    [PlayerColor.Green]: advertisingTokenGreen,
    [PlayerColor.Orange]: advertisingTokenOrange,
    [PlayerColor.Purple]: advertisingTokenPurple
  }

  help = AdvertisingTokenHelp

  public getStaticItems(
    _context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): MaterialItem<PlayerColor, LocationType, PlayerColor>[] {
    return _context.rules.players.map((color) => ({
      id: color,
      quantity: 3,
      location: {
        type: LocationType.PlayerAdvertisingTokenSpot,
        player: color
      }
    }))
  }
}

export const advertisingTokenDescription = new AdvertisingTokenDescription()
