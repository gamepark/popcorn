import { isMoveItemType, ItemMove, Material, MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { AdvertisingTokenSpot } from '../../material/AdvertisingTokenSpot'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export class FinalEndOfRoundPhaseAdvertisingTokenMovesRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const guestPawnMaterial = this.material(MaterialType.GuestPawns)
    return this.game.players.flatMap((player) =>
      guestPawnMaterial.player(player).moveItemsAtOnce({
        type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
        player: player
      })
    )
  }

  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const playerAdvertisingTokens = this.material(MaterialType.AdvertisingTokens).id(player).location(LocationType.AdvertisingTokenSpotOnAdvertisingBoard)
    const anyGuestTokens = playerAdvertisingTokens.locationId<AdvertisingTokenSpot>(AdvertisingTokenSpot.AnyGuestPawn)
    const whiteGuestPawnTokens = playerAdvertisingTokens.locationId<AdvertisingTokenSpot>(AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag)
    const whiteGuestPawns = this.material(MaterialType.GuestPawns)
      .id<GuestPawn>(GuestPawn.White)
      .location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard)
      .player(player)
    return this.buildAnyGuestTokenMoves(anyGuestTokens)
      .concat(this.buildReturnTokenToPlayerReserveMove(playerAdvertisingTokens, player))
      .concat(this.buildWhiteGuestToReserveMovesIfAvailable(whiteGuestPawnTokens, whiteGuestPawns))
      .concat(this.endPlayerTurn(player))
  }

  private buildWhiteGuestToReserveMovesIfAvailable(
    whiteGuestPawnTokens: Material<PlayerColor, MaterialType, LocationType>,
    whiteGuestPawns: Material<PlayerColor, MaterialType, LocationType>
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return whiteGuestPawnTokens.length > 0 && whiteGuestPawns.length > 0
      ? whiteGuestPawns.moveItems({
          type: LocationType.GuestPawnReserveSpot,
          id: GuestPawn.White
        })
      : []
  }

  private buildReturnTokenToPlayerReserveMove(
    playerAdvertisingTokens: Material<PlayerColor, MaterialType, LocationType>,
    player: PlayerColor
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return playerAdvertisingTokens.moveItems({
      type: LocationType.PlayerAdvertisingTokenSpot,
      player: player
    })
  }

  private buildAnyGuestTokenMoves(
    anyGuestTokens: Material<PlayerColor, MaterialType, LocationType>
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return [
      AdvertisingTokenSpot.BlueGuestPawn,
      AdvertisingTokenSpot.GreenGuestPawn,
      AdvertisingTokenSpot.RedGuestPawn,
      AdvertisingTokenSpot.YellowGuestPawn
    ].flatMap((spotId) =>
      anyGuestTokens.moveItems({
        type: LocationType.AdvertisingTokenSpotOnAdvertisingBoard,
        id: spotId
      })
    )
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return this.game.players
      .flatMap(
        (player) =>
          this.material(MaterialType.GuestPawns)
            .id(player)
            .location(LocationType.AdvertisingTokenSpotOnAdvertisingBoard)
            .locationId<AdvertisingTokenSpot>((lId) => lId === AdvertisingTokenSpot.AnyGuestPawn || lId === AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag)
            .moveItemsAtOnce({
              type: LocationType.PlayerAdvertisingTokenSpot,
              player: player
            }) as MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>
      )
      .concat(this.startPlayerTurn<PlayerColor, RuleId>(RuleId.FinalEndOfRoundMoneyRule, this.game.players[0]))
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.GuestPawns)(move)) {
      const movedGuestPawn = this.material(MaterialType.GuestPawns).index(move.itemIndex).getItem<GuestPawn>()!
      const player = movedGuestPawn.location.player!
      const whiteGuestPawnTokens = this.material(MaterialType.AdvertisingTokens)
        .id<PlayerColor>(player)
        .locationId<AdvertisingTokenSpot>(AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag)
      if (whiteGuestPawnTokens.length === 0) {
        throw new Error('Unable to move the guest pawn as no available advertising token')
      }
      return [
        whiteGuestPawnTokens.moveItem({
          type: LocationType.PlayerAdvertisingTokenSpot,
          player: player
        })
      ]
    }
    return super.afterItemMove(move, _context)
  }
}
