import { getEnumValues } from '@gamepark/rules-api'
import { AbracadabCharacteristics } from './MovieCards/AbracadabCharacteristics'
import { AdrianCharacteristics } from './MovieCards/AdrianCharacteristics'
import { AMonsterInTheShipCharacteristics } from './MovieCards/AMonsterInTheShipCharacteristics'
import { BadmanCharacteristics } from './MovieCards/BadmanCharacteristics'
import { BarbacusCharacteristics } from './MovieCards/BarbacusCharacteristics'
import { BigSpendersCharacteristics } from './MovieCards/BigSpendersCharacteristics'
import { ControlZCharacteristics } from './MovieCards/ControlZCharacteristics'
import { DoReMiFaSoCharacteristics } from './MovieCards/DoReMiFaSoCharacteristics'
import { Eliminator4Characteristics } from './MovieCards/Eliminator4Characteristics'
import { ElitePilotCharacteristics } from './MovieCards/ElitePilotCharacteristics'
import { EndOfTheWorldCharacteristics } from './MovieCards/EndOfTheWorldCharacteristics'
import { FinalLassoCharacteristics } from './MovieCards/FinalLassoCharacteristics'
import { FiveSixSevenEightCharacteristics } from './MovieCards/FiveSixSevenEightCharacteristics'
import { FrankAndEinsteinCharacteristics } from './MovieCards/FrankAndEinsteinCharacteristics'
import { FrenchKissCharacteristics } from './MovieCards/FrenchKissCharacteristics'
import { GentlemanDriverCharacteristics } from './MovieCards/GentlemanDriverCharacteristics'
import { HenriettaCharacteristics } from './MovieCards/HenriettaCharacteristics'
import { IntergalacticCharacteristics } from './MovieCards/IntergalacticCharacteristics'
import { ItSMyWarCharacteristics } from './MovieCards/ItSMyWarCharacteristics'
import { JoeJoeCharacteristics } from './MovieCards/JoeJoeCharacteristics'
import { KangarooManCharacteristics } from './MovieCards/KangarooManCharacteristics'
import { KingOfTokyoCharacteristics } from './MovieCards/KingOfTokyoCharacteristics'
import { MeCharacteristics } from './MovieCards/MeCharacteristics'
import { MelancholyCharlieCharacteristics } from './MovieCards/MelancholyCharlieCharacteristics'
import { MisterGigglesCharacteristics } from './MovieCards/MisterGigglesCharacteristics'
import { ModernLoveCharacteristics } from './MovieCards/ModernLoveCharacteristics'
import { MountainHotelCharacteristics } from './MovieCards/MountainHotelCharacteristics'
import { MovieCardCharacteristics } from './MovieCards/MovieCardCharacteristics'
import { ObjectionCharacteristics } from './MovieCards/ObjectionCharacteristics'
import { RevengeOfTheDiplodocusCharacteristics } from './MovieCards/RevengeOfTheDiplodocusCharacteristics'
import { RohanAndJayaCharacteristics } from './MovieCards/RohanAndJayaCharacteristics'
import { RosebudCharacteristics } from './MovieCards/RosebudCharacteristics'
import { SchoolOfZombiesCharacteristics } from './MovieCards/SchoolOfZombiesCharacteristics'
import { TheAdventuresOfPewPewCharacteristics } from './MovieCards/TheAdventuresOfPewPewCharacteristics'
import { TheBarbarianCharacteristics } from './MovieCards/TheBarbarianCharacteristics'
import { TheCursedPeglegCharacteristics } from './MovieCards/TheCursedPeglegCharacteristics'
import { TheFirePrincessCharacteristics } from './MovieCards/TheFirePrincessCharacteristics'
import { TheFuryOfTheSerpentCharacteristics } from './MovieCards/TheFuryOfTheSerpentCharacteristics'
import { TheGodmotherCharacteristics } from './MovieCards/TheGodmotherCharacteristics'
import { TheKidsCharacteristics } from './MovieCards/TheKidsCharacteristics'
import { TheManWithTheMoneyCharacteristics } from './MovieCards/TheManWithTheMoneyCharacteristics'
import { TheNeuroticDetectiveCharacteristics } from './MovieCards/TheNeuroticDetectiveCharacteristics'
import { TheVolcanoCharacteristics } from './MovieCards/TheVolcanoCharacteristics'
import { TheWorldAfterCharacteristics } from './MovieCards/TheWorldAfterCharacteristics'
import { TwentyEightInTheFamilyCharacteristics } from './MovieCards/TwentyEightInTheFamilyCharacteristics'
import { UnknwonDestinationCharacteristics } from './MovieCards/UnknwonDestinationCharacteristics'
import { Vroom8Characteristics } from './MovieCards/Vroom8Characteristics'
import { WhatABunchOfIdiots3Characteristics } from './MovieCards/WhatABunchOfIdiots3Characteristics'
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
  // Red movies
  RedTheManWithTheMoney,
  RedBarbacus,
  RedTheFuryOfTheSerpent,
  RedTheCursedPegleg,
  RedTheWorldAfter,
  RedTheVolcano,
  RedUnknownDestination,
  RedGentlemanDriver,
  RedFinalLasso,
  RedElitePilot,
  RedVroom8,
  // Yellow movies
  YellowMisterGiggles,
  YellowMelancholyCharlie,
  YellowKangarooMan,
  YellowTheKids,
  YellowWhatABunchOfIdiots3,
  YellowSchoolOfZombies,
  YellowDoReMiFaSo,
  YellowFrenchKiss,
  Yellow28InTheFamily,
  YellowTheAdventuresOfPewPew,
  YellowTheFirePrincess,
  // Final showing
  FinalShowing = 255
}

