import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { TheaterTile } from '@gamepark/popcorn/material/TheaterTile'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { DropAreaDescription } from '@gamepark/react-game'
import { theaterTileDescription } from '../material/TheaterTileDescription'
import { TheaterTileDeckHelp } from './help/TheaterTileDeckHelp'

export class TheaterTileDeckLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, TheaterTile, RuleId, PlayerColor> {
  width = theaterTileDescription.width
  height = theaterTileDescription.height

  help = TheaterTileDeckHelp
}
