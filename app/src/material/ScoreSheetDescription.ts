import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { BoardDescription, ItemContext } from '@gamepark/react-game'
import { getEnumValues, Location, MaterialItem } from '@gamepark/rules-api'
import scoreSheet from '../images/ScoreSheet.png'
import { ScoreDataLocationId } from '../locators/ScoreDataSpotOnScoreSheetLocator'
import { PopcornScoringDescription, PopcornScoringKeys } from '../scoring/PopcornScoringDescription'
import { ScoreSheetHelp } from './help/ScoreSheetHelp'

class ScoreSheetDescription extends BoardDescription<PlayerColor, MaterialType, LocationType, undefined, RuleId, PlayerColor> {
  width = 15
  height = 5.67

  image = scoreSheet

  help = ScoreSheetHelp

  staticItem = { id: undefined, location: { type: LocationType.ScoreSheetSpot } }

  public getLocations(
    _item: MaterialItem<PlayerColor, LocationType, undefined>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Location<PlayerColor, LocationType>[] {
    const baseLocations = context.rules.game.players.map((p) => ({ type: LocationType.ScoreDataSpotOnScoreSheet, player: p, id: ScoreDataLocationId.Name }))
    return context.rules.isOver()
      ? baseLocations.concat(
          context.rules.game.players.flatMap((p) =>
            getEnumValues(ScoreDataLocationId)
              .filter((lId) => lId !== ScoreDataLocationId.Name)
              .map((lId) => ({
                type: LocationType.ScoreDataSpotOnScoreSheet,
                player: p,
                id: lId,
                z: this.getScoreForLocationId(lId, p, context.rules as unknown as PopcornRules)
              }))
          )
        )
      : baseLocations
  }

  private getScoreForLocationId(locationId: Exclude<ScoreDataLocationId, ScoreDataLocationId.Name>, player: PlayerColor, rules: PopcornRules): number {
    const scoringKey = this.getScoreKeyForScoreDataLocationId(locationId)
    const scoringDescription = new PopcornScoringDescription()
    return scoringDescription.getScoringPlayerData(scoringKey, player, rules) as number
  }

  private getScoreKeyForScoreDataLocationId(locationId: Exclude<ScoreDataLocationId, ScoreDataLocationId.Name>): PopcornScoringKeys {
    switch (locationId) {
      case ScoreDataLocationId.PopcornAwardCard:
        return PopcornScoringKeys.AwardCardsPopcorn
      case ScoreDataLocationId.PopcornDuringGame:
        return PopcornScoringKeys.PopcornEarnedDuringGame
      case ScoreDataLocationId.PopcornMoney:
        return PopcornScoringKeys.PopcornEarnedWithMoney
      case ScoreDataLocationId.PopcornTheaterTrophy:
        return PopcornScoringKeys.TheaterTrophyPopcorn
      case ScoreDataLocationId.Total:
        return PopcornScoringKeys.Total
    }
  }
}

export const scoreSheetDescription = new ScoreSheetDescription()
