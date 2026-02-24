import { faHandPointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Actions } from '@gamepark/popcorn/material/Actions/Actions'
import { ActionType } from '@gamepark/popcorn/material/Actions/ActionType'
import { isBuyTheaterTileCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { SeatsNumber, TheaterTile, TheaterTileId } from '@gamepark/popcorn/material/TheaterTile'
import { Memory } from '@gamepark/popcorn/Memory'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { ItemContext, ItemMenuButton, TokenDescription } from '@gamepark/react-game'
import { isSelectItemType, Location, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import React from 'react'
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
  transparency = true

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

  public canDrag(move: MaterialMove<PlayerColor, MaterialType, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): boolean {
    return super.canDrag(move, context) || (isBuyTheaterTileCustomMove(move) && move.data.boughtTileIndex === context.index)
  }

  public getMoveDropLocations(
    context: ItemContext<PlayerColor, MaterialType, LocationType>,
    move: MaterialMove<PlayerColor, MaterialType, LocationType>
  ): Location<PlayerColor, LocationType>[] {
    if (context.rules.game.rule?.id === RuleId.BuyingPhaseRule && isBuyTheaterTileCustomMove(move)) {
      const destination = {
        type: LocationType.TheaterTileSpotOnTopPlayerCinemaBoard,
        player: move.data.player,
        x: move.data.destinationSpot
      }
      return [destination]
    }
    return super.getMoveDropLocations(context, move)
  }

  public isMenuAlwaysVisible(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): boolean {
    if (context.player !== undefined) {
      if (context.rules.game.rule?.id === RuleId.ShowingsPhaseRule && context.rules.game.players.includes(context.player)) {
        const pendingActions = context.rules.remind<Actions[]>(Memory.PendingActions, context.player)
        if (pendingActions.length > 0 && pendingActions[0].type === ActionType.PickTheaterTileToActivate) {
          return item.location.player === context.player && !item.selected
        }
      }
    }
    return super.isMenuAlwaysVisible(item, context)
  }

  public getItemMenu(
    item: MaterialItem<PlayerColor, LocationType>,
    context: ItemContext<PlayerColor, MaterialType, LocationType>,
    legalMoves: MaterialMove<PlayerColor, MaterialType, LocationType>[]
  ): React.ReactNode {
    if (context.player !== undefined) {
      if (context.rules.game.rule?.id === RuleId.ShowingsPhaseRule && context.rules.game.players.includes(context.player)) {
        const pendingActions = context.rules.remind<Actions[]>(Memory.PendingActions, context.player)
        if (pendingActions.length > 0 && pendingActions[0].type === ActionType.PickTheaterTileToActivate) {
          const currentItemIndex = context.rules
            .material(MaterialType.TheaterTiles)
            .location(item.location.type)
            .player(item.location.player)
            .id(item.id)
            .getIndex()
          const selectCurrentTileLegalMove = legalMoves
            .filter(isSelectItemType<PlayerColor, MaterialType, LocationType>(MaterialType.TheaterTiles))
            .filter((move) => move.itemIndex === currentItemIndex)
          return selectCurrentTileLegalMove.length > 0 ? (
            <>
              {selectCurrentTileLegalMove.map((move) => (
                <ItemMenuButton
                  key={`theaterTile-${move.itemIndex}-selectMove`}
                  move={move}
                  x={-1.25}
                  y={this.height / 2}
                  //label={<Trans i18nKey="button.theaterTile.showingsPhase.activateTheater" />}
                  labelPosition="left"
                >
                  <FontAwesomeIcon icon={faHandPointer} size="lg" />
                </ItemMenuButton>
              ))}
              {this.getHelpButton(item, context, {
                x: 1.25,
                y: this.height / 2,
                labelPosition: 'right',
                label: ''
              })}
            </>
          ) : undefined
        }
      }
    }
    return super.getItemMenu(item, context, legalMoves)
  }
}

export const theaterTileDescription = new TheaterTileDescription()
