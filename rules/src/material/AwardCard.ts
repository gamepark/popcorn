import { getEnumValues } from '@gamepark/rules-api'

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
