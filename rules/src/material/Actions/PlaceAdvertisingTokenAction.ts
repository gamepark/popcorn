import { AdvertisingTokenSpot } from '../AdvertisingTokenSpot'
import { ActionType } from './ActionType'

export type PlaceAdvertisingTokenAction = {
  type: ActionType.PlaceAdvertisingToken
  spot: AdvertisingTokenSpot
}
