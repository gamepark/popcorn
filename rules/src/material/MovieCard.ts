import { getEnumValues } from '@gamepark/rules-api'
import { AdrianCharacteristics } from './MovieCards/AdrianCharacteristics'
import { BigSpendersCharacteristics } from './MovieCards/BigSpendersCharacteristics'
import { ControlZCharacteristics } from './MovieCards/ControlZCharacteristics'
import { EndOfTheWorldCharacteristics } from './MovieCards/EndOfTheWorldCharacteristics'
import { FiveSixSevenEightCharacteristics } from './MovieCards/FiveSixSevenEightCharacteristics'
import { HenriettaCharacteristics } from './MovieCards/HenriettaCharacteristics'
import { ItSMyWarCharacteristics } from './MovieCards/ItSMyWarCharacteristics'
import { JoeJoeCharacteristics } from './MovieCards/JoeJoeCharacteristics'
import { MeCharacteristics } from './MovieCards/MeCharacteristics'
import { ModernLoveCharacteristics } from './MovieCards/ModernLoveCharacteristics'
import { MovieCardCharacteristics } from './MovieCards/MovieCardCharacteristics'
import { ObjectionCharacteristics } from './MovieCards/ObjectionCharacteristics'
import { RohanAndJayaCharacteristics } from './MovieCards/RohanAndJayaCharacteristics'
import { RosebudCharacteristics } from './MovieCards/RosebudCharacteristics'
import { TheGodmotherCharacteristics } from './MovieCards/TheGodmotherCharacteristics'
import { TheNeuroticDetectiveCharacteristics } from './MovieCards/TheNeuroticDetectiveCharacteristics'

export enum MovieColor {
  Yellow = 0,
  Red,
  Green,
  Blue
}

export enum BonusCondition {
  None = 0,
  OneSeatTheater = 1,
  TwoSeatTheater = 2,
  ThreeSeatTheater = 3
}

export enum MovieAction {
  None = 0,
  AudienceTrackAdvance,
  AdvertisingTokenOnYellowGuest,
  AdvertisingTokenOnRedGuest,
  AdvertisingTokenOnGreenGuest,
  AdvertisingTokenOnBlueGuest,
  AdvertisingTokenOnAnyGuest,
  AdvertisingTokenOnWhiteGuestToBag,
  Get1Money,
  Get2Money,
  Get3Money,
  Get4Money,
  Get1Popcorn,
  Get2Popcorn,
  Get3Popcorn,
  Get4Popcorn,
  PlaceGuestInReserve,
  PlaceExitZoneGuestInBag,
  DrawGuestAndPlaceThem,
  DrawAwardCard
}

enum FilmFieldShifts {
  Price = 2,
  BonusCondition = 5,
  BonusAction = 7,
  FirstAction = 12,
  SecondAction = 17,
  ThirdAction = 22,
  FourthAction = 27
}

