import {
  FillGapStrategy,
  hideFront,
  hideFrontToOthers,
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { BuyingPhaseRule } from './rules/BuyingPhaseRule'
import { DealAndDiscardAwardCardsRule } from './rules/DealAndDiscardAwardCardsRule'
import { PickGuestFromReserveOrExitZoneRule } from './rules/PickGuestFromReserveOrExitZoneRule'
import { PlaceExitZoneGuestInBagRule } from './rules/PlaceExitZoneGuestInBagRule'
import { PickPlayerGuestAndPlaceItInReserveRule } from './rules/PickPlayerGuestAndPlaceItInReserveRule'
import { RuleId } from './rules/RuleId'
import { ShowingsPhaseDrawingGuestPawns } from './rules/ShowingsPhaseDrawingGuestPawns'
import { ShowingsPhaseRule } from './rules/ShowingsPhaseRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class PopcornRules
  extends SecretMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
  rules = {
    [RuleId.DealAndDiscardAwardCards]: DealAndDiscardAwardCardsRule,
    [RuleId.BuyingPhaseRule]: BuyingPhaseRule,
    [RuleId.PlaceExitZoneGuestInBagRule]: PlaceExitZoneGuestInBagRule,
    [RuleId.PickPlayerGuestAndPlaceItInReserveRule]: PickPlayerGuestAndPlaceItInReserveRule,
    [RuleId.PickGuestFromReserveOrExitZoneRule]: PickGuestFromReserveOrExitZoneRule,
    [RuleId.ShowingsPhaseDrawingGuestPawnsRule]: ShowingsPhaseDrawingGuestPawns,
    [RuleId.ShowingsPhaseRule]: ShowingsPhaseRule
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
}
