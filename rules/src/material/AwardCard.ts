import { getEnumValues, Material } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { AudienceGreaterThanOrEqualToSixPoints } from './AwardCards/AudienceGreaterThanOrEqualToSixPoints'
import { BlueGreenGuestPairPoints } from './AwardCards/BlueGreenGuestPairPoints'
import { BlueGreenMoviePairPoints } from './AwardCards/BlueGreenMoviePairPoints'
import { BlueRedMoviePairPoints } from './AwardCards/BlueRedMoviePairPoints'
import { BlueRedSeatPairPoints } from './AwardCards/BlueRedSeatPairPoints'
import { BlueTwoSeatsGuestsMoviesSetPoints } from './AwardCards/BlueTwoSeatsGuestsMoviesSetPoints'
import { BlueYellowGuestPairPoints } from './AwardCards/BlueYellowGuestPairPoints'
import { BlueYellowSeatPairPoints } from './AwardCards/BlueYellowSeatPairPoints'
import { FourMoviesSameColorSetPoints } from './AwardCards/FourMoviesSameColorSetPoints'
import { FourOfAKindMoviePoints } from './AwardCards/FourOfAKindMoviePoints'
import { FourOfAKindSeatPoints } from './AwardCards/FourOfAKindSeatPoints'
import { GreenRedGuestPairPoints } from './AwardCards/GreenRedGuestPairPoints'
import { GreenRedSeatPairPoints } from './AwardCards/GreenRedSeatPairPoints'
import { GreenTwoSeatsGuestsMoviesSetPoints } from './AwardCards/GreenTwoSeatsGuestsMoviesSetPoints'
import { GreenYellowMoviePairPoints } from './AwardCards/GreenYellowMoviePairPoints'
import { GreenYellowSeatPairPoints } from './AwardCards/GreenYellowSeatPairPoints'
import { GuestNumberPoints } from './AwardCards/GuestNumberPoints'
import { MoviePrice0Or1Points } from './AwardCards/MoviePrice0Or1Points'
import { MoviePrice4Or5Points } from './AwardCards/MoviePrice4Or5Points'
import { RedTwoSeatsGuestsMoviesSetPoints } from './AwardCards/RedTwoSeatsGuestsMoviesSetPoints'
import { RedYellowGuestPairPoints } from './AwardCards/RedYellowGuestPairPoints'
import { RedYellowMoviePairPoints } from './AwardCards/RedYellowMoviePairPoints'
import { ThreeSeatTheaterPoints } from './AwardCards/ThreeSeatTheaterPoints'
import { TwoFourOfAKindGuestPoints } from './AwardCards/TwoFourOfAKindGuestPoints'
import { WhiteGuestCountPoints } from './AwardCards/WhiteGuestCountPoints'
import { YellowTwoSeatsGuestsMoviesSetPoints } from './AwardCards/YellowTwoSeatsGuestsMoviesSetPoints'
import { GuestPawn } from './GuestPawn'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'

export enum AwardCard {
  BlueRedMoviePair = 1,
  BlueGreenMoviePair,
  GreenYellowMoviePair,
  RedYellowMoviePair,
  FourOfAKindMovie,
  GreenRedGuestPair,
  BlueYellowGuestPair,
  BlueGreenGuestPair,
  RedYellowGuestPair,
  TwoFourOfAKindGuest,
  GuestNumber,
  MoviePrice0Or1,
  MoviePrice4Or5,
  ThreeSeatTheater,
  GreenYellowSeatPair,
  GreenRedSeatPair,
  BlueRedSeatPair,
  BlueYellowSeatPair,
  FourOfAKindSeat,
  AudienceGreaterThanOrEqualToSix,
  WhiteGuestCount,
  BlueTwoSeatsGuestsMoviesSet,
  GreenTwoSeatsGuestsMoviesSet,
  RedTwoSeatsGuestsMoviesSet,
  YellowTwoSeatsGuestsMoviesSet,
  FourMovieSameColorSet
}

export const awardCards = getEnumValues(AwardCard)

export type AwardCardPointFunction = (
  playerMovieCardArchiveMaterial: Material<PlayerColor, MaterialType, LocationType>,
  playerTheaterTilesMaterial: Material<PlayerColor, MaterialType, LocationType>,
  guestNumberByColor: Partial<Record<GuestPawn, number>>,
  numberOfGuestsToDraw: number
) => number

export const awardCardPointFunctions: Record<AwardCard, AwardCardPointFunction> = {
  [AwardCard.BlueRedMoviePair]: BlueRedMoviePairPoints,
  [AwardCard.BlueGreenMoviePair]: BlueGreenMoviePairPoints,
  [AwardCard.GreenYellowMoviePair]: GreenYellowMoviePairPoints,
  [AwardCard.RedYellowMoviePair]: RedYellowMoviePairPoints,
  [AwardCard.FourOfAKindMovie]: FourOfAKindMoviePoints,
  [AwardCard.GreenRedGuestPair]: GreenRedGuestPairPoints,
  [AwardCard.BlueYellowGuestPair]: BlueYellowGuestPairPoints,
  [AwardCard.BlueGreenGuestPair]: BlueGreenGuestPairPoints,
  [AwardCard.RedYellowGuestPair]: RedYellowGuestPairPoints,
  [AwardCard.TwoFourOfAKindGuest]: TwoFourOfAKindGuestPoints,
  [AwardCard.GuestNumber]: GuestNumberPoints,
  [AwardCard.MoviePrice0Or1]: MoviePrice0Or1Points,
  [AwardCard.MoviePrice4Or5]: MoviePrice4Or5Points,
  [AwardCard.ThreeSeatTheater]: ThreeSeatTheaterPoints,
  [AwardCard.GreenYellowSeatPair]: GreenYellowSeatPairPoints,
  [AwardCard.GreenRedSeatPair]: GreenRedSeatPairPoints,
  [AwardCard.BlueRedSeatPair]: BlueRedSeatPairPoints,
  [AwardCard.BlueYellowSeatPair]: BlueYellowSeatPairPoints,
  [AwardCard.FourOfAKindSeat]: FourOfAKindSeatPoints,
  [AwardCard.AudienceGreaterThanOrEqualToSix]: AudienceGreaterThanOrEqualToSixPoints,
  [AwardCard.WhiteGuestCount]: WhiteGuestCountPoints,
  [AwardCard.BlueTwoSeatsGuestsMoviesSet]: BlueTwoSeatsGuestsMoviesSetPoints,
  [AwardCard.GreenTwoSeatsGuestsMoviesSet]: GreenTwoSeatsGuestsMoviesSetPoints,
  [AwardCard.RedTwoSeatsGuestsMoviesSet]: RedTwoSeatsGuestsMoviesSetPoints,
  [AwardCard.YellowTwoSeatsGuestsMoviesSet]: YellowTwoSeatsGuestsMoviesSetPoints,
  [AwardCard.FourMovieSameColorSet]: FourMoviesSameColorSetPoints
}
