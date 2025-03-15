import { AwardCard } from '@gamepark/game-template/material/AwardCard'
import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { CardDescription } from '@gamepark/react-game'
import blueRedMoviePair from '../images/Cards/Awards/BlueRedMoviePair.jpeg'
import blueGreenMoviePair from '../images/Cards/Awards/BlueGreenMoviePair.jpeg'
import greenYellowMoviePair from '../images/Cards/Awards/GreenYellowMoviePair.jpeg'
import redYellowMoviePair from '../images/Cards/Awards/RedYellowMoviePair.jpeg'
import fourOfAKindMovie from '../images/Cards/Awards/FourOfAKindMovie.jpeg'
import greenRedGuestPair from '../images/Cards/Awards/GreenRedGuestPair.jpeg'
import blueYellowGuestPair from '../images/Cards/Awards/BlueGreenGuestPair.jpeg'
import blueGreenGuestPair from '../images/Cards/Awards/BlueGreenGuestPair.jpeg'
import redYellowGuestPair from '../images/Cards/Awards/RedYellowGuestPair.jpeg'
import twoFourOfAKindGuest from '../images/Cards/Awards/TwoFourOfAKindGuest.jpeg'
import guestNumber from '../images/Cards/Awards/GuestNumber.jpeg'
import moviePrice0Or1 from '../images/Cards/Awards/MoviePrice0Or1.jpeg'
import moviePrice4Or5 from '../images/Cards/Awards/MoviePrice4Or5.jpeg'
import threeSeatTheater from '../images/Cards/Awards/ThreeSeatTheater.jpeg'
import greenYellowSeatPair from '../images/Cards/Awards/GreenYellowSeatPair.jpeg'
import greenRedSeatPair from '../images/Cards/Awards/GreenRedSeatPair.jpeg'
import blueRedSeatPair from '../images/Cards/Awards/BlueRedSeatPair.jpeg'
import blueYellowSeatPair from '../images/Cards/Awards/BlueYellowSeatPair.jpeg'
import fourOfAKindSeat from '../images/Cards/Awards/FourOfAKindSeat.jpeg'
import audienceGreaterThanOrEqualToSix from '../images/Cards/Awards/AudienceGreaterThanOrEqualTo6.jpeg'
import whiteGuestCount from '../images/Cards/Awards/WhiteGuestCount.jpeg'
import blueTwoSeatsGuestsMoviesSet from '../images/Cards/Awards/BlueTwoSeatsGuestMoviesSet.jpeg'
import greenTwoSeatsGuestsMoviesSet from '../images/Cards/Awards/GreenTwoSeatsGuestsMoviesSet.jpeg'
import redTwoSeatsGuestsMoviesSet from '../images/Cards/Awards/RedTwoSeatsGuestsMoviesSet.jpeg'
import yellowTwoSeatsGuestsMoviesSet from '../images/Cards/Awards/YellowTwoSeatsGuestsMoviesSet.jpeg'
import fourMovieSameColorSet from '../images/Cards/Awards/FourMovieSameColorSet.jpeg'
import awardBack from '../images/Cards/Awards/AwardBack.jpeg'

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
