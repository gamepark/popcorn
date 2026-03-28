import { MaterialItem } from '@gamepark/rules-api'
import { clamp } from 'es-toolkit'
import { Actions } from '../../material/Actions/Actions'
import { ActionType } from '../../material/Actions/ActionType'
import { BuyMovieCardAction } from '../../material/Actions/BuyMovieCardAction'
import { BuyTheaterTileAction } from '../../material/Actions/BuyTheaterTileAction'
import { ChooseMovieActionAction } from '../../material/Actions/ChooseMovieActionAction'
import { ChooseSeatActionAction } from '../../material/Actions/ChooseSeatActionAction'
import { DiscardAwardCardAction } from '../../material/Actions/DiscardAwardCardAction'
import { PickReserveOrExitZoneGuestAction } from '../../material/Actions/PickReserveOrExitZoneGuestAction'
import { PlaceCinemaGuestInReserveAction } from '../../material/Actions/PlaceCinemaGuestInReserveAction'
import { PlaceExitZoneGuestInBagAction } from '../../material/Actions/PlaceExitZoneGuestInBagAction'
import { PlaceGuestAction } from '../../material/Actions/PlaceGuestAction'
import { AdvertisingTokenSpot } from '../../material/AdvertisingTokenSpot'
import { GuestPawn } from '../../material/GuestPawn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { moneyTokens } from '../../material/MoneyToken'
import { MovieAction, MovieCard, movieCardCharacteristics, MovieCardId, PlayableMovieCardId } from '../../material/MovieCard'
import { PopcornMove } from '../../material/PopcornMoves'
import { popcornTokens } from '../../material/PopcornToken'
import { getMaximumNumberOfGuests, TheaterTileId, theaterTilesCharacteristics } from '../../material/TheaterTile'
import { AvailableMovieActionsMemory, Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { ActionRule } from './ActionRule'

export abstract class AudienceMoveOrMovieOrSeatActionRule<
  A extends BuyTheaterTileAction | ChooseSeatActionAction | ChooseMovieActionAction | BuyMovieCardAction | PickReserveOrExitZoneGuestAction
> extends ActionRule<A> {
  private static MAX_AUDIENCE_TRACK_LOCATION_X = 9
  protected getBuyingFilmCardConsequences(
    player: PlayerColor,
    boughtCard: MaterialItem<PlayerColor, LocationType, Required<PlayableMovieCardId>>,
    destinationSpot: 0 | 1 | 2
  ): PopcornMove[] {
    if (boughtCard.location.type !== LocationType.PremiersRowSpot && boughtCard.location.type !== LocationType.FeaturesRowSpot) {
      throw new Error('Trying to move an invalid card')
    }
    const boughtCardMaterial = this.material(MaterialType.MovieCards).id(boughtCard.id)
    const consequences: PopcornMove[] = []
    const sliderMove = this.getSliderMove(player, destinationSpot)
    if (sliderMove !== undefined) {
      consequences.push(sliderMove)
    }
    const previousMovieCardMaterial = this.material(MaterialType.MovieCards)
      .location(LocationType.MovieCardSpotOnBottomPlayerCinemaBoard)
      .player(player)
      .location((location) => location.x === destinationSpot)
    if (previousMovieCardMaterial.length === 1) {
      consequences.push(
        previousMovieCardMaterial.moveItem({
          type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
          player: player,
          x: destinationSpot,
          y: 1
        }),
        previousMovieCardMaterial.moveItem({
          type: LocationType.PlayerMovieCardArchiveSpot,
          player: player
        })
      )
    }
    consequences.push(
      boughtCardMaterial.moveItem({
        type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
        player: player,
        x: destinationSpot,
        y: 1
      }),
      boughtCardMaterial.moveItem({
        type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
        player: player,
        x: destinationSpot,
        y: 0
      })
    )
    this.memorize<AvailableMovieActionsMemory>(Memory.AvailableMovieActions, (actionMemory) => {
      actionMemory[boughtCard.id.front] = movieCardCharacteristics[boughtCard.id.front].actions.map((action) => action !== MovieAction.None)
      return actionMemory
    })
    const bonusAction = this.getBonusActionForMovie(player, destinationSpot, boughtCard)
    if (bonusAction !== undefined) {
      consequences.push(...this.processMovieActionAndBuildConsequences(bonusAction, player))
    }
    return consequences
  }

  protected processMovieActionAndBuildConsequences(
    movieAction: MovieAction | undefined,
    player: PlayerColor,
    guestPawnIndex?: number,
    seatSpot?: number
  ): PopcornMove[] {
    switch (movieAction) {
      case MovieAction.AdvertisingTokenOnAnyGuest:
      case MovieAction.AdvertisingTokenOnBlueGuest:
      case MovieAction.AdvertisingTokenOnGreenGuest:
      case MovieAction.AdvertisingTokenOnRedGuest:
      case MovieAction.AdvertisingTokenOnYellowGuest:
      case MovieAction.AdvertisingTokenOnWhiteGuestToBag:
        return this.getAdvertisingTokenMove(player, movieAction)
      case MovieAction.AudienceTrackAdvance:
        return this.getAudienceTrackMove(player)
      case MovieAction.DrawAwardCard: {
        this.addDrawAwardCardAction(player, guestPawnIndex)
        return [
          this.material(MaterialType.AwardCards).location(LocationType.AwardCardDeckSpot).deck().dealAtOnce(
            {
              type: LocationType.PlayerAwardCardHand,
              player: player
            },
            2
          )
        ]
      }
      case MovieAction.DrawGuestAndPlaceThem: {
        return this.getDrawGuestMovesAndAddPendingActionIfNecessary(player, seatSpot!, guestPawnIndex)
      }
      case MovieAction.Get1Popcorn:
        return this.getMoneyMove(player, MaterialType.PopcornTokens, 1)
      case MovieAction.Get2Popcorn:
        return this.getMoneyMove(player, MaterialType.PopcornTokens, 2)
      case MovieAction.Get3Popcorn:
        return this.getMoneyMove(player, MaterialType.PopcornTokens, 3)
      case MovieAction.Get4Popcorn:
        return this.getMoneyMove(player, MaterialType.PopcornTokens, 4)
      case MovieAction.Get1Money:
        return this.getMoneyMove(player, MaterialType.MoneyTokens, 1)
      case MovieAction.Get2Money:
        return this.getMoneyMove(player, MaterialType.MoneyTokens, 2)
      case MovieAction.Get3Money:
        return this.getMoneyMove(player, MaterialType.MoneyTokens, 3)
      case MovieAction.Get4Money:
        return this.getMoneyMove(player, MaterialType.MoneyTokens, 4)
      case MovieAction.PlaceGuestInReserve: {
        this.addPlaceGuestInReserveAction(player, guestPawnIndex)
        return []
      }
      case MovieAction.PlaceExitZoneGuestInBag: {
        this.addPlaceExitGuestInBagAction(player, guestPawnIndex)
        return []
      }
      default:
        return []
    }
  }

  private addPlaceExitGuestInBagAction = (player: PlayerColor, guestPawnIndex?: number): void => {
    const action = this.buildActionWithGuestToMoveIfNecessary(ActionType.PlaceExitZoneGuestInBag, player, guestPawnIndex)
    this.addPendingActionForPlayer(player, action)
  }
  private addPlaceGuestInReserveAction = (player: PlayerColor, guestPawnIndex?: number): void => {
    const action = this.buildActionWithGuestToMoveIfNecessary(ActionType.PlaceCinemaGuestInReserve, player, guestPawnIndex)
    this.addPendingActionForPlayer(player, action)
  }
  private addDrawAwardCardAction = (player: PlayerColor, guestPawnIndex?: number): void => {
    const action = this.buildActionWithGuestToMoveIfNecessary(ActionType.DiscardAwardCard, player, guestPawnIndex)
    this.addPendingActionForPlayer(player, action)
  }

  private buildActionWithGuestToMoveIfNecessary(
    type: ActionType.DiscardAwardCard | ActionType.PlaceCinemaGuestInReserve | ActionType.PlaceExitZoneGuestInBag,
    player: PlayerColor,
    guestPawnIndex?: number
  ): Actions {
    const action: DiscardAwardCardAction | PlaceCinemaGuestInReserveAction | PlaceExitZoneGuestInBagAction = { type: type }
    if (guestPawnIndex !== undefined && !this.existRemainingChooseMovieActionForGuest(player, guestPawnIndex)) {
      action.guestIndexToMoveToExitZone = guestPawnIndex
    }
    return action
  }

  private existRemainingChooseMovieActionForGuest(player: PlayerColor, guestIndex?: number): boolean {
    return guestIndex !== undefined && this.existsPendingActionForPlayer(player, (a) => a.type === ActionType.ChooseMovieAction && a.guestIndex === guestIndex)
  }

  private getBonusActionForMovie(
    player: PlayerColor,
    destinationSpot: 0 | 1 | 2,
    boughtCard: MaterialItem<PlayerColor, LocationType, Required<MovieCardId>>
  ): MovieAction | undefined {
    const theaterTile = this.material(MaterialType.TheaterTiles)
      .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
      .player(player)
      .location((location) => location.x === destinationSpot)
      .getItem<TheaterTileId>()
    if (theaterTile?.id.front === undefined) {
      throw new Error('Cannot have an empty tile')
    }
    const movieCharacteristics = movieCardCharacteristics[boughtCard.id.front as Exclude<MovieCard, MovieCard.FinalShowing>]
    return movieCharacteristics.getBonusAction(theaterTile.id.front)
  }

  private getSliderMove(player: PlayerColor, destinationSpot: 0 | 1 | 2): PopcornMove | undefined {
    const destinationLobbySliderMaterial = this.material(MaterialType.LobbySliders)
      .player(player)
      .location((location) => location.x === destinationSpot && location.y !== 0)
    if (destinationLobbySliderMaterial.length === 1) {
      return destinationLobbySliderMaterial.moveItem({
        type: LocationType.LobbySliderSpotOnTopPlayerCinemaBoard,
        player: player,
        x: destinationSpot,
        y: 0
      })
    }
    return undefined
  }

  private getAdvertisingTokenMove(
    player: PlayerColor,
    bonusAction:
      | MovieAction.AdvertisingTokenOnYellowGuest
      | MovieAction.AdvertisingTokenOnRedGuest
      | MovieAction.AdvertisingTokenOnGreenGuest
      | MovieAction.AdvertisingTokenOnBlueGuest
      | MovieAction.AdvertisingTokenOnAnyGuest
      | MovieAction.AdvertisingTokenOnWhiteGuestToBag
  ): PopcornMove[] {
    const destinationLocationId = this.getAdvertisingTokenSpotFromMovieAction(bonusAction)
    const advertisingTokenMaterial = this.material(MaterialType.AdvertisingTokens).location(LocationType.PlayerAdvertisingTokenSpot).player(player)
    if (advertisingTokenMaterial.exists) {
      return [
        advertisingTokenMaterial.moveItem(
          {
            type: LocationType.AdvertisingTokenSpotOnAdvertisingBoard,
            id: destinationLocationId
          },
          1
        ),
        advertisingTokenMaterial.unselectItem()
      ]
    }
    return []
  }

  protected getMoneyMove(player: PlayerColor, moneyType: MaterialType.MoneyTokens | MaterialType.PopcornTokens, quantity: number): PopcornMove[] {
    const moneyValues: number[] = moneyType === MaterialType.MoneyTokens ? moneyTokens : popcornTokens
    const destinationLocationType =
      moneyType === MaterialType.MoneyTokens ? LocationType.PlayerMoneyPileSpot : LocationType.PlayerPopcornPileUnderPopcornCupSpot
    return this.material(moneyType).money(moneyValues).addMoney(quantity, {
      type: destinationLocationType,
      player: player
    })
  }

  private getAdvertisingTokenSpotFromMovieAction(
    bonusAction:
      | MovieAction.AdvertisingTokenOnYellowGuest
      | MovieAction.AdvertisingTokenOnRedGuest
      | MovieAction.AdvertisingTokenOnGreenGuest
      | MovieAction.AdvertisingTokenOnBlueGuest
      | MovieAction.AdvertisingTokenOnAnyGuest
      | MovieAction.AdvertisingTokenOnWhiteGuestToBag
  ): AdvertisingTokenSpot {
    switch (bonusAction) {
      case MovieAction.AdvertisingTokenOnBlueGuest:
        return AdvertisingTokenSpot.BlueGuestPawn
      case MovieAction.AdvertisingTokenOnGreenGuest:
        return AdvertisingTokenSpot.GreenGuestPawn
      case MovieAction.AdvertisingTokenOnRedGuest:
        return AdvertisingTokenSpot.RedGuestPawn
      case MovieAction.AdvertisingTokenOnYellowGuest:
        return AdvertisingTokenSpot.YellowGuestPawn
      case MovieAction.AdvertisingTokenOnAnyGuest:
        return AdvertisingTokenSpot.AnyGuestPawn
      case MovieAction.AdvertisingTokenOnWhiteGuestToBag:
        return AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag
    }
  }

  protected getAudienceTrackMove(player: PlayerColor): PopcornMove[] {
    const audienceCube = this.material(MaterialType.AudienceCubes).player(player).getItem()
    if (audienceCube !== undefined) {
      const newCubeSpot = clamp((audienceCube.location.x ?? 0) + 1, AudienceMoveOrMovieOrSeatActionRule.MAX_AUDIENCE_TRACK_LOCATION_X)
      if (newCubeSpot === AudienceMoveOrMovieOrSeatActionRule.MAX_AUDIENCE_TRACK_LOCATION_X) {
        return this.getMoneyMove(player, MaterialType.PopcornTokens, 1)
      }
      const consequences: PopcornMove[] = [
        this.material(MaterialType.AudienceCubes)
          .player(player)
          .moveItem((item) => ({
            type: LocationType.AudienceCubeSpotOnTopPlayerCinemaBoard,
            player: player,
            x: (item.location.x ?? 0) + 1
          }))
      ]
      return consequences.concat(this.getAudienceBonusMove(player, newCubeSpot))
    }
    return []
  }

  private getAudienceBonusMove(player: PlayerColor, newCubeSpot: number): PopcornMove[] {
    switch (newCubeSpot) {
      case 2:
        return this.getMoneyMove(player, MaterialType.MoneyTokens, 2)
      case 4:
        return this.getMoneyMove(player, MaterialType.MoneyTokens, 3)
      case 6:
        this.addPendingActionForPlayer(player, { type: ActionType.DiscardAwardCard })
        return [
          this.material(MaterialType.AwardCards).location(LocationType.AwardCardDeckSpot).deck().dealAtOnce(
            {
              type: LocationType.PlayerAwardCardHand,
              player: player
            },
            2
          )
        ]
      case 7:
        return this.getMoneyMove(player, MaterialType.PopcornTokens, 3)
      default:
        return []
    }
  }

  protected getDrawGuestMovesAndAddPendingActionIfNecessary(player: PlayerColor, currentGuestSeat: number, guestIndex?: number): PopcornMove[] {
    const canPlaceANewGuest = this.canPlayerPlaceAGuestAfterSeatOrMovieAction(player, currentGuestSeat)
    const consequences: PopcornMove[] = []
    const guestPawnInBagMaterial = this.material(MaterialType.GuestPawns).player(player).location(LocationType.PlayerGuestPawnsUnderClothBagSpot)
    if (guestPawnInBagMaterial.exists) {
      consequences.push(
        guestPawnInBagMaterial.deck().dealOne({
          type: canPlaceANewGuest ? LocationType.PlayerShowingsDrawnGuestSpot : LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
          player: player
        })
      )
    } else {
      const exitZoneGuests = this.material(MaterialType.GuestPawns).player(player).location(LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard)
      if (exitZoneGuests.exists) {
        consequences.push(
          exitZoneGuests.moveItemsAtOnce({
            type: LocationType.PlayerGuestPawnsUnderClothBagSpot,
            player: player
          }),
          exitZoneGuests.shuffle()
        )
      } else {
        // No guests available, move pawn if provided
        if (guestIndex !== undefined) {
          consequences.push(
            this.material(MaterialType.GuestPawns).index(guestIndex).moveItem({
              type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
              player: player
            })
          )
        }
        return consequences
      }
    }
    if (canPlaceANewGuest) {
      const action: PlaceGuestAction = { type: ActionType.PlaceGuests, placeOneGuest: true }
      if (guestIndex !== undefined && guestIndex !== null) {
        action.guestIndexToMoveToExitZone = guestIndex
      }
      this.addPendingActionForPlayer(player, action)
    }
    return consequences
  }

  protected canPlayerPlaceAGuestAfterSeatOrMovieAction(player: PlayerColor, currentGuestSeat?: number): boolean {
    return this.material(MaterialType.TheaterTiles)
      .player(player)
      .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
      .filter<Required<TheaterTileId>>((theaterTile, tileIndex) => {
        const guestOnTileMaterial = this.material(MaterialType.GuestPawns).parent(tileIndex)
        if (theaterTile.selected !== true) {
          // Tile hasn't been activated, guests can be replaced
          return true
        }
        if (guestOnTileMaterial.length === 0) {
          // Tile has already been activated and all guests have been used, cannot use this tile
          return false
        } else {
          if (currentGuestSeat !== undefined) {
            return getMaximumNumberOfGuests(theaterTilesCharacteristics[theaterTile.id.front].getSeatsNumber()) > currentGuestSeat + 1
          }
          const maxLocationXForTile = getMaximumNumberOfGuests(theaterTilesCharacteristics[theaterTile.id.front].getSeatsNumber()) - 1
          const lastGuestOnTile = guestOnTileMaterial
            .parent(tileIndex)
            .maxBy((guestMaterial) => guestMaterial.location.x ?? 0)
            .getItem<GuestPawn>()
          return lastGuestOnTile === undefined || lastGuestOnTile.location.x! < maxLocationXForTile
        }
      }).exists
  }
}
