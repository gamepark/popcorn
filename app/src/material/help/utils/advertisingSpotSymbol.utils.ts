import { AdvertisingTokenSpot } from '@gamepark/popcorn/material/AdvertisingTokenSpot'
import advertisingBoardAnyGuestSymbol from '../../../images/Symbols/AdvertisingBoardAnyGuest.png'
import advertisingBoardBlueGuestSymbol from '../../../images/Symbols/AdvertisingBoardBlueGuest.png'
import advertisingBoardGreenGuestSymbol from '../../../images/Symbols/AdvertisingBoardGreenGuest.png'
import advertisingBoardRedGuestSymbol from '../../../images/Symbols/AdvertisingBoardRedGuest.png'
import advertisingBoardWhiteToBagSymbol from '../../../images/Symbols/AdvertisingBoardWhiteToBag.png'
import advertisingBoardYellowGuestSymbol from '../../../images/Symbols/AdvertisingBoardYellowGuest.png'

export const getAdvertisingSpotSymbol = (spot: AdvertisingTokenSpot) => {
  switch (spot) {
    case AdvertisingTokenSpot.AnyGuestPawn:
      return advertisingBoardAnyGuestSymbol
    case AdvertisingTokenSpot.BlueGuestPawn:
      return advertisingBoardBlueGuestSymbol
    case AdvertisingTokenSpot.GreenGuestPawn:
      return advertisingBoardGreenGuestSymbol
    case AdvertisingTokenSpot.RedGuestPawn:
      return advertisingBoardRedGuestSymbol
    case AdvertisingTokenSpot.YellowGuestPawn:
      return advertisingBoardYellowGuestSymbol
    case AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag:
      return advertisingBoardWhiteToBagSymbol
  }
}
