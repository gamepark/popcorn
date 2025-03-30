import { AwardCard } from '@gamepark/game-template/material/AwardCard'
import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { CardDescription } from '@gamepark/react-game'
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
}

export const awardCardDescription = new AwardCardDescription()
