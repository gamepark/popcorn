import { PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayableMovieCardId } from '../../material/MovieCard'
import { PopcornMove } from '../../material/PopcornMoves'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export class EndOfRoundPhaseTheatricalRunRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  public getActivePlayerLegalMoves(_player: PlayerColor): PopcornMove[] {
    return []
  }

  public getMovesAfterPlayersDone(): PopcornMove[] {
    return []
  }

  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): PopcornMove[] {
    return this.unselectTheaterTiles()
      .concat(this.selectAdvertisingTokens())
      .concat(this.getTheatricalRunConsequences())
      .concat(this.startSimultaneousRule(RuleId.EndOfRoundPhaseNewLineUpRule, []))
  }

  private getTheatricalRunConsequences(): PopcornMove[] {
    const firstPlayer = this.material(MaterialType.FirstPlayerMarker).getItem()!.location.player!
    const firstPlayerIndex = this.game.players.indexOf(firstPlayer)
    const playersOrder = this.game.players.slice(firstPlayerIndex).concat(this.game.players.slice(0, firstPlayerIndex))
    const sliderMaterial = this.material(MaterialType.LobbySliders).location(LocationType.LobbySliderSpotOnTopPlayerCinemaBoard)
    return this.material(MaterialType.MovieCards)
      .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
      .sort(
        (card) => playersOrder.indexOf(card.location.player!),
        (card) => card.location.x ?? 0
      )
      .filter((card) => sliderMaterial.player(card.location.player).location((l) => l.x === card.location.x && (l.y ?? 0) < 4).exists)
      .getItems<Required<PlayableMovieCardId>>()
      .map((movieCard) =>
        sliderMaterial
          .player(movieCard.location.player)
          .location((l) => l.x === movieCard.location.x)
          .moveItem((item) => ({
            ...item.location,
            y: Math.min(4, (item.location.y ?? 0) + 1)
          }))
      )
  }

  private unselectTheaterTiles(): PopcornMove[] {
    return this.material(MaterialType.TheaterTiles).selected(true).unselectItems()
  }

  private selectAdvertisingTokens(): PopcornMove[] {
    return this.material(MaterialType.AdvertisingTokens).location(LocationType.AdvertisingTokenSpotOnAdvertisingBoard).selectItems()
  }
}
