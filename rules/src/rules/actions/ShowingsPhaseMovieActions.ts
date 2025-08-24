import { CustomMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'

export class ShowingsPhaseMovieActions extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  public getActivePlayerLegalMoves(_player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    // const currentTheaterTileIndex = this.remind<PlayerActionMemory>(Memory.PlayerActions, player)[RuleId.ShowingsPhaseRule].currentTheaterTileIndex
    // const currentTile = this.material(MaterialType.TheaterTiles).index(currentTheaterTileIndex).getItem<Required<TheaterTileId>>()
    // if (currentTile === undefined) {
    //   throw new Error('No tile found')
    // }
    // const currentMovieMaterial = this.material(MaterialType.MovieCards)
    //   .player(player)
    //   .location((location) => location.type === LocationType.MovieCardSpotOnBottomPlayerCinemaBoard && location.x === currentTile.location.x)
    // const currentMovie = currentMovieMaterial.getItems<Required<MovieCardId>>()[0]
    // const currentMovieIndex = currentMovieMaterial.getIndex()
    // return (
    //   this.remind<AvailableMovieActionsMemory>(Memory.AvailableMovieActions)
    //     [currentMovie.id.front]?.filter((isAvailable) => isAvailable)
    //     .map((_, index) =>
    //       this.customMove<CustomMoveType>(CustomMoveType.MovieAction, {
    //         player: player,
    //         movieCardIndex: currentMovieIndex,
    //         movieActionNumber: index
    //       })
    //     )
    //     .concat(this.customMove<CustomMoveType>(CustomMoveType.PassMovieAction)) ?? []
    // )
    return []
  }

  public onCustomMove(move: CustomMove, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    // if (isPassMovieActionCustomMove(move)) {
    //   const pawnMaterial = this.material(MaterialType.GuestPawns).index(move.data.guestPawnIndex)
    //   return [
    //     pawnMaterial.moveItem({
    //       type: LocationType.GuestPawnExitZoneSpotOnTopPlayerCinemaBoard,
    //       player: move.data.player
    //     })
    //   ]
    // }
    // if (isMovieActionCustomMove(move)) {
    //   const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    //   const movieCard = this.material(MaterialType.MovieCards).index(move.data.movieCardIndex).getItems<Required<BuyableMovieCardId>>()[0]
    //   this.memorize<AvailableMovieActionsMemory>(Memory.AvailableMovieActions, (previousValue) => {
    //     const newValue = cloneDeep(previousValue)
    //     const movieActionsAvailabilities = newValue[movieCard.id.front]
    //     if (movieActionsAvailabilities === undefined) {
    //       throw new Error('Error with memory handling')
    //     }
    //     movieActionsAvailabilities[move.data.movieActionNumber] = false
    //     return newValue
    //   })
    //   const movieAction = movieCardCharacteristics[movieCard.id.front].getAction(move.data.movieActionNumber)
    //   const player = move.data.player
    //   switch (movieAction) {
    //     case MovieAction.AdvertisingTokenOnAnyGuest:
    //     case MovieAction.AdvertisingTokenOnBlueGuest:
    //     case MovieAction.AdvertisingTokenOnGreenGuest:
    //     case MovieAction.AdvertisingTokenOnRedGuest:
    //     case MovieAction.AdvertisingTokenOnYellowGuest:
    //     case MovieAction.AdvertisingTokenOnWhiteGuestToBag:
    //       consequences.push(...getAdvertisingTokenMove(this, player, movieAction))
    //       break
    //     case MovieAction.AudienceTrackAdvance:
    //       consequences.push(...getAudienceTrackMove(this, player))
    //       break
    //     case MovieAction.DrawAwardCard:
    //       consequences.push(this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DealAndDiscardAwardCards, [player]))
    //       break
    //     case MovieAction.DrawGuestAndPlaceThem:
    //       // TODO
    //       break
    //     case MovieAction.Get1Popcorn:
    //       consequences.push(...getMoneyMove(this, player, MaterialType.PopcornTokens, 1))
    //       break
    //     case MovieAction.Get2Popcorn:
    //       consequences.push(...getMoneyMove(this, player, MaterialType.PopcornTokens, 2))
    //       break
    //     case MovieAction.Get3Popcorn:
    //       consequences.push(...getMoneyMove(this, player, MaterialType.PopcornTokens, 3))
    //       break
    //     case MovieAction.Get4Popcorn:
    //       consequences.push(...getMoneyMove(this, player, MaterialType.PopcornTokens, 4))
    //       break
    //     case MovieAction.Get1Money:
    //       consequences.push(...getMoneyMove(this, player, MaterialType.MoneyTokens, 1))
    //       break
    //     case MovieAction.Get2Money:
    //       consequences.push(...getMoneyMove(this, player, MaterialType.MoneyTokens, 2))
    //       break
    //     case MovieAction.Get3Money:
    //       consequences.push(...getMoneyMove(this, player, MaterialType.MoneyTokens, 3))
    //       break
    //     case MovieAction.Get4Money:
    //       consequences.push(...getMoneyMove(this, player, MaterialType.MoneyTokens, 4))
    //       break
    //     case MovieAction.PlaceGuestInReserve:
    //       this.memorize<PlayerActionMemory>(
    //         Memory.PlayerActions,
    //         (value) => {
    //           value[RuleId.ShowingsPhaseRule].seatActionSubRule = SeatActionSubRules.PlaceGuestInReserve
    //           return value
    //         },
    //         player
    //       )
    //       break
    //     case MovieAction.PlaceExitZoneGuestInBag:
    //       this.memorize<PlayerActionMemory>(
    //         Memory.PlayerActions,
    //         (value) => {
    //           value[RuleId.ShowingsPhaseRule].seatActionSubRule = SeatActionSubRules.MoveGuestFromExitZoneToBag
    //           return value
    //         },
    //         player
    //       )
    //       break
    //     case MovieAction.None:
    //       break
    //   }
    //   return consequences
    // }
    return super.onCustomMove(move, _context)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }
}
