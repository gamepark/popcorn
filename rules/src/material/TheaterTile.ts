import { getEnumValues } from '@gamepark/rules-api'
import { DefaultOneSeatTileCharacteristics } from './TheaterTiles/DefaultOneSeatTileCharacteristics'
import { DefaultTwoSeatTileCharacteristics } from './TheaterTiles/DefaultTwoSeatTileCharacteristics'
import { OneSeat1MoneyCharacteristics } from './TheaterTiles/OneSeat1MoneyCharacteristics'
import { OneSeat1PopcornCharacteristics } from './TheaterTiles/OneSeat1PopcornCharacteristics'
import { OneSeat2MoneyCharacteristics } from './TheaterTiles/OneSeat2MoneyCharacteristics'
import { OneSeat3MoneyCharacteristics } from './TheaterTiles/OneSeat3MoneyCharacteristics'
import { OneSeatBlue3MoneyCharacteristics } from './TheaterTiles/OneSeatBlue3MoneyCharacteristics'
import { OneSeatGreenReserveCharacteristics } from './TheaterTiles/OneSeatGreenReserveCharacteristics'
import { OneSeatRed2PopcornCharacteristics } from './TheaterTiles/OneSeatRed2PopcornCharacteristics'
import { OneSeatYellowDrawGuestCharacteristics } from './TheaterTiles/OneSeatYellowDrawGuestCharacteristics'
import { TheaterTileCharacteristics } from './TheaterTiles/TheaterTileCharacteristics'
import { ThreeSeatBlueBlueGreyCharacteristics } from './TheaterTiles/ThreeSeatBlueBlueGreyCharacteristics'
import { ThreeSeatBlueGreyGreyCharacteristics } from './TheaterTiles/ThreeSeatBlueGreyGreyCharacteristics'
import { ThreeSeatGreenGreyGreyCharacteristics } from './TheaterTiles/ThreeSeatGreenGreyGreyCharacteristics'
import { ThreeSeatRedGreyGreyCharacteristics } from './TheaterTiles/ThreeSeatRedGreyGreyCharacteristics'
import { ThreeSeatYellow3MoneyRedGreyCharacteristics } from './TheaterTiles/ThreeSeatYellow3MoneyRedGreyCharacteristics'
import { ThreeSeatYellowExitRedGreyCharacteristics } from './TheaterTiles/ThreeSeatYellowExitRedGreyCharacteristics'
import { ThreeSeatYellowGreyGreyCharacteristics } from './TheaterTiles/ThreeSeatYellowGreyGreyCharacteristics'
import { TwoSeatBlue1Popcorn2MoneyCharacteristics } from './TheaterTiles/TwoSeatBlue1Popcorn2MoneyCharacteristics'
import { TwoSeatBlue2PopcornMovieActionCharacteristic } from './TheaterTiles/TwoSeatBlue2PopcornMovieActionCharacteristics'
import { TwoSeatBlueGreenCharacteristics } from './TheaterTiles/TwoSeatBlueGreenCharacteristics'
import { TwoSeatGreen2MoneyMovieActionCharacteristics } from './TheaterTiles/TwoSeatGreen2MoneyMovieActionCharacteristics'
import { TwoSeatGreenBlueCharacteristics } from './TheaterTiles/TwoSeatGreenBlueCharacteristics'
import { TwoSeatGreenDrawMovieActionCharacteristics } from './TheaterTiles/TwoSeatGreenDrawMovieActionCharacteristics'
import { TwoSeatRed2MoneyMovieActionCharacteristics } from './TheaterTiles/TwoSeatRed2MoneyMovieActionCharacteristics'
import { TwoSeatRedBagMovieActionCharacteristics } from './TheaterTiles/TwoSeatRedBagMovieActionCharacteristics'
import { TwoSeatRedRedCharacteristics } from './TheaterTiles/TwoSeatRedRedCharacteristics'
import { TwoSeatYellow2PopcornMovieActionCharacteristics } from './TheaterTiles/TwoSeatYellow2PopcornMovieActionCharacteristics'
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
  Three,
  Default
}

/* eslint "@typescript-eslint/prefer-literal-enum-member": "off" */
export enum TheaterTile {
  DefaultOneSeatTile = 1,
  DefaultTwoSeatTile,
  OneSeat2Money,
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
  ThreeSeatBlueGreyGrey,
  ThreeSeatGreenGreyGrey,
  ThreeSeatRedGreyGrey,
  ThreeSeatYellowGreyGrey,
  ThreeSeatYellowExitRedGrey,
  ThreeSeatYellow3MoneyRedGrey,
  ThreeSeatBlueBlueGrey,
  ThreeSeatGreenGreenGrey
}

