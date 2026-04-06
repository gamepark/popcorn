import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { ScoreDataContent } from '../material/ScoreDataContent'

export enum ScoreDataLocationId {
  Name,
  PopcornDuringGame,
  PopcornMoney,
  PopcornAwardCard,
  PopcornTheaterTrophy,
  Total
}

const baseCoordinatesByLocationId = {
  [ScoreDataLocationId.Name]: { x: -6, y: -0.5 },
  [ScoreDataLocationId.PopcornDuringGame]: { x: -2.12, y: -0.5 },
  [ScoreDataLocationId.PopcornMoney]: { x: 0.12, y: -0.5 },
  [ScoreDataLocationId.PopcornAwardCard]: { x: 2.25, y: -0.5 },
  [ScoreDataLocationId.PopcornTheaterTrophy]: { x: 4.63, y: -0.5 },
  [ScoreDataLocationId.Total]: { x: 6.75, y: -0.5 }
}

class ScoreDataSpotOnScoreSheetLocator extends Locator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  parentItemType = MaterialType.ScoreSheet
  locationDescription = new ScoreDataSpotLocationDescription()

  public getLocationCoordinates(
    location: Location<PlayerColor, LocationType, ScoreDataLocationId>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    const baseCoordinates = baseCoordinatesByLocationId[location.id!]
    const playerIndex = context.rules.game.players.indexOf(location.player!)
    return { x: baseCoordinates.x, y: baseCoordinates.y + playerIndex * 0.85 }
  }
}

class ScoreDataSpotLocationDescription extends LocationDescription<PlayerColor, MaterialType, LocationType, undefined, RuleId, PlayerColor> {
  width = 2
  height = 1

  content = ScoreDataContent

  displayInParentItemHelp = true
}

export const scoreDataSpotOnScoreSheetLocator = new ScoreDataSpotOnScoreSheetLocator()
