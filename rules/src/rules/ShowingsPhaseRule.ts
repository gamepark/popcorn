import { isShuffleItemType, ItemMove, MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { GuestPawn } from '../material/GuestPawn'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memorize, PlayerActionMemory } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { ShowingsPhasePlaceGuestsRule } from './ShowingsPhasePlaceGuestsRule'

export class ShowingsPhaseRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  private subRules = {
    placeGuests: new ShowingsPhasePlaceGuestsRule(this.game)
  }
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.game.players.flatMap((player: PlayerColor) => {
      const theoreticalNumberOfGuestsToDraw = this.getNumberOfGuestsToDraw(player)
      const playerGuestInBagMaterial = this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(player)
      const numberOfGuestsToDraw = Math.min(playerGuestInBagMaterial.length, theoreticalNumberOfGuestsToDraw)
      const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = [
        playerGuestInBagMaterial.deck().dealAtOnce(
          {
            type: LocationType.PlayerShowingsDrawnGuestSpot,
            player: player
          },
          numberOfGuestsToDraw
        )
      ]
      if (theoreticalNumberOfGuestsToDraw === numberOfGuestsToDraw) {
        const exitGuestDeck = this.material(MaterialType.GuestPawns).location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard).player(player).deck()
        consequences.push(
          exitGuestDeck.moveItemsAtOnce({
            type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
            player: player
          }),
          exitGuestDeck.shuffle()
        )
      }
      return consequences
    })
  }

  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const ruleActions = this.remind<PlayerActionMemory>(Memorize.PlayerActions, player)[RuleId.ShowingsPhaseRule]
    if (!ruleActions.guestPlaced) {
      return this.subRules.placeGuests.getActivePlayerLegalMoves(player)
    }
    return []
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return Object.values(this.subRules).flatMap((subRule) => subRule.beforeItemMove(move, context))
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isShuffleItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move)) {
      const guestPawns = this.material(MaterialType.GuestPawns)
        .index((guestIndex) => move.indexes.includes(guestIndex))
        .getItems<GuestPawn>()
      const players = guestPawns.map((guestPawn) => guestPawn.location.player)
      const player = players.every((p) => p === players[0]) ? players[0] : undefined
      if (player === undefined) {
        throw new Error('Undefined played after shuffle')
      }
      if (!this.remind<PlayerActionMemory>(Memorize.PlayerActions, player)[RuleId.ShowingsPhaseRule].guestPlaced) {
        const numberOfRemainingGuestToDraw =
          this.getNumberOfGuestsToDraw(player) -
          this.material(MaterialType.GuestPawns).location(LocationType.PlayerShowingsDrawnGuestSpot).player(player).length
        return [
          this.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(player).deck().dealAtOnce(
            {
              type: LocationType.PlayerShowingsDrawnGuestSpot,
              player: player
            },
            numberOfRemainingGuestToDraw
          )
        ]
      }
    }
    return super.afterItemMove(move, _context)
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
