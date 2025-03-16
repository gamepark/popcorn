import { getEnumValues } from '@gamepark/rules-api'

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
  OneSeat2Money = 3 |
    (SeatsNumber.One << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get2Money << TheaterTileFieldsShift.Seat1Action),
  OneSeat1Popcorn = 2 |
    (SeatsNumber.One << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get1Popcorn << TheaterTileFieldsShift.Seat1Action),
  OneSeatRed2Popcorn = 3 |
    (SeatsNumber.One << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Red << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get2Popcorn << TheaterTileFieldsShift.Seat1Action),
  OneSeatYellowDrawGuest = 2 |
    (SeatsNumber.One << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Yellow << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.DrawGuestAndPlaceThem << TheaterTileFieldsShift.Seat1Action),
  OneSeatBlue3Money = 2 |
    (SeatsNumber.One << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Blue << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get3Money << TheaterTileFieldsShift.Seat1Action),
  OneSeatGreenReserve = 3 |
    (SeatsNumber.One << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Green << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.PlaceGuestInReserve << TheaterTileFieldsShift.Seat1Action),
  OneSeat3Money = 5 |
    (SeatsNumber.One << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get3Money << TheaterTileFieldsShift.Seat1Action),
  OneSeat1Money = 2 |
    (SeatsNumber.One << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get1Money << TheaterTileFieldsShift.Seat1Action),
  TwoSeatGreen2MoneyMovieAction = 5 |
    (SeatsNumber.Two << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Green << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get2Money << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat2Action),
  TwoSeatYellow2PopcornMovieAction = 6 |
    (SeatsNumber.Two << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Yellow << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get2Popcorn << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Green << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat2Action),
  TwoSeatBlue2PopcornMovieAction = 6 |
    (SeatsNumber.Two << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Blue << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get2Popcorn << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Green << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat2Action),
  TwoSeatRed2MoneyMovieAction = 5 |
    (SeatsNumber.Two << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Red << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get2Money << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat2Action),
  TwoSeatBlue1Popcorn2Money = 4 |
    (SeatsNumber.Two << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Blue << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.Get1Popcorn << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.Get2Money << TheaterTileFieldsShift.Seat2Action),
  TwoSeatRedBagMovieAction = 6 |
    (SeatsNumber.Two << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Red << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.MoveGuestFromExitZoneToBag << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat2Action),
  TwoSeatYellowReserve2money = 4 |
    (SeatsNumber.Two << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Yellow << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.PlaceGuestInReserve << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.Get2Money << TheaterTileFieldsShift.Seat2Action),
  TwoSeatGreenDrawMovieAction = 5 |
    (SeatsNumber.Two << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Green << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.DrawGuestAndPlaceThem << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Grey << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat2Action),
  TwoSeatYellowYellow = 4 |
    (SeatsNumber.Two << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Yellow << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Yellow << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.Get2Money << TheaterTileFieldsShift.Seat2Action),
  TwoSeatRedRed = 5 |
    (SeatsNumber.Two << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Red << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Red << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.Get2Popcorn << TheaterTileFieldsShift.Seat2Action),
  TwoSeatBlueGreen = 4 |
    (SeatsNumber.Two << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Blue << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Green << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.MoveGuestFromExitZoneToBag << TheaterTileFieldsShift.Seat2Action),
  TwoSeatGreenBlue = 5 |
    (SeatsNumber.Two << TheaterTileFieldsShift.NumberOfSeats) |
    (SeatColor.Green << TheaterTileFieldsShift.Seat1Color) |
    (SeatAction.MovieAction << TheaterTileFieldsShift.Seat1Action) |
    (SeatColor.Blue << TheaterTileFieldsShift.Seat2Color) |
    (SeatAction.Get2Popcorn << TheaterTileFieldsShift.Seat2Action),
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
    (SeatsNumber.One << TheaterTileFieldsShift.NumberOfSeats) |
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

const PRICE_LENGTH = 4
const SEATS_NUMBER_LENGTH = 2
const SEAT_COLOR_LENGTH = 3
const SEAT_ACTION_LENGTH = 5

export const getTheaterTilePrice = (id: TheaterTile): number => id & (2 ** PRICE_LENGTH - 1)

export const getNumberOfSeats = (id: TheaterTile): number => (id >> TheaterTileFieldsShift.NumberOfSeats) & (2 ** SEATS_NUMBER_LENGTH - 1)

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
