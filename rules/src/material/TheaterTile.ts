import { getEnumValues } from '@gamepark/rules-api'
import { OneSeat1MoneyCharacteristics } from './TheaterTiles/OneSeat1MoneyCharacteristics'
import { OneSeat1PopcornCharacteristics } from './TheaterTiles/OneSeat1PopcornCharacteristics'
import { OneSeat2MoneyCharacteristics } from './TheaterTiles/OneSeat2MoneyCharacteristics'
import { OneSeat3MoneyCharacteristics } from './TheaterTiles/OneSeat3MoneyCharacteristics'
import { OneSeatBlue3MoneyCharacteristics } from './TheaterTiles/OneSeatBlue3MoneyCharacteristics'
import { OneSeatGreenReserveCharacteristics } from './TheaterTiles/OneSeatGreenReserveCharacteristics'
import { OneSeatRed2PopcornCharacteristics } from './TheaterTiles/OneSeatRed2PopcornCharacteristics'
import { OneSeatYellowDrawGuestCharacteristics } from './TheaterTiles/OneSeatYellowDrawGuestCharacteristics'
import { TheaterTileCharacteristics } from './TheaterTiles/TheaterTileCharacteristics'
import { TwoSeatBlue1Popcorn2MoneyCharacteristics } from './TheaterTiles/TwoSeatBlue1Popcorn2MoneyCharacteristics'
import { TwoSeatBlue2PopcornMovieActionCharacteristic } from './TheaterTiles/TwoSeatBlue2PopcornMovieActionCharacteristics'
import { TwoSeatBlueGreenCharacteristics } from './TheaterTiles/TwoSeatBlueGreenCharacteristics'
import { TwoSeatGreen2MoneyMovieActionCharacteristics } from './TheaterTiles/TwoSeatGreen2MoneyMovieActionCharacteristics'
import { TwoSeatGreenBlueCharacteristics } from './TheaterTiles/TwoSeatGreenBlueCharacteristics'
import { TwoSeatGreenDrawMovieActionCharacteristics } from './TheaterTiles/TwoSeatGreenDrawMovieActionCharacteristics'
import { TwoSeatRed2MoneyMovieActionCharacteristics } from './TheaterTiles/TwoSeatRed2MoneyMovieActionCharacteristics'
import { TwoSeatRedBagMovieActionCharacteristics } from './TheaterTiles/TwoSeatRedBagMovieActionCharacteristics'
import { TwoSeatRedRedCharacteristics } from './TheaterTiles/TwoSeatRedRedCharacteristics'
import { TwoSeatYellowReserve2MoneyCharacteristics } from './TheaterTiles/TwoSeatYellowReserve2MoneyCharacteristics'
import { TwoSeatYellowYellowCharacteristics } from './TheaterTiles/TwoSeatYellowYellowCharacteristics'

export enum SeatColor {
  Grey = 1,
  Blue,
  Green,
  Red,
  Yellow
}

export enum SeatAction {
  Get1Money = 1,
  Get2Money,
  Get3Money,
  Get1Popcorn,
  Get2Popcorn,
  DrawGuestAndPlaceThem,
  PlaceGuestInReserve,
  MoveGuestFromExitZoneToBag,
  MovieAction
}

export enum SeatsNumber {
  One = 1,
  Two,
  Three
}

enum TheaterTileFieldsShift {
  NumberOfSeats = 4,
  Seat1Color = 6,
  Seat1Action = 9,
  Seat2Color = 13,
  Seat2Action = 16,
  Seat3Color = 21,
  Seat3Action = 24
}

