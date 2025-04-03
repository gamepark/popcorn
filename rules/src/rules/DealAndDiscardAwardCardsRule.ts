import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { AwardCard } from '../material/AwardCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MovieCard, movieCardCharacteristics, MovieCardId, MovieCardType } from '../material/MovieCard'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class DealAndDiscardAwardCardsRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (this.game.rule?.players !== undefined) {
      const deck = this.material(MaterialType.AwardCards).location(LocationType.AwardCardDeckSpot).deck()
      return this.game.rule.players.flatMap((player) =>
        deck.deal(
          {
            type: LocationType.PlayerAwardCardHand,
            player: player
          },
          2
        )
      )
    }
    return super.onRuleStart(_move, _previousRule, _context)
  }

  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const playerHandMaterial = this.material(MaterialType.AwardCards).location(LocationType.PlayerAwardCardHand).player(player)
    return playerHandMaterial
      .sort((item) => playerHandMaterial.length - (item.location.x ?? 0))
      .limit(2)
      .moveItems({
        type: LocationType.AwardCardDeckSpot,
        x: 0
      })
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.AwardCards)(move) &&
      move.location.type === LocationType.AwardCardDeckSpot &&
      move.location.x === 0
    ) {
      const card = this.material(MaterialType.AwardCards).index(move.itemIndex).getItem<AwardCard>()
      if (card?.location.player === undefined) {
        throw new Error('Unable to find player owning card')
      }
      if (this.game.rule?.players?.length === 1) {
        this.memorize<PlayerColor>(Memorize.PlayerDiscardingAwardCards, card.location.player)
      }
      return [this.endPlayerTurn(card.location.player)]
    }
    return []
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (this.isFirstTurn()) {
      return [this.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, this.game.players[0])]
    }
    return [this.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, this.remind<PlayerColor>(Memorize.PlayerDiscardingAwardCards))]
  }

  public onRuleEnd(_move: RuleMove<PlayerColor, RuleId>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    this.forget(Memorize.PlayerDiscardingAwardCards)
    return super.onRuleEnd(_move, _context)
  }

  private isFirstTurn() {
    return (
      this.material(MaterialType.MovieCards)
        .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
        .id<MovieCardId>(
          (id) =>
            id.front !== undefined && id.front !== MovieCard.FinalShowing && movieCardCharacteristics[id.front].getMovieType() === MovieCardType.FirstMovie
        ).length === this.game.players.length &&
      this.material(MaterialType.LobbySliders).location(
        (location) => location.type === LocationType.LobbySliderSpotOnTopPlayerCinemaBoard && location.x === 0 && location.y === 1
      )
    )
  }
}
