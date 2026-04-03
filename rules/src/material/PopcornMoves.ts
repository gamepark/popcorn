import {
  isCreateItem,
  isCreateItemType,
  isCustomMove,
  isCustomMoveType,
  isDeleteItem,
  isDeleteItemsAtOnce,
  isDeleteItemType,
  isDeleteItemTypeAtOnce,
  isMoveItem,
  isMoveItemsAtOnce,
  isMoveItemType,
  isMoveItemTypeAtOnce,
  isSelectItem,
  isSelectItemType,
  isShuffleItemType,
  isStartPlayerTurn,
  isStartSimultaneousRule,
  MaterialMove
} from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from '../rules/RuleId'
import { CustomMoveType } from './CustomMoveType'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'

export type PopcornMove = MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>

export const isPopcornStartPlayerTurn = isStartPlayerTurn<PlayerColor, MaterialType, LocationType, RuleId>

export const isPopcornStartSimultaneousRule = isStartSimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId>

export const isPopcornMoveItem = isMoveItem<PlayerColor, MaterialType, LocationType>

export const isPopcornMoveItemType = isMoveItemType<MaterialType>

export const isPopcornMoveItemsAtOnce = isMoveItemsAtOnce<PlayerColor, MaterialType, LocationType>

export const isPopcornMoveItemTypeAtOnce = isMoveItemTypeAtOnce<MaterialType>

export const isPopcornCustomMove = isCustomMove<CustomMoveType, PlayerColor, MaterialType, LocationType>

export const isPopcornCustomMoveType = <D>(type: CustomMoveType) => isCustomMoveType<CustomMoveType, D, PlayerColor, MaterialType, LocationType>(type)

export const isPopcornSelectItem = isSelectItem<PlayerColor, MaterialType, LocationType>

export const isPopcornSelectItemType = isSelectItemType<MaterialType>

export const isPopcornShuffleItemType = isShuffleItemType<MaterialType>

export const isPopcornCreateItem = isCreateItem<PlayerColor, MaterialType, LocationType>

export const isPopcornCreateItemType = isCreateItemType<MaterialType>

export const isPopcornDeleteItem = isDeleteItem<PlayerColor, MaterialType, LocationType>

export const isPopcornDeleteItemType = isDeleteItemType<MaterialType>

export const isPopcornDeleteItemsAtOnce = isDeleteItemsAtOnce<PlayerColor, MaterialType, LocationType>

export const isPopcornDeleteItemTypeAtOnce = isDeleteItemTypeAtOnce<MaterialType>
