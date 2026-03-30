import { SeatAction } from '@gamepark/popcorn/material/TheaterTile'
import get1MoneySymbol from '../../images/Symbols/Action1Money.png'
import get1PopcornSymbol from '../../images/Symbols/Action1Popcorn.png'
import get2MoneySymbol from '../../images/Symbols/Action2Money.png'
import get2PopcornSymbol from '../../images/Symbols/Action2Popcorn.png'
import get3MoneySymbol from '../../images/Symbols/Action3Money.png'
import drawGuestAndPlaceThemSymbol from '../../images/Symbols/ActionDrawGuest.png'
import moveExitZoneGuestToBagSymbol from '../../images/Symbols/ActionExitZoneGuestToBag.png'
import placeGuestInReserveSymbol from '../../images/Symbols/ActionPlaceGuestInReserve.png'
import movieActionSymbol from '../../images/Symbols/SeatActionMovieAction.png'

export const actionSymbols = {
  [SeatAction.DrawGuestAndPlaceThem]: drawGuestAndPlaceThemSymbol,
  [SeatAction.Get1Money]: get1MoneySymbol,
  [SeatAction.Get2Money]: get2MoneySymbol,
  [SeatAction.Get3Money]: get3MoneySymbol,
  [SeatAction.Get1Popcorn]: get1PopcornSymbol,
  [SeatAction.Get2Popcorn]: get2PopcornSymbol,
  [SeatAction.MoveGuestFromExitZoneToBag]: moveExitZoneGuestToBagSymbol,
  [SeatAction.MovieAction]: movieActionSymbol,
  [SeatAction.PlaceGuestInReserve]: placeGuestInReserveSymbol
}
