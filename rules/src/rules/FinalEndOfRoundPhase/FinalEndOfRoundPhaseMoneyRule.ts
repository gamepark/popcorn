import { MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { moneyTokens } from '../../material/MoneyToken'
import { popcornTokens } from '../../material/PopcornToken'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export class FinalEndOfRoundPhaseMoneyRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
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
    const playerMovieCardMaterial = this.material(MaterialType.MovieCards).location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
    const playerMovieSliderMaterial = this.material(MaterialType.LobbySliders).location(LocationType.LobbySliderSpotOnTopPlayerCinemaBoard)
    const moneyTokenMaterial = this.material(MaterialType.MoneyTokens).location(LocationType.PlayerMoneyPileSpot).money(moneyTokens)
    const popcornTokenMaterial = this.material(MaterialType.PopcornTokens).location(LocationType.PlayerPopcornPileUnderPopcornCupSpot).money(popcornTokens)
    return this.game.players
      .flatMap((player) => {
        const playerMoney = moneyTokenMaterial.player(player).count
        const equivalentPopcornToAdd = Math.floor(playerMoney / 5)
        return (
          playerMovieSliderMaterial
            .player(player)
            .location((l) => (l.x ?? 0) > 0)
            .moveItems((item) => ({
              ...item.location,
              y: 0
            })) as MaterialMove<PlayerColor, MaterialType, LocationType>[]
        )
          .concat(playerMovieCardMaterial.player(player).moveItems({ type: LocationType.PlayerMovieCardArchiveSpot, player: player }))
          .concat(
            moneyTokenMaterial.removeMoney(equivalentPopcornToAdd * 5, {
              type: LocationType.PlayerMoneyPileSpot,
              player: player
            })
          )
          .concat(
            popcornTokenMaterial.addMoney(equivalentPopcornToAdd, {
              type: LocationType.PlayerPopcornPileUnderPopcornCupSpot,
              player: player
            })
          )
      })
      .concat(this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.FinalEndOfRoundPhaseTheaterTrophyRule, []))
  }
}
