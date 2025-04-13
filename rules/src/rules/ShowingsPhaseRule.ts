import { MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class ShowingsPhaseRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.game.players.flatMap((player: PlayerColor) => {
      const numberOfGuestsToDraw = this.getNumberOfGuestsToDraw(player)
      return this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderBlothBagSpot).player(player).deck().dealAtOnce(
        {
          type: LocationType.PlayerShowingsDrawnGuestSpot,
          player: player
        },
        numberOfGuestsToDraw
      )
    })
  }

  public getActivePlayerLegalMoves(_player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return [this.endGame()]
  }

  private getNumberOfGuestsToDraw(player: PlayerColor): number {
    const audienceCubeLocation = this.material(MaterialType.AudienceCubes).player(player).getItems()[0].location
    switch (audienceCubeLocation.x ?? 0) {
      case 0:
        return 3
      case 1:
      case 2:
        return 4
      case 3:
      case 4:
        return 5
      case 5:
      case 6:
      case 7:
        return 6
      case 8:
        return 7
      default:
        throw new Error('Invalid audience cube spot')
    }
  }
}
