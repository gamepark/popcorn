import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { TheaterTile } from '@gamepark/popcorn/material/TheaterTile.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { DropAreaDescription } from '@gamepark/react-game'
import { theaterTileDescription } from '../material/TheaterTileDescription.tsx'
import { TheaterTileDeckHelp } from './help/TheaterTileDeckHelp.tsx'

export class TheaterTileDeckLocationDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, TheaterTile> {
  width = theaterTileDescription.width
  height = theaterTileDescription.height

  help = TheaterTileDeckHelp
}
