import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { SeatsNumber, TheaterTile, TheaterTileId } from '@gamepark/game-template/material/TheaterTile'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'
import oneSeat1Front from '../images/Tiles/TheaterTiles/1Seat1Front.png'
import oneSeat2Front from '../images/Tiles/TheaterTiles/1Seat2Front.png'
import oneSeat3Front from '../images/Tiles/TheaterTiles/1Seat3Front.png'
import oneSeat4Front from '../images/Tiles/TheaterTiles/1Seat4Front.png'
import oneSeat5Front from '../images/Tiles/TheaterTiles/1Seat5Front.png'
import oneSeat6Front from '../images/Tiles/TheaterTiles/1Seat6Front.png'
import oneSeat7Front from '../images/Tiles/TheaterTiles/1Seat7Front.png'
import oneSeat8Front from '../images/Tiles/TheaterTiles/1Seat8Front.png'
import oneSeatBack from '../images/Tiles/TheaterTiles/1SeatBack.png'
import twoSeat10Front from '../images/Tiles/TheaterTiles/2Seat10Front.png'
import twoSeat11Front from '../images/Tiles/TheaterTiles/2Seat11Front.png'
import twoSeat12Front from '../images/Tiles/TheaterTiles/2Seat12Front.png'
import twoSeat1Front from '../images/Tiles/TheaterTiles/2Seat1Front.png'
import twoSeat2Front from '../images/Tiles/TheaterTiles/2Seat2Front.png'
import twoSeat3Front from '../images/Tiles/TheaterTiles/2Seat3Front.png'
import twoSeat4Front from '../images/Tiles/TheaterTiles/2Seat4Front.png'
import twoSeat5Front from '../images/Tiles/TheaterTiles/2Seat5Front.png'
import twoSeat6Front from '../images/Tiles/TheaterTiles/2Seat6Front.png'
import twoSeat7Front from '../images/Tiles/TheaterTiles/2Seat7Front.png'
import twoSeat8Front from '../images/Tiles/TheaterTiles/2Seat8Front.png'
import twoSeat9Front from '../images/Tiles/TheaterTiles/2Seat9Front.png'
import twoSeatBack from '../images/Tiles/TheaterTiles/2SeatBack.png'
import threeSeat1Front from '../images/Tiles/TheaterTiles/3Seat1Front.png'
import threeSeat2Front from '../images/Tiles/TheaterTiles/3Seat2Front.png'
import threeSeat3Front from '../images/Tiles/TheaterTiles/3Seat3Front.png'
import threeSeat4Front from '../images/Tiles/TheaterTiles/3Seat4Front.png'
import threeSeat5Front from '../images/Tiles/TheaterTiles/3Seat5Front.png'
import threeSeat6Front from '../images/Tiles/TheaterTiles/3Seat6Front.png'
import threeSeat7Front from '../images/Tiles/TheaterTiles/3Seat7Front.png'
import threeSeat8Front from '../images/Tiles/TheaterTiles/3Seat8Front.png'
import threeSeatBack from '../images/Tiles/TheaterTiles/3SeatBack.png'
import emptyTile from '../images/Tiles/TheaterTiles/EmptyTile.png'

class TheaterTileDescription extends TokenDescription<PlayerColor, MaterialType, LocationType, TheaterTileId> {
  width = 4.3
  height = 4.3
  thickness = 0.2

  images = {
    [TheaterTile.DefaultOneSeatTile]: emptyTile,
    [TheaterTile.DefaultTwoSeatTile]: emptyTile,
    [TheaterTile.OneSeat2Money]: oneSeat1Front,
    [TheaterTile.OneSeat1Popcorn]: oneSeat2Front,
    [TheaterTile.OneSeatRed2Popcorn]: oneSeat3Front,
    [TheaterTile.OneSeatYellowDrawGuest]: oneSeat4Front,
    [TheaterTile.OneSeatBlue3Money]: oneSeat5Front,
    [TheaterTile.OneSeatGreenReserve]: oneSeat6Front,
    [TheaterTile.OneSeat3Money]: oneSeat7Front,
    [TheaterTile.OneSeat1Money]: oneSeat8Front,
    [TheaterTile.TwoSeatGreen2MoneyMovieAction]: twoSeat1Front,
    [TheaterTile.TwoSeatYellow2PopcornMovieAction]: twoSeat2Front,
    [TheaterTile.TwoSeatBlue2PopcornMovieAction]: twoSeat3Front,
    [TheaterTile.TwoSeatRed2MoneyMovieAction]: twoSeat4Front,
    [TheaterTile.TwoSeatBlue1Popcorn2Money]: twoSeat5Front,
    [TheaterTile.TwoSeatRedBagMovieAction]: twoSeat6Front,
    [TheaterTile.TwoSeatYellowReserve2Money]: twoSeat7Front,
    [TheaterTile.TwoSeatGreenDrawMovieAction]: twoSeat8Front,
    [TheaterTile.TwoSeatYellowYellow]: twoSeat9Front,
    [TheaterTile.TwoSeatRedRed]: twoSeat10Front,
    [TheaterTile.TwoSeatBlueGreen]: twoSeat11Front,
    [TheaterTile.TwoSeatGreenBlue]: twoSeat12Front,
    [TheaterTile.ThreeSeatBlueGreyGrey]: threeSeat1Front,
    [TheaterTile.ThreeSeatGreenGreyGrey]: threeSeat2Front,
    [TheaterTile.ThreeSeatRedGreyGrey]: threeSeat3Front,
    [TheaterTile.ThreeSeatYellowGreyGrey]: threeSeat4Front,
    [TheaterTile.ThreeSeatYellowExitRedGrey]: threeSeat5Front,
    [TheaterTile.ThreeSeatYellow3MoneyRedGrey]: threeSeat6Front,
    [TheaterTile.ThreeSeatBlueBlueGrey]: threeSeat7Front,
    [TheaterTile.ThreeSeatGreenGreenGrey]: threeSeat8Front
  }

  backImages = {
    [SeatsNumber.One]: oneSeatBack,
    [SeatsNumber.Two]: twoSeatBack,
    [SeatsNumber.Three]: threeSeatBack,
    [SeatsNumber.Default]: emptyTile
  }
}

export const theaterTileDescription = new TheaterTileDescription()
