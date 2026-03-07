import { MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayableMovieCardId } from '../../material/MovieCard'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export class EndOfRoundPhaseTheatricalRunRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId> {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return this.unselectTheaterTiles()
      .concat(this.selectAdvertisingTokens())
      .concat(this.getTheatricalRunConsequences())
      .concat(this.startPlayerTurn(RuleId.EndOfRoundPhaseNewLineUpRule, this.player))
  }

  private getTheatricalRunConsequences(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const sliderMaterial = this.material(MaterialType.LobbySliders).location(LocationType.LobbySliderSpotOnTopPlayerCinemaBoard)
    return this.material(MaterialType.MovieCards)
      .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
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

  private unselectTheaterTiles(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.TheaterTiles).selected(true).unselectItems()
  }

  private selectAdvertisingTokens(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.AdvertisingTokens).location(LocationType.AdvertisingTokenSpotOnAdvertisingBoard).selectItems()
  }
}
