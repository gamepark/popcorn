import { PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { moneyTokens } from '../../material/MoneyToken'
import { PopcornMove } from '../../material/PopcornMoves'
import { popcornTokens } from '../../material/PopcornToken'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export class FinalEndOfRoundPhaseMoneyRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  public getActivePlayerLegalMoves(_player: PlayerColor): PopcornMove[] {
    return []
  }

  public getMovesAfterPlayersDone(): PopcornMove[] {
    return []
  }
  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): PopcornMove[] {
    const playerMovieCardMaterial = this.material(MaterialType.MovieCards).location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
    const moneyTokenMaterial = this.material(MaterialType.MoneyTokens).location(LocationType.PlayerMoneyPileSpot).money(moneyTokens)
    const popcornTokenMaterial = this.material(MaterialType.PopcornTokens).location(LocationType.PlayerPopcornPileUnderPopcornCupSpot).money(popcornTokens)
    return [this.material(MaterialType.LobbySliders).moveItemsAtOnce({ y: 0 }) as PopcornMove].concat(
      this.game.players
        .flatMap((player) => {
          const playerMoney = moneyTokenMaterial.player(player).count
          const equivalentPopcornToAdd = Math.floor(playerMoney / 5)
          this.memorize(Memory.MoneyPopcorn, equivalentPopcornToAdd, player)
          return [playerMovieCardMaterial.player(player).moveItemsAtOnce({ type: LocationType.PlayerMovieCardArchiveSpot, player: player }) as PopcornMove]
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
    )
  }
}
