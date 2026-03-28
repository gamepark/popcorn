import { PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { groupBy, maxBy } from 'es-toolkit'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PopcornMove } from '../../material/PopcornMoves'
import { popcornTokens } from '../../material/PopcornToken'
import { TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { TheaterTrophy } from '../../material/TheaterTrophy'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export class FinalEndOfRoundPhaseTheaterTrophyRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  public getActivePlayerLegalMoves(_player: PlayerColor): PopcornMove[] {
    return []
  }

  public getMovesAfterPlayersDone(): PopcornMove[] {
    return []
  }

  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): PopcornMove[] {
    const theaterTileMaterial = this.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
    const theaterTrophyMaterial = this.material(MaterialType.TheaterTrophies)
    const playersGroupedByTotalTheaterCost = groupBy(
      this.game.players.map((player) => ({
        player: player,
        totalTheaterCost: theaterTileMaterial
          .player(player)
          .getItems<Required<TheaterTileId>>()
          .map((item) => theaterTilesCharacteristics[item.id.front].getPrice())
          .reduce((sum, currentPrice) => sum + currentPrice, 0)
      })),
      (item) => item.totalTheaterCost
    )
    const entriesSortedByDescendingCost = Object.entries(playersGroupedByTotalTheaterCost)
      .map<[number, { player: PlayerColor; totalTheaterCost: number }[]]>(([key, playersWithCost]) => [parseInt(key), playersWithCost])
      .sort((a, b) => b[0] - a[0])
    const firstGroup = maxBy(entriesSortedByDescendingCost, ([cost, _playerWithCost]) => cost)![1]
    const consequences: PopcornMove[] = firstGroup.flatMap(
      ({ player }) =>
        [
          theaterTrophyMaterial.createItem({
            id: this.game.players.length === 2 ? TheaterTrophy.TrophySecond : TheaterTrophy.TrophyFirst,
            location: {
              type: LocationType.PlayerTheaterTrophySpot,
              player: player
            }
          }),
          ...this.material(MaterialType.PopcornTokens)
            .money(popcornTokens)
            .addMoney(this.game.players.length === 2 ? 3 : 5, {
              type: LocationType.PlayerPopcornPileUnderPopcornCupSpot,
              player: player
            })
        ] as PopcornMove[]
    )
    if (this.game.players.length > 2 && firstGroup.length === 1) {
      const secondGroup = maxBy(entriesSortedByDescendingCost.slice(1), ([cost, _playerWithCost]) => cost)![1]
      consequences.push(
        ...secondGroup.flatMap(
          ({ player }) =>
            [
              theaterTrophyMaterial.createItem({
                id: TheaterTrophy.TrophySecond,
                location: {
                  type: LocationType.PlayerTheaterTrophySpot,
                  player: player
                }
              }),
              ...this.material(MaterialType.PopcornTokens).money(popcornTokens).addMoney(3, {
                type: LocationType.PlayerPopcornPileUnderPopcornCupSpot,
                player: player
              })
            ] as PopcornMove[]
        )
      )
    }
    return consequences.concat(this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.FinalEndOfRoundPhaseAwardCardPointsRule, []))
  }
}