/* eslint "@typescript-eslint/prefer-literal-enum-member": "off" */
export enum TheaterTile {
  OneSeat2Money = 1,
  OneSeat1Popcorn,
  OneSeatRed2Popcorn,
  OneSeatYellowDrawGuest,
  OneSeatBlue3Money,
  OneSeatGreenReserve,
  OneSeat3Money,
  OneSeat1Money,
  TwoSeatGreen2MoneyMovieAction,
  TwoSeatYellow2PopcornMovieAction,
  TwoSeatBlue2PopcornMovieAction,
  TwoSeatRed2MoneyMovieAction,
  TwoSeatBlue1Popcorn2Money,
  TwoSeatRedBagMovieAction,
  TwoSeatYellowReserve2Money,
  TwoSeatGreenDrawMovieAction,
  TwoSeatYellowYellow,
  TwoSeatRedRed,
  TwoSeatBlueGreen,
  TwoSeatGreenBlue,
  ThreeSeatBlueGreyGrey = 8 |
    (SeatsNumber.Three << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Blue << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get3Money << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.PlaceGuestInReserve << TheaterTileFieldsShift.Seat2Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat3Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat3Action),
  ThreeSeatGreenGreyGrey = 8 |
    (SeatsNumber.Three << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Green << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.MoveGuestFromExitZoneToBag << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.Get2Money << TheaterTileFieldsShift.Seat2Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat3Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat3Action),
  ThreeSeatRedGreyGrey = 9 |
    (SeatsNumber.Three << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Red << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.DrawGuestAndPlaceThem << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat2Action) |
    (SeatColor.Green << TheaterTileFieldsShift.Seat3Color) |
    (SeatAction.Get1Popcorn << TheaterTileFieldsShift.Seat3Action),
  ThreeSeatYellowGreyGrey = 9 |
    (SeatsNumber.Three << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Yellow << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get2Popcorn << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat2Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat3Color) |
    (SeatAction.Get2Money << TheaterTileFieldsShift.Seat3Action),
  ThreeSeatYellowExitRedGrey = 7 |
    (SeatsNumber.Three << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Yellow << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.MoveGuestFromExitZoneToBag << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Red << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.Get3Money << TheaterTileFieldsShift.Seat2Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat3Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat3Action),
  ThreeSeatYellow3MoneyRedGrey = 7 |
    (SeatsNumber.Three << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Yellow << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get3Money << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Red << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.PlaceGuestInReserve << TheaterTileFieldsShift.Seat2Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat3Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat3Action),
  ThreeSeatBlueBlueGrey = 8 |
    (SeatsNumber.Three << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Blue << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.DrawGuestAndPlaceThem << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Blue << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.Get2Popcorn << TheaterTileFieldsShift.Seat2Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat3Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat3Action),
  ThreeSeatGreenGreen = 8 |
    (SeatsNumber.Three << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Green << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get1Popcorn << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Green << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.Get2Popcorn << TheaterTileFieldsShift.Seat2Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat3Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat3Action)
}

export const theaterTiles = getEnumValues(TheaterTile)

export const oneSeatTheaterTiles = getEnumValues(TheaterTile).slice(0, 8)

export const twoSeatTheaterTiles = getEnumValues(TheaterTile).slice(8, 20)

export const threeSeatTheaterTiles = getEnumValues(TheaterTile).slice(20)