export enum MovieCardType {
  FirstMovie = 1,
  Movie = 2
}

export const movieCardCharacteristics: Record<Exclude<MovieCard, MovieCard.FinalShowing>, MovieCardCharacteristics> = {
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
  [MovieCard.GreenIntergalactic]: new IntergalacticCharacteristics(),
  // Red movies
  [MovieCard.RedTheManWithTheMoney]: new TheManWithTheMoneyCharacteristics(),
  [MovieCard.RedBarbacus]: new BarbacusCharacteristics(),
  [MovieCard.RedTheFuryOfTheSerpent]: new TheFuryOfTheSerpentCharacteristics(),
  [MovieCard.RedTheCursedPegleg]: new TheCursedPeglegCharacteristics(),
  [MovieCard.RedTheWorldAfter]: new TheWorldAfterCharacteristics(),
  [MovieCard.RedTheVolcano]: new TheVolcanoCharacteristics(),
  [MovieCard.RedUnknownDestination]: new UnknwonDestinationCharacteristics(),
  [MovieCard.RedGentlemanDriver]: new GentlemanDriverCharacteristics(),
  [MovieCard.RedFinalLasso]: new FinalLassoCharacteristics(),
  [MovieCard.RedElitePilot]: new ElitePilotCharacteristics(),
  [MovieCard.RedVroom8]: new Vroom8Characteristics(),
  // Yellow movies
  [MovieCard.YellowMisterGiggles]: new MisterGigglesCharacteristics(),
  [MovieCard.YellowMelancholyCharlie]: new MelancholyCharlieCharacteristics(),
  [MovieCard.YellowKangarooMan]: new KangarooManCharacteristics(),
  [MovieCard.YellowTheKids]: new TheKidsCharacteristics(),
  [MovieCard.YellowWhatABunchOfIdiots3]: new WhatABunchOfIdiots3Characteristics(),
  [MovieCard.YellowSchoolOfZombies]: new SchoolOfZombiesCharacteristics(),
  [MovieCard.YellowDoReMiFaSo]: new DoReMiFaSoCharacteristics(),
  [MovieCard.YellowFrenchKiss]: new FrenchKissCharacteristics(),
  [MovieCard.Yellow28InTheFamily]: new TwentyEightInTheFamilyCharacteristics(),
  [MovieCard.YellowTheAdventuresOfPewPew]: new TheAdventuresOfPewPewCharacteristics(),
  [MovieCard.YellowTheFirePrincess]: new TheFirePrincessCharacteristics()
}

export const movieCards = getEnumValues(MovieCard)

export const firstMovieCards = movieCards.slice(0, 4)

export const movieCardsWithoutFinalShowing = movieCards.slice(4, 48)

export type MovieCardId = {
  front?: MovieCard
  back: MovieCardType
}
