import { BuyMovieCardAction } from './BuyMovieCardAction'
import { BuyTheaterTileAction } from './BuyTheaterTileAction'
import { ChooseMovieActionAction } from './ChooseMovieActionAction'
import { ChooseSeatActionAction } from './ChooseSeatActionAction'
import { PickTheaterTileToActivateAction } from './PickTheaterTileToActivateAction'
import { PlaceGuestAction } from './PlaceGuestAction'
import { DiscardAwardCardAction } from './DiscardAwardCardAction'
import { PickReserveOrExitZoneGuestAction } from './PickReserveOrExitZoneGuestAction'
import { PlaceAdvertisingTokenAction } from './PlaceAdvertisingTokenAction'
import { PlaceCinemaGuestInReserveAction } from './PlaceCinemaGuestInReserveAction'
import { PlaceExitZoneGuestInBagAction } from './PlaceExitZoneGuestInBagAction'
import { UseAdvertisingTokenAction } from './UseAdvertisingTokenAction'

export type Actions =
  | BuyMovieCardAction
  | BuyTheaterTileAction
  | ChooseMovieActionAction
  | ChooseSeatActionAction
  | DiscardAwardCardAction
  | PickReserveOrExitZoneGuestAction
  | PickTheaterTileToActivateAction
  | PlaceAdvertisingTokenAction
  | PlaceCinemaGuestInReserveAction
  | PlaceExitZoneGuestInBagAction
  | PlaceGuestAction
  | UseAdvertisingTokenAction