/* eslint "@typescript-eslint/prefer-literal-enum-member": "off" */
export enum MovieCard {
  // First movies
  FirstMovieBlueRosebud = 1,
  FirstMovieGreenEndOfTheWorld,
  FirstMovieRedItSMyWar,
  FirstMovieYellowModernLove,
  // Blue movies
  BlueHenrietta,
  BlueMe,
  Blue5678,
  BlueJoeJoe,
  BlueTheNeuroticDetective,
  BlueObjection,
  BlueBigSpenders,
  BlueControlZ,
  BlueRohanAndJaya,
  BlueAdrian,
  BlueTheGodmother,
  FinalShowing = 255,
  // Green movies
  GreenFrankAndEinstein = MovieColor.Green |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (MovieAction.None << FilmFieldShifts.BonusAction) |
    (MovieAction.None << FilmFieldShifts.FirstAction) |
    (MovieAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.SecondAction) |
    (MovieAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (MovieAction.AdvertisingTokenOnGreenGuest << FilmFieldShifts.FourthAction),
  GreenTheBarbarian = MovieColor.Green |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (MovieAction.None << FilmFieldShifts.BonusAction) |
    (MovieAction.None << FilmFieldShifts.FirstAction) |
    (MovieAction.DrawGuestAndPlaceThem << FilmFieldShifts.SecondAction) |
    (MovieAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (MovieAction.PlaceGuestInReserve << FilmFieldShifts.FourthAction),
  GreenRevengeOfTheDiplodocus = MovieColor.Green |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.PlaceExitZoneGuestInBag << FilmFieldShifts.BonusAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.FirstAction) |
    (MovieAction.Get1Popcorn << FilmFieldShifts.SecondAction) |
    (MovieAction.PlaceGuestInReserve << FilmFieldShifts.ThirdAction) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  GreenMountainHotel = MovieColor.Green |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.Get2Money << FilmFieldShifts.BonusAction) |
    (MovieAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.FirstAction) |
    (MovieAction.PlaceExitZoneGuestInBag << FilmFieldShifts.SecondAction) |
    (MovieAction.AdvertisingTokenOnGreenGuest << FilmFieldShifts.ThirdAction) |
    (MovieAction.Get1Popcorn << FilmFieldShifts.FourthAction),
  GreenBadman = MovieColor.Green |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.AdvertisingTokenOnGreenGuest << FilmFieldShifts.BonusAction) |
    (MovieAction.PlaceExitZoneGuestInBag << FilmFieldShifts.FirstAction) |
    (MovieAction.Get3Money << FilmFieldShifts.SecondAction) |
    (MovieAction.PlaceGuestInReserve << FilmFieldShifts.ThirdAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.FourthAction),
  GreenKingOfTokyo = MovieColor.Green |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.Get3Popcorn << FilmFieldShifts.BonusAction) |
    (MovieAction.Get1Popcorn << FilmFieldShifts.FirstAction) |
    (MovieAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.SecondAction) |
    (MovieAction.Get3Money << FilmFieldShifts.ThirdAction) |
    (MovieAction.AdvertisingTokenOnGreenGuest << FilmFieldShifts.FourthAction),
  GreenAMonsterInTheShip = MovieColor.Green |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.BonusAction) |
    (MovieAction.PlaceGuestInReserve << FilmFieldShifts.FirstAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (MovieAction.Get4Money << FilmFieldShifts.ThirdAction) |
    (MovieAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.FourthAction),
  GreenWitchesVsCheerleaders = MovieColor.Green |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.DrawAwardCard << FilmFieldShifts.BonusAction) |
    (MovieAction.AdvertisingTokenOnGreenGuest << FilmFieldShifts.FirstAction) |
    (MovieAction.Get3Money << FilmFieldShifts.SecondAction) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.ThirdAction) |
    (MovieAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.FourthAction),
  GreenAbracadab = MovieColor.Green |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.Get2Money << FilmFieldShifts.BonusAction) |
    (MovieAction.DrawGuestAndPlaceThem << FilmFieldShifts.FirstAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (MovieAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.ThirdAction) |
    (MovieAction.Get3Money << FilmFieldShifts.FourthAction),
  GreenEliminator4 = MovieColor.Green |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.DrawAwardCard << FilmFieldShifts.BonusAction) |
    (MovieAction.DrawGuestAndPlaceThem << FilmFieldShifts.FirstAction) |
    (MovieAction.Get3Money << FilmFieldShifts.SecondAction) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.ThirdAction) |
    (MovieAction.Get3Popcorn << FilmFieldShifts.FourthAction),
  GreenIntergalactic = MovieColor.Green |
    (5 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.Get4Popcorn << FilmFieldShifts.BonusAction) |
    (MovieAction.PlaceExitZoneGuestInBag << FilmFieldShifts.FirstAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (MovieAction.DrawAwardCard << FilmFieldShifts.ThirdAction) |
    (MovieAction.Get4Money << FilmFieldShifts.FourthAction),
  // Red movies
  RedTheManWithTheMoney = MovieColor.Red |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (MovieAction.None << FilmFieldShifts.BonusAction) |
    (MovieAction.None << FilmFieldShifts.FirstAction) |
    (MovieAction.Get1Money << FilmFieldShifts.SecondAction) |
    (MovieAction.AdvertisingTokenOnRedGuest << FilmFieldShifts.ThirdAction) |
    (MovieAction.Get3Popcorn << FilmFieldShifts.FourthAction),
  RedBarbacus = MovieColor.Red |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (MovieAction.None << FilmFieldShifts.BonusAction) |
    (MovieAction.None << FilmFieldShifts.FirstAction) |
    (MovieAction.DrawGuestAndPlaceThem << FilmFieldShifts.SecondAction) |
    (MovieAction.Get1Money << FilmFieldShifts.ThirdAction) |
    (MovieAction.DrawAwardCard << FilmFieldShifts.FourthAction),
  RedTheFuryOfTheSerpent = MovieColor.Red |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.Get1Popcorn << FilmFieldShifts.BonusAction) |
    (MovieAction.PlaceExitZoneGuestInBag << FilmFieldShifts.FirstAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (MovieAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  RedTheCursedPegleg = MovieColor.Red |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.PlaceGuestInReserve << FilmFieldShifts.BonusAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.FirstAction) |
    (MovieAction.PlaceExitZoneGuestInBag << FilmFieldShifts.SecondAction) |
    (MovieAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (MovieAction.AdvertisingTokenOnRedGuest << FilmFieldShifts.FourthAction),
  RedTheWorkdAfter = MovieColor.Red |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.Get1Money << FilmFieldShifts.BonusAction) |
    (MovieAction.Get2Money << FilmFieldShifts.FirstAction) |
    (MovieAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.SecondAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.ThirdAction) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  RedTheVolcano = MovieColor.Red |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.BonusAction) |
    (MovieAction.Get2Money << FilmFieldShifts.FirstAction) |
    (MovieAction.AdvertisingTokenOnRedGuest << FilmFieldShifts.SecondAction) |
    (MovieAction.DrawGuestAndPlaceThem << FilmFieldShifts.ThirdAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.FourthAction),
  RedUnknownDestination = MovieColor.Red |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.DrawAwardCard << FilmFieldShifts.BonusAction) |
    (MovieAction.PlaceGuestInReserve << FilmFieldShifts.FirstAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (MovieAction.AdvertisingTokenOnRedGuest << FilmFieldShifts.ThirdAction) |
    (MovieAction.Get2Money << FilmFieldShifts.FourthAction),
  RedGentlemanDriver = MovieColor.Red |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.BonusAction) |
    (MovieAction.Get1Popcorn << FilmFieldShifts.FirstAction) |
    (MovieAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.SecondAction) |
    (MovieAction.Get3Popcorn << FilmFieldShifts.ThirdAction) |
    (MovieAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.FourthAction),
  RedFinalLasso = MovieColor.Red |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.BonusAction) |
    (MovieAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.FirstAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (MovieAction.Get3Money << FilmFieldShifts.ThirdAction) |
    (MovieAction.DrawAwardCard << FilmFieldShifts.FourthAction),
  RedElitePilot = MovieColor.Red |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.BonusAction) |
    (MovieAction.PlaceGuestInReserve << FilmFieldShifts.FirstAction) |
    (MovieAction.Get3Popcorn << FilmFieldShifts.SecondAction) |
    (MovieAction.DrawGuestAndPlaceThem << FilmFieldShifts.ThirdAction) |
    (MovieAction.AdvertisingTokenOnRedGuest << FilmFieldShifts.FourthAction),
  RedVroom8 = MovieColor.Red |
    (5 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.PlaceExitZoneGuestInBag << FilmFieldShifts.BonusAction) |
    (MovieAction.Get4Money << FilmFieldShifts.FirstAction) |
    (MovieAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.SecondAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.ThirdAction) |
    (MovieAction.Get4Popcorn << FilmFieldShifts.FourthAction),
  // Yellow movies
  YellowMisterGiggles = MovieColor.Yellow |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (MovieAction.None << FilmFieldShifts.BonusAction) |
    (MovieAction.None << FilmFieldShifts.FirstAction) |
    (MovieAction.PlaceGuestInReserve << FilmFieldShifts.SecondAction) |
    (MovieAction.Get1Popcorn << FilmFieldShifts.ThirdAction) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  YellowMelancholyCharlie = MovieColor.Yellow |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (MovieAction.None << FilmFieldShifts.BonusAction) |
    (MovieAction.None << FilmFieldShifts.FirstAction) |
    (MovieAction.Get1Popcorn << FilmFieldShifts.SecondAction) |
    (MovieAction.AdvertisingTokenOnYellowGuest << FilmFieldShifts.ThirdAction) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  YellowKangarooMan = MovieColor.Yellow |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.BonusAction) |
    (MovieAction.Get1Money << FilmFieldShifts.SecondAction) |
    (MovieAction.Get1Popcorn << FilmFieldShifts.SecondAction) |
    (MovieAction.AdvertisingTokenOnYellowGuest << FilmFieldShifts.ThirdAction) |
    (MovieAction.Get2Money << FilmFieldShifts.FourthAction),
  YellowTheKids = MovieColor.Yellow |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.Get1Popcorn << FilmFieldShifts.BonusAction) |
    (MovieAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.FirstAction) |
    (MovieAction.AdvertisingTokenOnYellowGuest << FilmFieldShifts.SecondAction) |
    (MovieAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  YellowWhatABunchOfIdiots3 = MovieColor.Yellow |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.BonusAction) |
    (MovieAction.Get1Money << FilmFieldShifts.FirstAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (MovieAction.PlaceGuestInReserve << FilmFieldShifts.ThirdAction) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  YellowSchoolOfZombies = MovieColor.Yellow |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.PlaceExitZoneGuestInBag << FilmFieldShifts.BonusAction) |
    (MovieAction.AdvertisingTokenOnYellowGuest << FilmFieldShifts.FirstAction) |
    (MovieAction.Get1Money << FilmFieldShifts.SecondAction) |
    (MovieAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (MovieAction.DrawAwardCard << FilmFieldShifts.FourthAction),
  YellowDoReMiFaSo = MovieColor.Yellow |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.Get1Popcorn << FilmFieldShifts.BonusAction) |
    (MovieAction.Get1Popcorn << FilmFieldShifts.FirstAction) |
    (MovieAction.PlaceExitZoneGuestInBag << FilmFieldShifts.SecondAction) |
    (MovieAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.ThirdAction) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  YellowFrenchKiss = MovieColor.Yellow |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.AdvertisingTokenOnYellowGuest << FilmFieldShifts.BonusAction) |
    (MovieAction.Get2Money << FilmFieldShifts.FirstAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (MovieAction.PlaceExitZoneGuestInBag << FilmFieldShifts.ThirdAction) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  Yellow28InTheFamily = MovieColor.Yellow |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.DrawAwardCard << FilmFieldShifts.BonusAction) |
    (MovieAction.DrawGuestAndPlaceThem << FilmFieldShifts.FirstAction) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.ThirdAction) |
    (MovieAction.Get2Money << FilmFieldShifts.FourthAction),
  YellowTheAdventuresOfPewPew = MovieColor.Yellow |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.BonusAction) |
    (MovieAction.Get3Money << FilmFieldShifts.FirstAction) |
    (MovieAction.DrawGuestAndPlaceThem << FilmFieldShifts.SecondAction) |
    (MovieAction.DrawAwardCard << FilmFieldShifts.ThirdAction) |
    (MovieAction.AdvertisingTokenOnYellowGuest << FilmFieldShifts.FourthAction),
  YellowTheFirePrincess = MovieColor.Yellow |
    (5 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (MovieAction.Get2Popcorn << FilmFieldShifts.BonusCondition) |
    (MovieAction.Get3Money << FilmFieldShifts.FirstAction) |
    (MovieAction.AudienceTrackAdvance << FilmFieldShifts.SecondAction) |
    (MovieAction.Get3Popcorn << FilmFieldShifts.ThirdAction) |
    (MovieAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.FourthAction)
}

