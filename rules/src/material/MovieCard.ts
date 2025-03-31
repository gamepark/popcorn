import { getEnumValues } from '@gamepark/rules-api'
import { AbracadabCharacteristics } from './MovieCards/AbracadabCharacteristics'
import { AdrianCharacteristics } from './MovieCards/AdrianCharacteristics'
import { AMonsterInTheShipCharacteristics } from './MovieCards/AMonsterInTheShipCharacteristics'
import { BadmanCharacteristics } from './MovieCards/BadmanCharacteristics'
import { BigSpendersCharacteristics } from './MovieCards/BigSpendersCharacteristics'
import { ControlZCharacteristics } from './MovieCards/ControlZCharacteristics'
import { Eliminator4Characteristics } from './MovieCards/Eliminator4Characteristics'
import { EndOfTheWorldCharacteristics } from './MovieCards/EndOfTheWorldCharacteristics'
import { FiveSixSevenEightCharacteristics } from './MovieCards/FiveSixSevenEightCharacteristics'
import { FrankAndEinsteinCharacteristics } from './MovieCards/FrankAndEinsteinCharacteristics'
import { HenriettaCharacteristics } from './MovieCards/HenriettaCharacteristics'
import { IntergalacticCharacteristics } from './MovieCards/IntergalacticCharacteristics'
import { ItSMyWarCharacteristics } from './MovieCards/ItSMyWarCharacteristics'
import { JoeJoeCharacteristics } from './MovieCards/JoeJoeCharacteristics'
import { KingOfTokyoCharacteristics } from './MovieCards/KingOfTokyoCharacteristics'
import { MeCharacteristics } from './MovieCards/MeCharacteristics'
import { ModernLoveCharacteristics } from './MovieCards/ModernLoveCharacteristics'
import { MountainHotelCharacteristics } from './MovieCards/MountainHotelCharacteristics'
import { MovieCardCharacteristics } from './MovieCards/MovieCardCharacteristics'
import { ObjectionCharacteristics } from './MovieCards/ObjectionCharacteristics'
import { RevengeOfTheDiplodocusCharacteristics } from './MovieCards/RevengeOfTheDiplodocusCharacteristics'
import { RohanAndJayaCharacteristics } from './MovieCards/RohanAndJayaCharacteristics'
import { RosebudCharacteristics } from './MovieCards/RosebudCharacteristics'
import { TheBarbarianCharacteristics } from './MovieCards/TheBarbarianCharacteristics'
import { TheGodmotherCharacteristics } from './MovieCards/TheGodmotherCharacteristics'
import { TheNeuroticDetectiveCharacteristics } from './MovieCards/TheNeuroticDetectiveCharacteristics'
import { WitchesVsCheerleadersCharacteristics } from './MovieCards/WitchesVsCheerleadersCharacteristics'

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
  // Green movies
  GreenFrankAndEinstein,
  GreenTheBarbarian,
  GreenRevengeOfTheDiplodocus,
  GreenMountainHotel,
  GreenBadman,
  GreenKingOfTokyo,
  GreenAMonsterInTheShip,
  GreenWitchesVsCheerleaders,
  GreenAbracadab,
  GreenEliminator4,
  GreenIntergalactic,
  FinalShowing = 255,
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
  // First movies
  [MovieCard.FirstMovieBlueRosebud]: new RosebudCharacteristics(),
  [MovieCard.FirstMovieGreenEndOfTheWorld]: new EndOfTheWorldCharacteristics(),
  [MovieCard.FirstMovieRedItSMyWar]: new ItSMyWarCharacteristics(),
  [MovieCard.FirstMovieYellowModernLove]: new ModernLoveCharacteristics(),
  // Blue movies
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
  [MovieCard.BlueTheGodmother]: new TheGodmotherCharacteristics(),
  // Green movies
  [MovieCard.GreenFrankAndEinstein]: new FrankAndEinsteinCharacteristics(),
  [MovieCard.GreenTheBarbarian]: new TheBarbarianCharacteristics(),
  [MovieCard.GreenRevengeOfTheDiplodocus]: new RevengeOfTheDiplodocusCharacteristics(),
  [MovieCard.GreenMountainHotel]: new MountainHotelCharacteristics(),
  [MovieCard.GreenBadman]: new BadmanCharacteristics(),
  [MovieCard.GreenKingOfTokyo]: new KingOfTokyoCharacteristics(),
  [MovieCard.GreenAMonsterInTheShip]: new AMonsterInTheShipCharacteristics(),
  [MovieCard.GreenWitchesVsCheerleaders]: new WitchesVsCheerleadersCharacteristics(),
  [MovieCard.GreenAbracadab]: new AbracadabCharacteristics(),
  [MovieCard.GreenEliminator4]: new Eliminator4Characteristics(),
  [MovieCard.GreenIntergalactic]: new IntergalacticCharacteristics()
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
