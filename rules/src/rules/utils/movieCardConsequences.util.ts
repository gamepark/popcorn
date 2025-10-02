import { MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { ActionType } from '../../material/Actions/ActionType'
import { AdvertisingTokenSpot } from '../../material/AdvertisingTokenSpot'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { moneyTokens } from '../../material/MoneyToken'
import { PlayableMovieCardId, MovieAction, MovieCard, movieCardCharacteristics, MovieCardId } from '../../material/MovieCard'
import { popcornTokens } from '../../material/PopcornToken'
import { TheaterTileId } from '../../material/TheaterTile'
import { AvailableMovieActionsMemory, Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { addPendingActionForPlayer } from '../actions/utils/addPendingActionForPlayer.util'
import { RuleId } from '../RuleId'

const getAdvertisingTokenSpotFromMovieAction = (
  bonusAction:
    | MovieAction.AdvertisingTokenOnYellowGuest
    | MovieAction.AdvertisingTokenOnRedGuest
    | MovieAction.AdvertisingTokenOnGreenGuest
    | MovieAction.AdvertisingTokenOnBlueGuest
    | MovieAction.AdvertisingTokenOnAnyGuest
    | MovieAction.AdvertisingTokenOnWhiteGuestToBag
): AdvertisingTokenSpot => {
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

const getSliderMove = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
  player: PlayerColor,
  destinationSpot: 0 | 1 | 2
): MaterialMove<PlayerColor, MaterialType, LocationType> | undefined => {
  const destinationLobbySliderMaterial = rule
    .material(MaterialType.LobbySliders)
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

export const getMoneyMove = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
  player: PlayerColor,
  moneyType: MaterialType.MoneyTokens | MaterialType.PopcornTokens,
  quantity: number
): MaterialMove<PlayerColor, MaterialType, LocationType>[] => {
  const moneyValues: number[] = moneyType === MaterialType.MoneyTokens ? moneyTokens : popcornTokens
  const destinationLocationType = moneyType === MaterialType.MoneyTokens ? LocationType.PlayerMoneyPileSpot : LocationType.PlayerPopcornPileUnderPopcornCupSpot
  return rule.material(moneyType).money(moneyValues).addMoney(quantity, {
    type: destinationLocationType,
    player: player
  })
}

export const getAudienceTrackMove = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
  player: PlayerColor
): MaterialMove<PlayerColor, MaterialType, LocationType>[] => {
  const audienceCube = rule.material(MaterialType.AudienceCubes).player(player).getItem()
  if (audienceCube !== undefined) {
    const newCubeSpot = Math.min((audienceCube.location.x ?? 0) + 1, 8)
    if (newCubeSpot === 8) {
      getMoneyMove(rule, player, MaterialType.PopcornTokens, 1)
    }
    const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = [
      rule
        .material(MaterialType.AudienceCubes)
        .player(player)
        .moveItem((item) => ({
          type: LocationType.AudienceCubeSpotOnTopPlayerCinemaBoard,
          player: player,
          x: (item.location.x ?? 0) + 1
        }))
    ]
    consequences.push(...getAudienceBonusMove(rule, player, newCubeSpot))
    return consequences
  }
  return []
}

const getAudienceBonusMove = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
  player: PlayerColor,
  newCubeSpot: number
): MaterialMove<PlayerColor, MaterialType, LocationType>[] => {
  switch (newCubeSpot) {
    case 2:
      return getMoneyMove(rule, player, MaterialType.MoneyTokens, 2)
    case 4:
      return getMoneyMove(rule, player, MaterialType.MoneyTokens, 3)
    case 6:
      addPendingActionForPlayer(rule, { type: ActionType.DiscardAwardCard }, player)
      return []
    case 7:
      return getMoneyMove(rule, player, MaterialType.PopcornTokens, 3)
    default:
      return []
  }
}

export const getAdvertisingTokenMove = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
  player: PlayerColor,
  bonusAction:
    | MovieAction.AdvertisingTokenOnYellowGuest
    | MovieAction.AdvertisingTokenOnRedGuest
    | MovieAction.AdvertisingTokenOnGreenGuest
    | MovieAction.AdvertisingTokenOnBlueGuest
    | MovieAction.AdvertisingTokenOnAnyGuest
    | MovieAction.AdvertisingTokenOnWhiteGuestToBag
): MaterialMove<PlayerColor, MaterialType, LocationType>[] => {
  const destinationLocationId = getAdvertisingTokenSpotFromMovieAction(bonusAction)
  const advertisingTokenMaterial = rule.material(MaterialType.AdvertisingTokens).location(LocationType.PlayerAdvertisingTokenSpot).player(player)
  if (advertisingTokenMaterial.length > 0) {
    return [
      advertisingTokenMaterial.moveItem({
        type: LocationType.AdvertisingTokenSpotOnAdvertisingBoard,
        id: destinationLocationId
      }),
      advertisingTokenMaterial.unselectItem()
    ]
  }
  return []
}

