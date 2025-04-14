import { isStartPlayerTurn, isStartRule, isStartSimultaneousRule, MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { AdvertisingTokenSpot } from '../../material/AdvertisingTokenSpot'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { moneyTokens } from '../../material/MoneyToken'
import { MovieAction, MovieCard, movieCardCharacteristics, MovieCardId } from '../../material/MovieCard'
import { popcornTokens } from '../../material/PopcornToken'
import { TheaterTileId } from '../../material/TheaterTile'
import { Memorize, PlayerActionMemory } from '../../Memorize'
import { PlayerColor } from '../../PlayerColor'
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
      return AdvertisingTokenSpot.RedGuestPawn
    case MovieAction.AdvertisingTokenOnAnyGuest:
      return AdvertisingTokenSpot.AnyGuestPawn
    case MovieAction.AdvertisingTokenOnWhiteGuestToBag:
      return AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag
  }
}

const getMoneyTokensMoves = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
  boughtCard: MaterialItem<PlayerColor, LocationType, MovieCardId>,
  player: PlayerColor
): MaterialMove<PlayerColor, MaterialType, LocationType>[] => {
  if (
    boughtCard.id.front === undefined ||
    boughtCard.id.front === MovieCard.FinalShowing ||
    (boughtCard.location.type !== LocationType.FeaturesRowSpot && boughtCard.location.type !== LocationType.PremiersRowSpot)
  ) {
    throw new Error('Trying to move an invalid card')
  }
  const cardPrice = movieCardCharacteristics[boughtCard.id.front].getPrice(boughtCard.location.type)
  return rule.material(MaterialType.MoneyTokens).money(moneyTokens).removeMoney(cardPrice, {
    type: LocationType.PlayerMoneyPileSpot,
    player: player
  })
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

const getMoneyMove = (
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

const getAudienceTrackMove = (
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
      return [rule.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DealAndDiscardAwardCards, [player])]
    case 7:
      return getMoneyMove(rule, player, MaterialType.PopcornTokens, 3)
    default:
      return []
  }
}

const getAdvertisingTokenMove = (
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
  bonusAction: MovieAction
): MaterialMove<PlayerColor, MaterialType, LocationType>[] => {
  switch (bonusAction) {
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
      return getAdvertisingTokenMove(rule, player, bonusAction)
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
      return [rule.startRule(RuleId.PickPlayerGuestAndPlaceItInReserveRule)]
    case MovieAction.PlaceExitZoneGuestInBag:
      return [rule.startRule<RuleId>(RuleId.PlaceExitZoneGuestInBagRule)]
    case MovieAction.DrawGuestAndPlaceThem:
      return [] // TODO
    case MovieAction.DrawAwardCard:
      return [rule.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DealAndDiscardAwardCards, [player])]
  }
}

export const getBuyingFilmCardConsequences = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
  player: PlayerColor,
  boughtCard: MaterialItem<PlayerColor, LocationType, Required<MovieCardId>>,
  destinationSpot: 0 | 1 | 2
): MaterialMove<PlayerColor, MaterialType, LocationType>[] => {
  if (
    boughtCard.id.front === MovieCard.FinalShowing ||
    (boughtCard.location.type !== LocationType.PremiersRowSpot && boughtCard.location.type !== LocationType.FeaturesRowSpot)
  ) {
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
    ...getMoneyTokensMoves(rule, boughtCard, player),
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
  const theaterTile = rule
    .material(MaterialType.TheaterTiles)
    .location(LocationType.TheaterTileSpotOnTopPlayerCinemaBoard)
    .player(player)
    .location((location) => location.x === destinationSpot)
    .getItem<TheaterTileId>()
  if (theaterTile?.id.front === undefined) {
    throw new Error('Cannot have an empty tile')
  }
  const movieCharacteristics = movieCardCharacteristics[boughtCard.id.front]
  const bonusAction = movieCharacteristics.getBonusAction(theaterTile.id.front)
  if (bonusAction !== undefined) {
    consequences.push(...getMovesForMovieAction(rule, player, bonusAction))
  }
  addNextRuleMoveToConsequenceIfNecessary(rule, player, consequences)
  return consequences
}

export const addNextRuleMoveToConsequenceIfNecessary = (
  rule: MaterialRulesPart<PlayerColor, MaterialType, LocationType>,
  player: PlayerColor,
  consequences: MaterialMove<PlayerColor, MaterialType, LocationType>[]
) => {
  if (!consequences.some((move) => isStartPlayerTurn(move) || isStartRule(move) || isStartSimultaneousRule(move))) {
    const isFirstTurn = rule.remind<boolean>(Memorize.IsFirstTurn)
    const actionMemory = rule.remind<PlayerActionMemory>(Memorize.PlayerActions, player)[RuleId.BuyingPhaseRule]
    if (
      (isFirstTurn && actionMemory.filmBought) ||
      (!isFirstTurn &&
        actionMemory.filmBought &&
        actionMemory.theaterTileBought &&
        rule.material(MaterialType.AdvertisingTokens).player(player).location(LocationType.AdvertisingTokenSpotOnAdvertisingBoard).selected(true).length === 0)
    ) {
      if (rule.game.players.indexOf(player) === rule.game.players.length - 1) {
        consequences.push(rule.startSimultaneousRule<PlayerColor, RuleId>(RuleId.ShowingsPhaseRule))
      } else {
        const newtPlayer = rule.game.players[(rule.game.players.indexOf(player) + 1) % rule.game.players.length]
        consequences.push(rule.startPlayerTurn<PlayerColor, RuleId>(RuleId.BuyingPhaseRule, newtPlayer))
      }
    }
  }
}
