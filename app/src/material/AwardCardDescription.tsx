import { faHandPointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AwardCard } from '@gamepark/popcorn/material/AwardCard'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { CardDescription, ItemContext, ItemMenuButton, MaterialContext } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import React from 'react'
import { Trans } from 'react-i18next'
import audienceGreaterThanOrEqualToSix from '../images/Cards/Awards/AudienceGreaterThanOrEqualTo6.jpg'
import awardBack from '../images/Cards/Awards/AwardBack.jpg'
import blueYellowGuestPair from '../images/Cards/Awards/BlueGreenGuestPair.jpg'
import blueGreenGuestPair from '../images/Cards/Awards/BlueGreenGuestPair.jpg'
import blueGreenMoviePair from '../images/Cards/Awards/BlueGreenMoviePair.jpg'
import blueRedMoviePair from '../images/Cards/Awards/BlueRedMoviePair.jpg'
import blueRedSeatPair from '../images/Cards/Awards/BlueRedSeatPair.jpg'
import blueTwoSeatsGuestsMoviesSet from '../images/Cards/Awards/BlueTwoSeatsGuestMoviesSet.jpg'
import blueYellowSeatPair from '../images/Cards/Awards/BlueYellowSeatPair.jpg'
import fourMovieSameColorSet from '../images/Cards/Awards/FourMovieSameColorSet.jpg'
import fourOfAKindMovie from '../images/Cards/Awards/FourOfAKindMovie.jpg'
import fourOfAKindSeat from '../images/Cards/Awards/FourOfAKindSeat.jpg'
import greenRedGuestPair from '../images/Cards/Awards/GreenRedGuestPair.jpg'
import greenRedSeatPair from '../images/Cards/Awards/GreenRedSeatPair.jpg'
import greenTwoSeatsGuestsMoviesSet from '../images/Cards/Awards/GreenTwoSeatsGuestsMoviesSet.jpg'
import greenYellowMoviePair from '../images/Cards/Awards/GreenYellowMoviePair.jpg'
import greenYellowSeatPair from '../images/Cards/Awards/GreenYellowSeatPair.jpg'
import guestNumber from '../images/Cards/Awards/GuestNumber.jpg'
import moviePrice0Or1 from '../images/Cards/Awards/MoviePrice0Or1.jpg'
import moviePrice4Or5 from '../images/Cards/Awards/MoviePrice4Or5.jpg'
import redTwoSeatsGuestsMoviesSet from '../images/Cards/Awards/RedTwoSeatsGuestsMoviesSet.jpg'
import redYellowGuestPair from '../images/Cards/Awards/RedYellowGuestPair.jpg'
import redYellowMoviePair from '../images/Cards/Awards/RedYellowMoviePair.jpg'
import threeSeatTheater from '../images/Cards/Awards/ThreeSeatTheater.jpg'
import twoFourOfAKindGuest from '../images/Cards/Awards/TwoFourOfAKindGuest.jpg'
import whiteGuestCount from '../images/Cards/Awards/WhiteGuestCount.jpg'
import yellowTwoSeatsGuestsMoviesSet from '../images/Cards/Awards/YellowTwoSeatsGuestsMoviesSet.jpg'

class AwardCardDescription extends CardDescription<PlayerColor, MaterialType, LocationType, AwardCard> {
  height = 4.5
  width = 6.3

  images = {
    [AwardCard.BlueRedMoviePair]: blueRedMoviePair,
    [AwardCard.BlueGreenMoviePair]: blueGreenMoviePair,
    [AwardCard.GreenYellowMoviePair]: greenYellowMoviePair,
    [AwardCard.RedYellowMoviePair]: redYellowMoviePair,
    [AwardCard.FourOfAKindMovie]: fourOfAKindMovie,
    [AwardCard.GreenRedGuestPair]: greenRedGuestPair,
    [AwardCard.BlueYellowGuestPair]: blueYellowGuestPair,
    [AwardCard.BlueGreenGuestPair]: blueGreenGuestPair,
    [AwardCard.RedYellowGuestPair]: redYellowGuestPair,
    [AwardCard.TwoFourOfAKindGuest]: twoFourOfAKindGuest,
    [AwardCard.GuestNumber]: guestNumber,
    [AwardCard.MoviePrice0Or1]: moviePrice0Or1,
    [AwardCard.MoviePrice4Or5]: moviePrice4Or5,
    [AwardCard.ThreeSeatTheater]: threeSeatTheater,
    [AwardCard.GreenYellowSeatPair]: greenYellowSeatPair,
    [AwardCard.GreenRedSeatPair]: greenRedSeatPair,
    [AwardCard.BlueRedSeatPair]: blueRedSeatPair,
    [AwardCard.BlueYellowSeatPair]: blueYellowSeatPair,
    [AwardCard.FourOfAKindSeat]: fourOfAKindSeat,
    [AwardCard.AudienceGreaterThanOrEqualToSix]: audienceGreaterThanOrEqualToSix,
    [AwardCard.WhiteGuestCount]: whiteGuestCount,
    [AwardCard.BlueTwoSeatsGuestsMoviesSet]: blueTwoSeatsGuestsMoviesSet,
    [AwardCard.GreenTwoSeatsGuestsMoviesSet]: greenTwoSeatsGuestsMoviesSet,
    [AwardCard.RedTwoSeatsGuestsMoviesSet]: redTwoSeatsGuestsMoviesSet,
    [AwardCard.YellowTwoSeatsGuestsMoviesSet]: yellowTwoSeatsGuestsMoviesSet,
    [AwardCard.FourMovieSameColorSet]: fourMovieSameColorSet
  }
  backImage = awardBack

  public getItemMenu(
    item: MaterialItem<PlayerColor, LocationType, AwardCard>,
    context: ItemContext<PlayerColor, MaterialType, LocationType>,
    legalMoves: MaterialMove<PlayerColor, MaterialType, LocationType>[]
  ): React.ReactNode {
    if (
      context.rules.game.rule?.id === RuleId.DealAndDiscardAwardCards &&
      item.location.type === LocationType.PlayerAwardCardHand &&
      context.player === item.location.player
    ) {
      return this.getItemMenuForDealAndDiscardRule(item, context, legalMoves)
    }
    return super.getItemMenu(item, context, legalMoves)
  }

  public isFlippedInDialog(item: Partial<MaterialItem<PlayerColor, LocationType>>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): boolean {
    return super.isFlippedInDialog(item, context)
  }

  private getItemMenuForDealAndDiscardRule(
    item: MaterialItem<PlayerColor, LocationType, AwardCard>,
    context: ItemContext,
    legalMoves: MaterialMove<PlayerColor, MaterialType, LocationType>[]
  ): React.ReactNode {
    const cardIndex = context.rules.material(MaterialType.AwardCards).id<AwardCard>(item.id).getIndex()
    const movesForCard = legalMoves
      .filter(isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.AwardCards))
      .filter((move) => move.itemIndex === cardIndex)
    return movesForCard.length > 0 ? (
      <>
        {movesForCard.map((move, index) => (
          <ItemMenuButton key={`awardCard-discard-${index}`} move={move} label={<Trans i18nKey="awardCard.itemMenu.discard" />} angle={0} radius={1.25}>
            <FontAwesomeIcon icon={faHandPointer} size="lg" />
          </ItemMenuButton>
        ))}
        {this.getHelpButton(item, context, {
          angle: 0,
          radius: -1.25
        })}
      </>
    ) : undefined
  }
}

export const awardCardDescription = new AwardCardDescription()
