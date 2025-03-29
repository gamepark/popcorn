import { getEnumValues } from '@gamepark/rules-api'

export enum FilmColor {
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

export enum FilmAction {
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
  FirstMovieBlueRosebud = FilmColor.Blue |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (FilmAction.None << FilmFieldShifts.BonusAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FirstAction) |
    (FilmAction.AdvertisingTokenOnBlueGuest << FilmFieldShifts.SecondAction) |
    (FilmAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.None << FilmFieldShifts.FourthAction),
  FirstMovieGreenEndOfTheWorld = FilmColor.Green |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (FilmAction.None << FilmFieldShifts.BonusAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FirstAction) |
    (FilmAction.AdvertisingTokenOnGreenGuest << FilmFieldShifts.SecondAction) |
    (FilmAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.None << FilmFieldShifts.FourthAction),
  FirstMovieRedItSMyWar = FilmColor.Red |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (FilmAction.None << FilmFieldShifts.BonusAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FirstAction) |
    (FilmAction.AdvertisingTokenOnRedGuest << FilmFieldShifts.SecondAction) |
    (FilmAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.None << FilmFieldShifts.FourthAction),
  FirstMovieYellowModernLove = FilmColor.Yellow |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (FilmAction.None << FilmFieldShifts.BonusAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FirstAction) |
    (FilmAction.AdvertisingTokenOnYellowGuest << FilmFieldShifts.SecondAction) |
    (FilmAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.None << FilmFieldShifts.FourthAction),
  BlueHenrietta = FilmColor.Blue |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (FilmAction.None << FilmFieldShifts.BonusAction) |
    (FilmAction.None << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Money << FilmFieldShifts.SecondAction) |
    (FilmAction.AdvertisingTokenOnBlueGuest << FilmFieldShifts.ThirdAction) |
    (FilmAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.FourthAction),
  BlueMe = FilmColor.Blue |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (FilmAction.None << FilmFieldShifts.BonusAction) |
    (FilmAction.None << FilmFieldShifts.FirstAction) |
    (FilmAction.PlaceGuestInReserve << FilmFieldShifts.SecondAction) |
    (FilmAction.DrawGuestAndPlaceThem << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get4Popcorn << FilmFieldShifts.FourthAction),
  Blue5678 = FilmColor.Blue |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.BonusAction) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Money << FilmFieldShifts.SecondAction) |
    (FilmAction.AdvertisingTokenOnBlueGuest << FilmFieldShifts.ThirdAction) |
    (FilmAction.DrawGuestAndPlaceThem << FilmFieldShifts.FourthAction),
  BlueJoeJoe = FilmColor.Blue |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get2Money << FilmFieldShifts.BonusAction) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.FirstAction) |
    (FilmAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.SecondAction) |
    (FilmAction.Get3Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.FourthAction),
  BlueTheNeuroticDetective = FilmColor.Blue |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.AdvertisingTokenOnBlueGuest << FilmFieldShifts.BonusAction) |
    (FilmAction.Get1Money << FilmFieldShifts.FirstAction) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.Get3Popcorn << FilmFieldShifts.ThirdAction) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.FourthAction),
  BlueObjection = FilmColor.Blue |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.BonusAction) |
    (FilmAction.PlaceGuestInReserve << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Money << FilmFieldShifts.SecondAction) |
    (FilmAction.AdvertisingTokenOnBlueGuest << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get4Money << FilmFieldShifts.FourthAction),
  BlueBigSpenders = FilmColor.Blue |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get2Money << FilmFieldShifts.BonusAction) |
    (FilmAction.Get1Money << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.PlaceExitZoneGuestInBag << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get2Money << FilmFieldShifts.FourthAction),
  BlueControlZ = FilmColor.Blue |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.BonusAction) |
    (FilmAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.FirstAction) |
    (FilmAction.Get3Money << FilmFieldShifts.SecondAction) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.ThirdAction) |
    (FilmAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.FourthAction),
  BlueRohanAndJaya = FilmColor.Blue |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get2Money << FilmFieldShifts.BonusAction) |
    (FilmAction.AdvertisingTokenOnBlueGuest << FilmFieldShifts.FirstAction) |
    (FilmAction.Get3Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.ThirdAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  BlueAdrian = FilmColor.Blue |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.BonusAction) |
    (FilmAction.Get3Money << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.ThirdAction) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.FourthAction),
  BlueTheGodmother = FilmColor.Blue |
    (5 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get3Popcorn << FilmFieldShifts.BonusAction) |
    (FilmAction.PlaceExitZoneGuestInBag << FilmFieldShifts.FirstAction) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.SecondAction) |
    (FilmAction.Get3Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  FinalShowing = 255,
  GreenFrankAndEinstein = FilmColor.Green |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (FilmAction.None << FilmFieldShifts.BonusAction) |
    (FilmAction.None << FilmFieldShifts.FirstAction) |
    (FilmAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.SecondAction) |
    (FilmAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.AdvertisingTokenOnGreenGuest << FilmFieldShifts.FourthAction),
  GreenTheBarbarian = FilmColor.Green |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (FilmAction.None << FilmFieldShifts.BonusAction) |
    (FilmAction.None << FilmFieldShifts.FirstAction) |
    (FilmAction.DrawGuestAndPlaceThem << FilmFieldShifts.SecondAction) |
    (FilmAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.PlaceGuestInReserve << FilmFieldShifts.FourthAction),
  GreenRevengeOfTheDiplodocus = FilmColor.Green |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.PlaceExitZoneGuestInBag << FilmFieldShifts.BonusAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.FirstAction) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.PlaceGuestInReserve << FilmFieldShifts.ThirdAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  GreenMountainHotel = FilmColor.Green |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get2Money << FilmFieldShifts.BonusAction) |
    (FilmAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.FirstAction) |
    (FilmAction.PlaceExitZoneGuestInBag << FilmFieldShifts.SecondAction) |
    (FilmAction.AdvertisingTokenOnGreenGuest << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.FourthAction),
  GreenBadman = FilmColor.Green |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.AdvertisingTokenOnGreenGuest << FilmFieldShifts.BonusAction) |
    (FilmAction.PlaceExitZoneGuestInBag << FilmFieldShifts.FirstAction) |
    (FilmAction.Get3Money << FilmFieldShifts.SecondAction) |
    (FilmAction.PlaceGuestInReserve << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.FourthAction),
  GreenKingOfTokyo = FilmColor.Green |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get3Popcorn << FilmFieldShifts.BonusAction) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.FirstAction) |
    (FilmAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.SecondAction) |
    (FilmAction.Get3Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.AdvertisingTokenOnGreenGuest << FilmFieldShifts.FourthAction),
  GreenAMonsterInTheShip = FilmColor.Green |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.BonusAction) |
    (FilmAction.PlaceGuestInReserve << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.Get4Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.FourthAction),
  GreenWitchesVsCheerleaders = FilmColor.Green |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.BonusAction) |
    (FilmAction.AdvertisingTokenOnGreenGuest << FilmFieldShifts.FirstAction) |
    (FilmAction.Get3Money << FilmFieldShifts.SecondAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.ThirdAction) |
    (FilmAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.FourthAction),
  GreenAbracadab = FilmColor.Green |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get2Money << FilmFieldShifts.BonusAction) |
    (FilmAction.DrawGuestAndPlaceThem << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get3Money << FilmFieldShifts.FourthAction),
  GreenEliminator4 = FilmColor.Green |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.BonusAction) |
    (FilmAction.DrawGuestAndPlaceThem << FilmFieldShifts.FirstAction) |
    (FilmAction.Get3Money << FilmFieldShifts.SecondAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get3Popcorn << FilmFieldShifts.FourthAction),
  GreenIntergalactic = FilmColor.Green |
    (5 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get4Popcorn << FilmFieldShifts.BonusAction) |
    (FilmAction.PlaceExitZoneGuestInBag << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get4Money << FilmFieldShifts.FourthAction),
  RedTheManWithTheMoney = FilmColor.Red |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (FilmAction.None << FilmFieldShifts.BonusAction) |
    (FilmAction.None << FilmFieldShifts.FirstAction) |
    (FilmAction.Get1Money << FilmFieldShifts.SecondAction) |
    (FilmAction.AdvertisingTokenOnRedGuest << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get3Popcorn << FilmFieldShifts.FourthAction),
  RedBarbacus = FilmColor.Red |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (FilmAction.None << FilmFieldShifts.BonusAction) |
    (FilmAction.None << FilmFieldShifts.FirstAction) |
    (FilmAction.DrawGuestAndPlaceThem << FilmFieldShifts.SecondAction) |
    (FilmAction.Get1Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.FourthAction),
  RedTheFuryOfTheSerpent = FilmColor.Red |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.BonusAction) |
    (FilmAction.PlaceExitZoneGuestInBag << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  RedTheCursedPegleg = FilmColor.Red |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.PlaceGuestInReserve << FilmFieldShifts.BonusAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.FirstAction) |
    (FilmAction.PlaceExitZoneGuestInBag << FilmFieldShifts.SecondAction) |
    (FilmAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.AdvertisingTokenOnRedGuest << FilmFieldShifts.FourthAction),
  RedTheWorkdAfter = FilmColor.Red |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get1Money << FilmFieldShifts.BonusAction) |
    (FilmAction.Get2Money << FilmFieldShifts.FirstAction) |
    (FilmAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.SecondAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.ThirdAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  RedTheVolcano = FilmColor.Red |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.BonusAction) |
    (FilmAction.Get2Money << FilmFieldShifts.FirstAction) |
    (FilmAction.AdvertisingTokenOnRedGuest << FilmFieldShifts.SecondAction) |
    (FilmAction.DrawGuestAndPlaceThem << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.FourthAction),
  RedUnknownDestination = FilmColor.Red |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.BonusAction) |
    (FilmAction.PlaceGuestInReserve << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.AdvertisingTokenOnRedGuest << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get2Money << FilmFieldShifts.FourthAction),
  RedGentlemanDriver = FilmColor.Red |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.BonusAction) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.FirstAction) |
    (FilmAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.SecondAction) |
    (FilmAction.Get3Popcorn << FilmFieldShifts.ThirdAction) |
    (FilmAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.FourthAction),
  RedFinalLasso = FilmColor.Red |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.BonusAction) |
    (FilmAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.Get3Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.FourthAction),
  RedElitePilot = FilmColor.Red |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.BonusAction) |
    (FilmAction.PlaceGuestInReserve << FilmFieldShifts.FirstAction) |
    (FilmAction.Get3Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.DrawGuestAndPlaceThem << FilmFieldShifts.ThirdAction) |
    (FilmAction.AdvertisingTokenOnRedGuest << FilmFieldShifts.FourthAction),
  RedVroom8 = FilmColor.Red |
    (5 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.PlaceExitZoneGuestInBag << FilmFieldShifts.BonusAction) |
    (FilmAction.Get4Money << FilmFieldShifts.FirstAction) |
    (FilmAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.SecondAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get4Popcorn << FilmFieldShifts.FourthAction),
  YellowMisterGiggles = FilmColor.Yellow |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (FilmAction.None << FilmFieldShifts.BonusAction) |
    (FilmAction.None << FilmFieldShifts.FirstAction) |
    (FilmAction.PlaceGuestInReserve << FilmFieldShifts.SecondAction) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.ThirdAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  YellowMelancholyCharlie = FilmColor.Yellow |
    (0 << FilmFieldShifts.Price) |
    (BonusCondition.None << FilmFieldShifts.BonusCondition) |
    (FilmAction.None << FilmFieldShifts.BonusAction) |
    (FilmAction.None << FilmFieldShifts.FirstAction) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.AdvertisingTokenOnYellowGuest << FilmFieldShifts.ThirdAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  YellowKangarooMan = FilmColor.Yellow |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.BonusAction) |
    (FilmAction.Get1Money << FilmFieldShifts.SecondAction) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.AdvertisingTokenOnYellowGuest << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get2Money << FilmFieldShifts.FourthAction),
  YellowTheKids = FilmColor.Yellow |
    (1 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.BonusAction) |
    (FilmAction.AdvertisingTokenOnWhiteGuestToBag << FilmFieldShifts.FirstAction) |
    (FilmAction.AdvertisingTokenOnYellowGuest << FilmFieldShifts.SecondAction) |
    (FilmAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  YellowWhatABunchOfIdiots3 = FilmColor.Yellow |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.BonusAction) |
    (FilmAction.Get1Money << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.PlaceGuestInReserve << FilmFieldShifts.ThirdAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  YellowSchoolOfZombies = FilmColor.Yellow |
    (2 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.PlaceExitZoneGuestInBag << FilmFieldShifts.BonusAction) |
    (FilmAction.AdvertisingTokenOnYellowGuest << FilmFieldShifts.FirstAction) |
    (FilmAction.Get1Money << FilmFieldShifts.SecondAction) |
    (FilmAction.Get2Money << FilmFieldShifts.ThirdAction) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.FourthAction),
  YellowDoReMiFaSo = FilmColor.Yellow |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.TwoSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.BonusAction) |
    (FilmAction.Get1Popcorn << FilmFieldShifts.FirstAction) |
    (FilmAction.PlaceExitZoneGuestInBag << FilmFieldShifts.SecondAction) |
    (FilmAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.ThirdAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  YellowFrenchKiss = FilmColor.Yellow |
    (3 << FilmFieldShifts.Price) |
    (BonusCondition.OneSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.AdvertisingTokenOnYellowGuest << FilmFieldShifts.BonusAction) |
    (FilmAction.Get2Money << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.PlaceExitZoneGuestInBag << FilmFieldShifts.ThirdAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.FourthAction),
  Yellow28InTheFamily = FilmColor.Yellow |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.BonusAction) |
    (FilmAction.DrawGuestAndPlaceThem << FilmFieldShifts.FirstAction) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.SecondAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.ThirdAction) |
    (FilmAction.Get2Money << FilmFieldShifts.FourthAction),
  YellowTheAdventuresOfPewPew = FilmColor.Yellow |
    (4 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.BonusAction) |
    (FilmAction.Get3Money << FilmFieldShifts.FirstAction) |
    (FilmAction.DrawGuestAndPlaceThem << FilmFieldShifts.SecondAction) |
    (FilmAction.DrawAwardCard << FilmFieldShifts.ThirdAction) |
    (FilmAction.AdvertisingTokenOnYellowGuest << FilmFieldShifts.FourthAction),
  YellowTheFirePrincess = FilmColor.Yellow |
    (5 << FilmFieldShifts.Price) |
    (BonusCondition.ThreeSeatTheater << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get2Popcorn << FilmFieldShifts.BonusCondition) |
    (FilmAction.Get3Money << FilmFieldShifts.FirstAction) |
    (FilmAction.AudienceTrackAdvance << FilmFieldShifts.SecondAction) |
    (FilmAction.Get3Popcorn << FilmFieldShifts.ThirdAction) |
    (FilmAction.AdvertisingTokenOnAnyGuest << FilmFieldShifts.FourthAction)
}

