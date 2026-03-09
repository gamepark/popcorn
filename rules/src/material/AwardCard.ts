import { getEnumValues, Material } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
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