export const theaterTilesCharacteristics: Partial<Record<TheaterTile, TheaterTileCharacteristics>> = {
  [TheaterTile.OneSeat2Money]: new OneSeat2MoneyCharacteristics(),
  [TheaterTile.OneSeat1Popcorn]: new OneSeat1PopcornCharacteristics(),
  [TheaterTile.OneSeatRed2Popcorn]: new OneSeatRed2PopcornCharacteristics(),
  [TheaterTile.OneSeatYellowDrawGuest]: new OneSeatYellowDrawGuestCharacteristics(),
  [TheaterTile.OneSeatBlue3Money]: new OneSeatBlue3MoneyCharacteristics(),
  [TheaterTile.OneSeatGreenReserve]: new OneSeatGreenReserveCharacteristics(),
  [TheaterTile.OneSeat3Money]: new OneSeat3MoneyCharacteristics(),
  [TheaterTile.OneSeat1Money]: new OneSeat1MoneyCharacteristics(),
  [TheaterTile.TwoSeatGreen2MoneyMovieAction]: new TwoSeatGreen2MoneyMovieActionCharacteristics(),
  [TheaterTile.TwoSeatBlue2PopcornMovieAction]: new TwoSeatBlue2PopcornMovieActionCharacteristic(),
  [TheaterTile.TwoSeatRed2MoneyMovieAction]: new TwoSeatRed2MoneyMovieActionCharacteristics(),
  [TheaterTile.TwoSeatBlue1Popcorn2Money]: new TwoSeatBlue1Popcorn2MoneyCharacteristics(),
  [TheaterTile.TwoSeatRedBagMovieAction]: new TwoSeatRedBagMovieActionCharacteristics(),
  [TheaterTile.TwoSeatYellowReserve2Money]: new TwoSeatYellowReserve2MoneyCharacteristics(),
  [TheaterTile.TwoSeatGreenDrawMovieAction]: new TwoSeatGreenDrawMovieActionCharacteristics(),
  [TheaterTile.TwoSeatYellowYellow]: new TwoSeatYellowYellowCharacteristics(),
  [TheaterTile.TwoSeatRedRed]: new TwoSeatRedRedCharacteristics(),
  [TheaterTile.TwoSeatBlueGreen]: new TwoSeatBlueGreenCharacteristics(),
  [TheaterTile.TwoSeatGreenBlue]: new TwoSeatGreenBlueCharacteristics()
}

const PRICE_LENGTH = 4
const SEATS_NUMBER_LENGTH = 2
const SEAT_COLOR_LENGTH = 3
const SEAT_ACTION_LENGTH = 5

export const getTheaterTilePrice = (id: TheaterTile): number => id & (2 ** PRICE_LENGTH - 1)

export const getNumberOfSeats = (id: TheaterTile): number => (id >> TheaterTileFieldsShift.NumberOfSeats) & (2 ** SEATS_NUMBER_LENGTH - 1)

export const getSeatsNumber = (id: TheaterTile): SeatsNumber => (id >> TheaterTileFieldsShift.NumberOfSeats) & (2 ** SEATS_NUMBER_LENGTH - 1)

export const getSeat1Color = (id: TheaterTile): SeatColor => (id >> TheaterTileFieldsShift.Seat1Color) & (2 ** SEAT_COLOR_LENGTH - 1)

export const getSeat1Action = (id: TheaterTile): SeatAction => (id >> TheaterTileFieldsShift.Seat1Action) & (2 ** SEAT_ACTION_LENGTH - 1)

export const getSeat2Color = (id: TheaterTile): SeatColor => {
  if (getNumberOfSeats(id) < 2) {
    throw new Error("Theater tile doesn't have two seats.")
  }
  return (id >> TheaterTileFieldsShift.Seat2Color) & (2 ** SEAT_COLOR_LENGTH - 1)
}

export const getSeat2Action = (id: TheaterTile): SeatAction => {
  if (getNumberOfSeats(id) < 2) {
    throw new Error("Theater tile doesn't have two seats.")
  }
  return (id >> TheaterTileFieldsShift.Seat2Action) & (2 ** SEAT_ACTION_LENGTH - 1)
}

export const getSeat3Color = (id: TheaterTile): SeatColor => {
  if (getNumberOfSeats(id) < 3) {
    throw new Error("Theater tile doesn't have three seats.")
  }
  return (id >> TheaterTileFieldsShift.Seat3Color) & (2 ** SEAT_COLOR_LENGTH - 1)
}

export const getSeat3Action = (id: TheaterTile): SeatAction => {
  if (getNumberOfSeats(id) < 3) {
    throw new Error("Theater tile doesn't have three seats.")
  }
  return (id >> TheaterTileFieldsShift.Seat3Action) & (2 ** SEAT_ACTION_LENGTH - 1)
}

export type TheaterTileId = {
  front?: TheaterTile
  back: SeatsNumber
}
