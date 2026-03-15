import {
  CompetitiveScore,
  FillGapStrategy,
  hideFront,
  hideFrontToOthers,
  hideItemId,
  hideItemIdToOthers,
  isStartSimultaneousRule,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { GamePhase } from './GamePhase'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { popcornTokens } from './material/PopcornToken'
import { PlayerColor } from './PlayerColor'
import { DiscardAwardCardActionRule } from './rules/actions/DiscardAwardCardActionRule'
import { BuyingPhaseRule } from './rules/BuyingPhaseRule'
import { EndOfRoundPendingActionsNextPhaseTransitionRule } from './rules/EndOfRoundPhase/EndOfRoundPendingActionsNextPhaseTransitionRule'
import { EndOfRoundPhaseNewLineUpRule } from './rules/EndOfRoundPhase/EndOfRoundPhaseNewLineUpRule'
import { EndOfRoundPhaseTheatricalRunRule } from './rules/EndOfRoundPhase/EndOfRoundPhaseTheatricalRunRule'
import { FinalEndOfRoundPhaseAdvertisingTokenMovesRule } from './rules/FinalEndOfRoundPhase/FinalEndOfRoundPhaseAdvertisingTokenMovesRule'
import { FinalEndOfRoundPhaseAwardCardsPoints } from './rules/FinalEndOfRoundPhase/FinalEndOfRoundPhaseAwardCardsPoints'
import { FinalEndOfRoundPhaseMoneyRule } from './rules/FinalEndOfRoundPhase/FinalEndOfRoundPhaseMoneyRule'
import { FinalEndOfRoundPhaseTheaterTrophyRule } from './rules/FinalEndOfRoundPhase/FinalEndOfRoundPhaseTheaterTrophyRule'
import { RuleId } from './rules/RuleId'
import { ShowingsPhaseRule } from './rules/ShowingsPhaseRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class PopcornRules
  extends SecretMaterialRules<PlayerColor, MaterialType, LocationType, RuleId>
  implements
    TimeLimit<
      MaterialGame<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
      MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>,
      PlayerColor
    >,
    CompetitiveScore<MaterialGame<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>>
{
  rules = {
    [RuleId.DealAndDiscardAwardCards]: DiscardAwardCardActionRule,
    [RuleId.BuyingPhaseRule]: BuyingPhaseRule,
    [RuleId.ShowingsPhaseRule]: ShowingsPhaseRule,
    [RuleId.EndOfRoundPhaseTheatricalRunRule]: EndOfRoundPhaseTheatricalRunRule,
    [RuleId.EndOfRoundPhaseNewLineUpRule]: EndOfRoundPhaseNewLineUpRule,
    [RuleId.EndOfRoundPendingActionsNextPhaseTransitionRule]: EndOfRoundPendingActionsNextPhaseTransitionRule,
    [RuleId.FinalEndOfRoundPhaseAdvertisingTokenMovesRule]: FinalEndOfRoundPhaseAdvertisingTokenMovesRule,
    [RuleId.FinalEndOfRoundMoneyRule]: FinalEndOfRoundPhaseMoneyRule,
    [RuleId.FinalEndOfRoundPhaseTheaterTrophyRule]: FinalEndOfRoundPhaseTheaterTrophyRule,
    [RuleId.FinalEndOfRoundPhaseAwardCardPointsRule]: FinalEndOfRoundPhaseAwardCardsPoints
  }

  hidingStrategies = {
    [MaterialType.MovieCards]: {
      [LocationType.MovieCardDeckSpot]: hideFront,
      [LocationType.MovieCardDiscardSpot]: hideFront,
      [LocationType.PlayerMovieCardArchiveSpot]: hideFrontToOthers
    },
    [MaterialType.AwardCards]: {
      [LocationType.AwardCardDeckSpot]: hideItemId,
      [LocationType.PlayerAwardCardHand]: hideItemIdToOthers
    },
    [MaterialType.TheaterTiles]: {
      [LocationType.OneSeatTheaterTileDeckSpot]: hideFront,
      [LocationType.TwoSeatTheaterTileDeckSpot]: hideFront,
      [LocationType.ThreeSeatTheaterTileDeckSpot]: hideFront
    },
    [MaterialType.GuestPawns]: {
      [LocationType.PlayerGuestPawnsUnderClothBagSpot]: hideItemId
    }
  }

  locationsStrategies = {
    [MaterialType.MovieCards]: {
      [LocationType.MovieCardDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.MovieCardDiscardSpot]: new PositiveSequenceStrategy(),
      [LocationType.PlayerMovieCardArchiveSpot]: new PositiveSequenceStrategy(),
      [LocationType.FeaturesRowSpot]: new FillGapStrategy(),
      [LocationType.PremiersRowSpot]: new FillGapStrategy()
    },
    [MaterialType.AwardCards]: {
      [LocationType.AwardCardDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.PlayerAwardCardHand]: new PositiveSequenceStrategy()
    },
    [MaterialType.TheaterTiles]: {
      [LocationType.OneSeatTheaterTileDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.OneSeatTheaterTileRowSpot]: new FillGapStrategy(),
      [LocationType.TwoSeatTheaterTileDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.TwoSeatTheaterTileRowSpot]: new FillGapStrategy(),
      [LocationType.ThreeSeatTheaterTileDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.ThreeSeatTheaterTileRowSpot]: new FillGapStrategy()
    },
    [MaterialType.GuestPawns]: {
      [LocationType.GuestPawnReserveSpot]: new PositiveSequenceStrategy(),
      [LocationType.PlayerGuestPawnsUnderClothBagSpot]: new PositiveSequenceStrategy(),
      [LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard]: new PositiveSequenceStrategy(),
      [LocationType.PlayerShowingsDrawnGuestSpot]: new PositiveSequenceStrategy()
    },
    [MaterialType.TheaterTrophies]: {
      [LocationType.TheaterTrophyReserveSpot]: new PositiveSequenceStrategy()
    }
  }

  giveTime(): number {
    return 60
  }

  public get currentPhase(): GamePhase {
    switch (this.game.rule?.id) {
      case RuleId.DealAndDiscardAwardCards:
        return GamePhase.Setup
      case RuleId.BuyingPhaseRule:
        return GamePhase.BuyingPhase
      case RuleId.ShowingsPhaseRule:
        return GamePhase.ShowingsPhase
      default:
        return GamePhase.EndOfRoundPhase
    }
  }

  public getScore(playerId: PlayerColor): number {
    return this.material(MaterialType.PopcornTokens).money(popcornTokens).location(LocationType.PlayerPopcornPileUnderPopcornCupSpot).player(playerId).count
  }

  public getTieBreaker(tieBreaker: number, playerId: PlayerColor): number | undefined {
    if (tieBreaker === 1) {
      return -this.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot).player(playerId).length
    }
    return undefined
  }

  public isUnpredictableMove(move: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>, player: PlayerColor): boolean {
    return (
      (isStartSimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId>(move) && move.id === RuleId.FinalEndOfRoundPhaseAwardCardPointsRule) ||
      super.isUnpredictableMove(move, player)
    )
  }
}