const getMovesForMovieAction = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
  player: PlayerColor,
  action: MovieAction
): MaterialMove<PlayerColor, MaterialType, LocationType>[] => {
  switch (action) {
    case MovieAction.None:
      return []
    case MovieAction.AudienceTrackAdvance:
      return getAudienceTrackMove(rule, player)
    case MovieAction.AdvertisingTokenOnAnyGuest:
    case MovieAction.AdvertisingTokenOnBlueGuest:
    case MovieAction.AdvertisingTokenOnGreenGuest:
    case MovieAction.AdvertisingTokenOnRedGuest:
    case MovieAction.AdvertisingTokenOnYellowGuest:
    case MovieAction.AdvertisingTokenOnWhiteGuestToBag:
      return getAdvertisingTokenMove(rule, player, action)
    case MovieAction.Get1Money:
      return getMoneyMove(rule, player, MaterialType.MoneyTokens, 1)
    case MovieAction.Get2Money:
      return getMoneyMove(rule, player, MaterialType.MoneyTokens, 2)
    case MovieAction.Get3Money:
      return getMoneyMove(rule, player, MaterialType.MoneyTokens, 3)
    case MovieAction.Get4Money:
      return getMoneyMove(rule, player, MaterialType.MoneyTokens, 4)
    case MovieAction.Get1Popcorn:
      return getMoneyMove(rule, player, MaterialType.PopcornTokens, 1)
    case MovieAction.Get2Popcorn:
      return getMoneyMove(rule, player, MaterialType.PopcornTokens, 2)
    case MovieAction.Get3Popcorn:
      return getMoneyMove(rule, player, MaterialType.PopcornTokens, 3)
    case MovieAction.Get4Popcorn:
      return getMoneyMove(rule, player, MaterialType.PopcornTokens, 4)
    case MovieAction.PlaceGuestInReserve:
      addPendingActionForPlayer(rule, { type: ActionType.PlaceCinemaGuestInReserve }, player)
      return []
    case MovieAction.PlaceExitZoneGuestInBag:
      addPendingActionForPlayer(rule, { type: ActionType.PlaceExitZoneGuestInBag }, player)
      return []
    case MovieAction.DrawGuestAndPlaceThem:
      addPendingActionForPlayer(rule, { type: ActionType.PlaceGuests }, player)
      return [
        rule.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(player).deck().dealOne({
          type: LocationType.PlayerShowingsDrawnGuestSpot,
          player: player
        })
      ]
    case MovieAction.DrawAwardCard:
      addPendingActionForPlayer(rule, { type: ActionType.DiscardAwardCard }, player)
      return [
        rule.material(MaterialType.AwardCards).location(LocationType.AwardCardDeckSpot).deck().dealAtOnce(
          {
            type: LocationType.PlayerAwardCardHand,
            player: player
          },
          2
        )
      ]
  }
}

const getBonusActionForMovie = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
  player: PlayerColor,
  destinationSpot: 0 | 1 | 2,
  boughtCard: MaterialItem<PlayerColor, LocationType, Required<MovieCardId>>
): MovieAction | undefined => {
  const theaterTile = rule
    .material(MaterialType.TheaterTiles)
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

export const getBuyingFilmCardConsequences = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
  player: PlayerColor,
  boughtCard: MaterialItem<PlayerColor, LocationType, Required<PlayableMovieCardId>>,
  destinationSpot: 0 | 1 | 2
): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] => {
  if (boughtCard.location.type !== LocationType.PremiersRowSpot && boughtCard.location.type !== LocationType.FeaturesRowSpot) {
    throw new Error('Trying to move an invalid card')
  }
  const boughtCardMaterial = rule.material(MaterialType.MovieCards).id(boughtCard.id)
  const consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
  const sliderMove = getSliderMove(rule, player, destinationSpot)
  if (sliderMove !== undefined) {
    consequences.push(sliderMove)
  }
  const previousMovieCardMaterial = rule
    .material(MaterialType.MovieCards)
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
  rule.memorize<AvailableMovieActionsMemory>(Memory.AvailableMovieActions, (actionMemory) => {
    actionMemory[boughtCard.id.front] = movieCardCharacteristics[boughtCard.id.front].actions.map((action) => action !== MovieAction.None)
    return actionMemory
  })
  const bonusAction = getBonusActionForMovie(rule, player, destinationSpot, boughtCard)
  if (bonusAction !== undefined) {
    consequences.push(...getMovesForMovieAction(rule, player, bonusAction))
  }
  return consequences
}

// export const addNextRuleMoveToConsequenceIfNecessary = (
//   rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
//   player: PlayerColor,
//   consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[]
// ) => {
//   if (!consequences.some((move) => isStartPlayerTurn(move) || isStartRule(move) || isStartSimultaneousRule(move))) {
//     const isFirstTurn = rule.material(MaterialType.MovieCards).location(LocationType.MovieCardDeckSpot).length === 39
//     const actionMemory = rule.remind<PlayerActionMemory>(Memory.PlayerActions, player)[RuleId.BuyingPhaseRule]
//     if (
//       (isFirstTurn && actionMemory.filmBought) ||
//       (!isFirstTurn &&
//         actionMemory.filmBought &&
//         actionMemory.theaterTileBought &&
//         rule.material(MaterialType.AdvertisingTokens).player(player).location(LocationType.AdvertisingTokenSpotOnAdvertisingBoard).selected(true).length === 0)
//     ) {
//       if (rule.game.players.indexOf(player) === rule.game.players.length - 1) {
//         consequences.push(rule.startSimultaneousRule<PlayerColor, RuleId>(RuleId.ShowingsPhaseDrawingGuestPawnsRule))
//       } else {
//         const nextPlayer = rule.game.players[(rule.game.players.indexOf(player) + 1) % rule.game.players.length]
//         consequences.push(rule.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, nextPlayer))
//       }
//     }
//   }
// }
