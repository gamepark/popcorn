import { GuestPawn } from '@gamepark/game-template/material/GuestPawn'
import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import blueGuestPawn from '../images/GuestPawns/BlueGuestPawn.png'
import greenGuestPawn from '../images/GuestPawns/GreenGuestPawn.png'
import redGuestPawn from '../images/GuestPawns/RedGuestPawn.png'
import whiteGuestPawn from '../images/GuestPawns/WhiteGuestPawn.png'
import yellowGuestPawn from '../images/GuestPawns/YellowGuestPawn.png'

class GuestPawnDescription extends TokenDescription<PlayerColor, MaterialType, LocationType, GuestPawn> {
  width = 1.8
  height = 1.8

  images = {
    [GuestPawn.Blue]: blueGuestPawn,
    [GuestPawn.Green]: greenGuestPawn,
    [GuestPawn.Red]: redGuestPawn,
    [GuestPawn.White]: whiteGuestPawn,
    [GuestPawn.Yellow]: yellowGuestPawn
  }
}

export const guestPawnDescription = new GuestPawnDescription()
