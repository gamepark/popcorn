import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { AdvertisingTokenSpot } from '../material/AdvertisingTokenSpot'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class BuyingPhaseUseAdvertisingTokenRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.AdvertisingTokens)
      .location(LocationType.AdvertisingTokenSpotOnAdvertisingBoard)
      .id<PlayerColor>(this.player)
      .selected(true)
      .moveItems({
        type: LocationType.PlayerAdvertisingTokenSpot,
        player: this.player
      })
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.AdvertisingTokens)(move) &&
      move.location.type === LocationType.PlayerAdvertisingTokenSpot &&
      move.location.player === this.player
    ) {
      const tokenSourceMaterial = this.material(MaterialType.AdvertisingTokens).index(move.itemIndex)
      const tokenSource = tokenSourceMaterial.getItem<PlayerColor>()?.location.id as AdvertisingTokenSpot
      this.memorize<AdvertisingTokenSpot>(Memorize.GuestPawnColorToDraw, tokenSource)
      return [tokenSourceMaterial.unselectItem(), this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.PickGuestFromReserveOrExitZoneRule, [this.player])]
    }
    return []
  }
}