export enum MovieCardType {
  FirstMovie = 1,
  Movie = 2
}

const FILM_COLOR_LENGTH = 2
const FILM_PRICE_LENGTH = 3
const FILM_BONUS_CONDITION_LENGTH = 2
const FILM_ACTION_LENGTH = 5

export const movieCards = getEnumValues(MovieCard)

export const getFilmColor = (id: MovieCard): FilmColor => id & (2 ** FILM_COLOR_LENGTH - 1)

export const getPrice = (id: MovieCard): number => (id >> FilmFieldShifts.Price) & (2 ** FILM_PRICE_LENGTH - 1)

export const getBonusCondition = (id: MovieCard): BonusCondition => (id >> FilmFieldShifts.BonusCondition) & (2 ** FILM_BONUS_CONDITION_LENGTH - 1)

export const getBonusAction = (id: MovieCard): FilmAction => (id >> FilmFieldShifts.BonusAction) & (2 ** FILM_ACTION_LENGTH - 1)

export const getFirstAction = (id: MovieCard): FilmAction => (id >> FilmFieldShifts.FirstAction) & (2 ** FILM_ACTION_LENGTH - 1)

export const getSecondAction = (id: MovieCard): FilmAction => (id >> FilmFieldShifts.SecondAction) & (2 ** FILM_ACTION_LENGTH - 1)

export const getThirdAction = (id: MovieCard): FilmAction => (id >> FilmFieldShifts.ThirdAction) & (2 ** FILM_ACTION_LENGTH - 1)

export const getFourthAction = (id: MovieCard): FilmAction => (id >> FilmFieldShifts.FourthAction) & (2 ** FILM_ACTION_LENGTH - 1)

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