export enum MovieCardType {
  FirstMovie = 1,
  Movie = 2
}

export const movieCardCharacteristics: Record<MovieCard, MovieCardCharacteristics> = {
  [MovieCard.FirstMovieBlueRosebud]: new RosebudCharacteristics(),
  [MovieCard.FirstMovieGreenEndOfTheWorld]: new EndOfTheWorldCharacteristics(),
  [MovieCard.FirstMovieRedItSMyWar]: new ItSMyWarCharacteristics(),
  [MovieCard.FirstMovieYellowModernLove]: new ModernLoveCharacteristics(),
  [MovieCard.BlueHenrietta]: new HenriettaCharacteristics(),
  [MovieCard.BlueMe]: new MeCharacteristics(),
  [MovieCard.Blue5678]: new FiveSixSevenEightCharacteristics(),
  [MovieCard.BlueJoeJoe]: new JoeJoeCharacteristics(),
  [MovieCard.BlueTheNeuroticDetective]: new TheNeuroticDetectiveCharacteristics(),
  [MovieCard.BlueObjection]: new ObjectionCharacteristics(),
  [MovieCard.BlueBigSpenders]: new BigSpendersCharacteristics(),
  [MovieCard.BlueControlZ]: new ControlZCharacteristics(),
  [MovieCard.BlueRohanAndJaya]: new RohanAndJayaCharacteristics(),
  [MovieCard.BlueAdrian]: new AdrianCharacteristics(),
  [MovieCard.BlueTheGodmother]: new TheGodmotherCharacteristics()
}

export const movieCards = getEnumValues(MovieCard)

export const getMovieCardType = (id: MovieCard): MovieCardType =>
  [MovieCard.FirstMovieBlueRosebud, MovieCard.FirstMovieGreenEndOfTheWorld, MovieCard.FirstMovieRedItSMyWar, MovieCard.FirstMovieYellowModernLove].includes(id)
    ? MovieCardType.FirstMovie
    : MovieCardType.Movie

export const firstMovieCards = movieCards.filter((movieId) => getMovieCardType(movieId) === MovieCardType.FirstMovie)

export const movieCardsWithoutFinalShowing = movieCards.filter(
  (movieId) => getMovieCardType(movieId) === MovieCardType.Movie && movieId !== MovieCard.FinalShowing
)

export type MovieCardId = {
  front?: MovieCard
  back: MovieCardType
}
