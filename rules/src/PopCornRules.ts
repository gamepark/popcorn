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
import { TheFirstStepRule } from './rules/TheFirstStepRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class PopCornRules
  extends SecretMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
  rules = {
    [RuleId.TheFirstStep]: TheFirstStepRule
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
      [LocationType.GuestPawnReserveSpot]: new PositiveSequenceStrategy()
    },
    [MaterialType.TheaterTrophies]: {
      [LocationType.TheaterTrophyReserveSpot]: new PositiveSequenceStrategy()
    }
  }

  giveTime(): number {
    return 60
  }
}