export const theaterTiles = getEnumValues(TheaterTile)

export const theaterTilesWithoutDefault = theaterTiles.slice(2)

export const getMaximumNumberOfGuests = (seatNumber: Exclude<SeatsNumber, SeatsNumber.Default>): number => {
  switch (seatNumber) {
    case SeatsNumber.One:
      return 1
    case SeatsNumber.Two:
      return 2
    case SeatsNumber.Three:
      return 3
  }
}

export const theaterTilesCharacteristics: Record<TheaterTile, TheaterTileCharacteristics> = {
  [TheaterTile.DefaultOneSeatTile]: new DefaultOneSeatTileCharacteristics(),
  [TheaterTile.DefaultTwoSeatTile]: new DefaultTwoSeatTileCharacteristics(),
  [TheaterTile.OneSeat2Money]: new OneSeat2MoneyCharacteristics(),
  [TheaterTile.OneSeat1Popcorn]: new OneSeat1PopcornCharacteristics(),
  [TheaterTile.OneSeatRed2Popcorn]: new OneSeatRed2PopcornCharacteristics(),
  [TheaterTile.OneSeatYellowDrawGuest]: new OneSeatYellowDrawGuestCharacteristics(),
  [TheaterTile.OneSeatBlue3Money]: new OneSeatBlue3MoneyCharacteristics(),
  [TheaterTile.OneSeatGreenReserve]: new OneSeatGreenReserveCharacteristics(),
  [TheaterTile.OneSeat3Money]: new OneSeat3MoneyCharacteristics(),
  [TheaterTile.OneSeat1Money]: new OneSeat1MoneyCharacteristics(),
  [TheaterTile.TwoSeatGreen2MoneyMovieAction]: new TwoSeatGreen2MoneyMovieActionCharacteristics(),
  [TheaterTile.TwoSeatYellow2PopcornMovieAction]: new TwoSeatYellow2PopcornMovieActionCharacteristics(),
  [TheaterTile.TwoSeatBlue2PopcornMovieAction]: new TwoSeatBlue2PopcornMovieActionCharacteristic(),
  [TheaterTile.TwoSeatRed2MoneyMovieAction]: new TwoSeatRed2MoneyMovieActionCharacteristics(),
  [TheaterTile.TwoSeatBlue1Popcorn2Money]: new TwoSeatBlue1Popcorn2MoneyCharacteristics(),
  [TheaterTile.TwoSeatRedBagMovieAction]: new TwoSeatRedBagMovieActionCharacteristics(),
  [TheaterTile.TwoSeatYellowReserve2Money]: new TwoSeatYellowReserve2MoneyCharacteristics(),
  [TheaterTile.TwoSeatGreenDrawMovieAction]: new TwoSeatGreenDrawMovieActionCharacteristics(),
  [TheaterTile.TwoSeatYellowYellow]: new TwoSeatYellowYellowCharacteristics(),
  [TheaterTile.TwoSeatRedRed]: new TwoSeatRedRedCharacteristics(),
  [TheaterTile.TwoSeatBlueGreen]: new TwoSeatBlueGreenCharacteristics(),
  [TheaterTile.TwoSeatGreenBlue]: new TwoSeatGreenBlueCharacteristics(),
  [TheaterTile.ThreeSeatBlueGreyGrey]: new ThreeSeatBlueGreyGreyCharacteristics(),
  [TheaterTile.ThreeSeatGreenGreyGrey]: new ThreeSeatGreenGreyGreyCharacteristics(),
  [TheaterTile.ThreeSeatRedGreyGrey]: new ThreeSeatRedGreyGreyCharacteristics(),
  [TheaterTile.ThreeSeatYellowGreyGrey]: new ThreeSeatYellowGreyGreyCharacteristics(),
  [TheaterTile.ThreeSeatYellowExitRedGrey]: new ThreeSeatYellowExitRedGreyCharacteristics(),
  [TheaterTile.ThreeSeatYellow3MoneyRedGrey]: new ThreeSeatYellow3MoneyRedGreyCharacteristics(),
  [TheaterTile.ThreeSeatBlueBlueGrey]: new ThreeSeatBlueBlueGreyCharacteristics(),
  [TheaterTile.ThreeSeatGreenGreenGrey]: new ThreeSeatGreenGreyGreyCharacteristics()
}

export type TheaterTileId = {
  front?: TheaterTile
  back: SeatsNumber
}
