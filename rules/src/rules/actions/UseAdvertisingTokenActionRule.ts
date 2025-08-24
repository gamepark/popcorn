import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { UseAdvertisingTokenAction } from '../../material/Actions/UseAdvertisingTokenAction'
import { AdvertisingTokenSpot } from '../../material/AdvertisingTokenSpot'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { ActionRule } from './ActionRule'

export class UseAdvertisingTokenActionRule extends ActionRule<UseAdvertisingTokenAction> {
  public consequencesBeforeRuleForPlayer(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return this.material(MaterialType.AdvertisingTokens)
      .location(LocationType.AdvertisingTokenSpotOnAdvertisingBoard)
      .id<PlayerColor>(player)
      .selected(true)
      .moveItems({
        type: LocationType.PlayerAdvertisingTokenSpot,
        player: player
      })
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.AdvertisingTokens)(move) &&
      move.location.type === LocationType.PlayerAdvertisingTokenSpot
    ) {
      const tokenSourceMaterial = this.material(MaterialType.AdvertisingTokens).index(move.itemIndex)
      const tokenSource = tokenSourceMaterial.getItem<PlayerColor>()?.location.id as AdvertisingTokenSpot
      this.memorize<Actions[]>(Memory.PendingActions, (pendingActions) => {
        pendingActions.unshift({
          type: ActionType.PickReserveOrExitZoneGuest,
          guest: tokenSource === AdvertisingTokenSpot.AnyGuestPawn ? undefined : this.getGuestColorForAdvertisingSpot(tokenSource)
        })
        if (
          this.material(MaterialType.AdvertisingTokens).player(move.location.player).location(LocationType.AdvertisingTokenSpotOnAdvertisingBoard).length === 1
        ) {
          return pendingActions.filter((pendingAction) => pendingAction.type === ActionType.UseAdvertisingToken)
        }
        return pendingActions
      })
      return [tokenSourceMaterial.unselectItem()]
    }
    return []
  }

  private getGuestColorForAdvertisingSpot(spot: Exclude<AdvertisingTokenSpot, AdvertisingTokenSpot.AnyGuestPawn>): GuestPawn {
    switch (spot) {
      case AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag:
        return GuestPawn.White
      case AdvertisingTokenSpot.BlueGuestPawn:
        return GuestPawn.Blue
      case AdvertisingTokenSpot.GreenGuestPawn:
        return GuestPawn.Green
      case AdvertisingTokenSpot.RedGuestPawn:
        return GuestPawn.Red
      case AdvertisingTokenSpot.YellowGuestPawn:
        return GuestPawn.Yellow
    }
  }
}
