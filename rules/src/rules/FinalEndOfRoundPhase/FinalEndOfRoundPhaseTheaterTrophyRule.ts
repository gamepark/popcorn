import { MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { groupBy, maxBy } from 'es-toolkit'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { TheaterTrophy } from '../../material/TheaterTrophy'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export class FinalEndOfRoundPhaseTheaterTrophyRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  public getActivePlayerLegalMoves(_player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
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
    const consequences: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] = firstGroup.map(({ player }) =>
      theaterTrophyMaterial.createItem({
        id: TheaterTrophy.TrophyFirst,
        location: {
          type: LocationType.PlayerTheaterTrophySpot,
          player: player
        }
      })
    )
    if (this.game.players.length > 2 && firstGroup.length === 1) {
      const secondGroup = maxBy(entriesSortedByDescendingCost.slice(1), ([cost, _playerWithCost]) => cost)![1]
      consequences.push(
        ...secondGroup.map(({ player }) =>
          theaterTrophyMaterial.createItem({
            id: TheaterTrophy.TrophySecond,
            location: {
              type: LocationType.PlayerTheaterTrophySpot,
              player: player
            }
          })
        )
      )
    }
    return consequences
  }
}
