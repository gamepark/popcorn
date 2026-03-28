import { MaterialGame, MaterialItem, SimultaneousRule } from '@gamepark/rules-api'
import { GamePhase } from '../../GamePhase'
import { Actions } from '../../material/Actions/Actions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { movieCardCharacteristics, MovieColor, PlayableMovieCardId } from '../../material/MovieCard'
import { PopcornMove } from '../../material/PopcornMoves'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export abstract class ActionRule<T extends Actions> extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  public action: T

  constructor(game: MaterialGame<PlayerColor, MaterialType, LocationType>, player?: PlayerColor, action?: T) {
    super(game)
    if (this.game.rule?.players !== undefined) {
      this.action = action ?? (this.remind<Actions[]>(Memory.PendingActions, player ?? this.game.rule.players[0])[0] as T)
    } else {
      this.action = action ?? (this.remind<Actions[]>(Memory.PendingActions, player ?? this.game.players[0])[0] as T)
    }
  }

  public abstract consequencesBeforeRuleForPlayer(player: PlayerColor): PopcornMove[]

  public getActionsForPlayer(player: PlayerColor, filter?: (action: Actions) => boolean): Actions[] {
    const actions = this.remind<Actions[]>(Memory.PendingActions, player)
    return filter !== undefined && filter !== null && typeof filter === 'function' ? actions.filter(filter) : actions
  }

  protected existsPendingActionForPlayer(player: PlayerColor, filter: (action: Actions) => boolean) {
    return this.getActionsForPlayer(player).some(filter)
  }

  protected updateActionsForPlayer(player: PlayerColor, updateFn: (oldPendingActions: Actions[]) => Actions[]) {
    this.memorize<Actions[]>(Memory.PendingActions, updateFn, player)
  }

  public addPendingActionForPlayer(player: PlayerColor, action: Actions, before: boolean = true) {
    this.addPendingActionsForPlayer(player, [action], before)
  }

  public addPendingActionsForPlayer(player: PlayerColor, actions: Actions[], before: boolean = true) {
    const updateFn = before ? (pendingActions: Actions[]) => actions.concat(pendingActions) : (pendingActions: Actions[]) => actions.concat(pendingActions)
    this.updateActionsForPlayer(player, updateFn)
  }

  protected removeCurrentActionForPlayer(player: PlayerColor) {
    this.memorize<Actions[]>(Memory.PendingActions, (actions) => actions.slice(1), player)
  }

  protected getMovieCardFromSpot(player: PlayerColor, movieSpot: number): MaterialItem<PlayerColor, LocationType, Required<PlayableMovieCardId>> {
    return this.material(MaterialType.MovieCards)
      .player(player)
      .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
      .location((l) => l.x === movieSpot)
      .getItems<Required<PlayableMovieCardId>>()[0]
  }

  protected getMovieColorFromSpot(player: PlayerColor, movieSpot: number): MovieColor {
    const movieCard = this.getMovieCardFromSpot(player, movieSpot)
    const movieCharacteristics = movieCardCharacteristics[movieCard.id.front]
    return movieCharacteristics.color
  }

  protected get currentPhase(): GamePhase {
    switch (this.game.rule?.id) {
      case RuleId.DealAndDiscardAwardCards:
        return GamePhase.Setup
      case RuleId.BuyingPhaseRule:
        return GamePhase.BuyingPhase
      case RuleId.ShowingsPhaseRule:
        return GamePhase.ShowingsPhase
      default:
        throw new Error('Incorrect rule id')
    }
  }
}
