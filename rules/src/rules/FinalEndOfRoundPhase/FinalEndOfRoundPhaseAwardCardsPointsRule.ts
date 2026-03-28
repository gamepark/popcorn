import { CustomMove, MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { countBy } from 'es-toolkit'
import { AdvertisingTokenSpot } from '../../material/AdvertisingTokenSpot'
import { AwardCard, awardCardPointFunctions } from '../../material/AwardCard'
import { AwardCardPopcornCustomMoveData, CustomMoveType, isAwardCardPopcornCustomMove } from '../../material/CustomMoveType'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PopcornMove } from '../../material/PopcornMoves'
import { popcornTokens } from '../../material/PopcornToken'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { getAudienceFromCubeLocation } from '../utils/getAudienceFromCubeLocation.util'

export class FinalEndOfRoundPhaseAwardCardsPointsRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  public getActivePlayerLegalMoves(_player: PlayerColor): PopcornMove[] {
    return []
  }

  public getMovesAfterPlayersDone(): PopcornMove[] {
    return []
  }

  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): PopcornMove[] {
    const awardCardsMaterial = this.material(MaterialType.AwardCards).location(LocationType.PlayerAwardCardHand)
    const movieCardsMaterial = this.material(MaterialType.MovieCards).location(LocationType.PlayerMovieCardArchiveSpot)
    const theaterTilesMaterial = this.material(MaterialType.TheaterTiles).location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
    const guestMaterial = this.material(MaterialType.GuestPawns).location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard)
    const audienceCubesMaterial = this.material(MaterialType.AudienceCubes).location(LocationType.AudienceCubeSpotOnTopPlayerCinemaBoard)
    const advertisingTokensMaterial = this.material(MaterialType.AdvertisingTokens).location(LocationType.AdvertisingTokenSpotOnAdvertisingBoard)
    if (awardCardsMaterial.getItems<AwardCard>().some((card) => card.id === undefined)) {
      return []
    }
    return this.game.players
      .flatMap((player) => {
        const playerMoviesMaterial = movieCardsMaterial.player(player)
        const playerTheaterTilesMaterial = theaterTilesMaterial.player(player)
        const playerAdvertisingTokensMaterial = advertisingTokensMaterial.id(player)
        const guestCountsByColor = countBy(
          guestMaterial
            .player(player)
            .getItems<GuestPawn>()
            .map((guest) => guest.id)
            .concat(
              playerAdvertisingTokensMaterial.getItems().map((token) => this.getGuestColorFromAdvertisingSpot(token.location.id as AdvertisingTokenSpot))
            ),
          (guestColor) => guestColor
        )
        const audience = getAudienceFromCubeLocation(audienceCubesMaterial.player(player).getItem()?.location)
        this.memorize<number>(Memory.AwardCardPopcorn, 0, player)
        return awardCardsMaterial
          .player(player)
          .getItems<AwardCard>()
          .map((card) => {
            const awardCardPoints = awardCardPointFunctions[card.id](playerMoviesMaterial, playerTheaterTilesMaterial, guestCountsByColor, audience)
            this.memorize<number>(Memory.AwardCardPopcorn, (oldValue) => oldValue + awardCardPoints, player)
            return this.customMove(CustomMoveType.AwardCardPopcorn, {
              cardId: card.id,
              player: player,
              popcorn: awardCardPoints
            } as AwardCardPopcornCustomMoveData) as MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>
          })
      })
      .concat(this.endGame())
  }

  public onCustomMove(move: CustomMove, context?: PlayMoveContext): PopcornMove[] {
    if (isAwardCardPopcornCustomMove(move)) {
      return this.material(MaterialType.PopcornTokens).money(popcornTokens).addMoney(move.data.popcorn, {
        type: LocationType.PlayerPopcornPileUnderPopcornCupSpot,
        player: move.data.player
      })
    }
    return super.onCustomMove(move, context)
  }

  private getGuestColorFromAdvertisingSpot(id: AdvertisingTokenSpot): GuestPawn {
    switch (id) {
      case AdvertisingTokenSpot.BlueGuestPawn:
        return GuestPawn.Blue
      case AdvertisingTokenSpot.GreenGuestPawn:
        return GuestPawn.Green
      case AdvertisingTokenSpot.RedGuestPawn:
        return GuestPawn.Red
      case AdvertisingTokenSpot.YellowGuestPawn:
        return GuestPawn.Yellow
      default:
        throw Error(`Invalid spot given: ${AdvertisingTokenSpot[id]}`)
    }
  }
}
