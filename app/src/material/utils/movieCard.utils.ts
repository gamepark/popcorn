import { MovieAction, MovieCard, MovieColor } from '@gamepark/popcorn/material/MovieCard'
import { SeatsNumber } from '@gamepark/popcorn/material/TheaterTile'
import get1MoneySymbol from '../../images/Symbols/Action1Money.png'
import get1PopcornSymbol from '../../images/Symbols/Action1Popcorn.png'
import get2MoneySymbol from '../../images/Symbols/Action2Money.png'
import get2PopcornSymbol from '../../images/Symbols/Action2Popcorn.png'
import get3MoneySymbol from '../../images/Symbols/Action3Money.png'
import drawGuestSymbol from '../../images/Symbols/ActionDrawGuest.png'
import exitGuestToBagSymbol from '../../images/Symbols/ActionExitZoneGuestToBag.png'
import guestInReserveSymbol from '../../images/Symbols/ActionPlaceGuestInReserve.png'
import blueMovieSymbol from '../../images/Symbols/BlueMovie.png'
import greenMovieSymbol from '../../images/Symbols/GreenMovie.png'
import get3PopcornSymbol from '../../images/Symbols/MovieAction3Popcorn.png'
import get4MoneySymbol from '../../images/Symbols/MovieAction4Money.png'
import get4PopcornSymbol from '../../images/Symbols/MovieAction4Popcorn.png'
import audienceTrackAdvanceSymbol from '../../images/Symbols/MovieActionAdvanceAudienceCube.png'
import blueAdvertisingGuestSymbol from '../../images/Symbols/MovieActionAdvertisingTokenBlueGuest.png'
import greenAdvertisingGuestSymbol from '../../images/Symbols/MovieActionAdvertisingTokenGreenGuest.png'
import redAdvertisingGuestSymbol from '../../images/Symbols/MovieActionAdvertisingTokenRedGuest.png'
import yellowAdvertisingGuestSymbol from '../../images/Symbols/MovieActionAdvertisingTokenYellowGuest.png'
import blueAnyGuestSymbol from '../../images/Symbols/MovieActionBlueAdvertisingTokenAnyGuest.png'
import blueWhiteGuestSymbol from '../../images/Symbols/MovieActionBlueAdvertisingTokenWhiteGuest.png'
import drawAwardCardsSymbol from '../../images/Symbols/MovieActionDrawAwardCard.png'
import greenAnyGuestSymbol from '../../images/Symbols/MovieActionGreenAdvertisingTokenAnyGuest.png'
import yellowWhiteGuestSymbol from '../../images/Symbols/MovieActionGreenAdvertisingTokenWhiteGuest.png'
import greenWhiteGuestSymbol from '../../images/Symbols/MovieActionGreenAdvertisingTokenWhiteGuest.png'
import redAnyGuestSymbol from '../../images/Symbols/MovieActionRedAdvertisingTokenAnyGuest.png'
import redWhiteGuestSymbol from '../../images/Symbols/MovieActionRedAdvertisingTokenWhiteGuest.png'
import yellowAnyGuestSymbol from '../../images/Symbols/MovieActionYellowAdvertisingTokenAnyGuest.png'
import redMovieSymbol from '../../images/Symbols/RedMovie.png'
import oneSeatMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionOneSeatTheater.png'
import threeSeatMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionThreeSeatTheater.png'
import twoSeatMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionTwoSeatTheater.png'
import yellowMovieSymbol from '../../images/Symbols/YellowMovie.png'

const movieActionSymbols: Record<
  Exclude<MovieAction, MovieAction.AdvertisingTokenOnWhiteGuestToBag | MovieAction.AdvertisingTokenOnAnyGuest>,
  string | undefined
> = {
  [MovieAction.AdvertisingTokenOnBlueGuest]: blueAdvertisingGuestSymbol,
  [MovieAction.AdvertisingTokenOnGreenGuest]: greenAdvertisingGuestSymbol,
  [MovieAction.AdvertisingTokenOnRedGuest]: redAdvertisingGuestSymbol,
  [MovieAction.AdvertisingTokenOnYellowGuest]: yellowAdvertisingGuestSymbol,
  [MovieAction.AudienceTrackAdvance]: audienceTrackAdvanceSymbol,
  [MovieAction.DrawAwardCard]: drawAwardCardsSymbol,
  [MovieAction.DrawGuestAndPlaceThem]: drawGuestSymbol,
  [MovieAction.Get1Money]: get1MoneySymbol,
  [MovieAction.Get2Money]: get2MoneySymbol,
  [MovieAction.Get3Money]: get3MoneySymbol,
  [MovieAction.Get4Money]: get4MoneySymbol,
  [MovieAction.Get1Popcorn]: get1PopcornSymbol,
  [MovieAction.Get2Popcorn]: get2PopcornSymbol,
  [MovieAction.Get3Popcorn]: get3PopcornSymbol,
  [MovieAction.Get4Popcorn]: get4PopcornSymbol,
  [MovieAction.None]: undefined,
  [MovieAction.PlaceExitZoneGuestInBag]: exitGuestToBagSymbol,
  [MovieAction.PlaceGuestInReserve]: guestInReserveSymbol
}

const anyGuestActionSymbols = {
  [MovieColor.Blue]: blueAnyGuestSymbol,
  [MovieColor.Green]: greenAnyGuestSymbol,
  [MovieColor.Red]: redAnyGuestSymbol,
  [MovieColor.Yellow]: yellowAnyGuestSymbol
}

const whiteGuestActionSymbols = {
  [MovieColor.Blue]: blueWhiteGuestSymbol,
  [MovieColor.Green]: greenWhiteGuestSymbol,
  [MovieColor.Red]: redWhiteGuestSymbol,
  [MovieColor.Yellow]: yellowWhiteGuestSymbol
}

export const movieTitleDefaults = {
  // First movies
  [MovieCard.FirstMovieBlueRosebud]: 'Rosebud',
  [MovieCard.FirstMovieGreenEndOfTheWorld]: 'End of the World',
  [MovieCard.FirstMovieRedItSMyWar]: "It's My War",
  [MovieCard.FirstMovieYellowModernLove]: 'Modern Love',
  // Blue movies
  [MovieCard.BlueHenrietta]: 'Henrietta',
  [MovieCard.BlueMe]: 'Me',
  [MovieCard.Blue5678]: '5, 6, 7, 8…',
  [MovieCard.BlueJoeJoe]: 'Joe Joe',
  [MovieCard.BlueTheNeuroticDetective]: 'The Neurotic Detective',
  [MovieCard.BlueObjection]: 'Objection',
  [MovieCard.BlueBigSpenders]: 'Big Spenders',
  [MovieCard.BlueControlZ]: 'Control Z',
  [MovieCard.BlueRohanAndJaya]: 'Rohan and Jaya',
  [MovieCard.BlueAdrian]: 'Adrian',
  [MovieCard.BlueTheGodmother]: 'The Godmother',
  // Green movies
  [MovieCard.GreenFrankAndEinstein]: 'Frank & Einstein',
  [MovieCard.GreenTheBarbarian]: 'The Barbarian',
  [MovieCard.GreenRevengeOfTheDiplodocus]: 'Revenge of The Diplodocus',
  [MovieCard.GreenMountainHotel]: 'Mountain Hotel',
  [MovieCard.GreenBadman]: 'Badman',
  [MovieCard.GreenKingOfTokyo]: 'King of Tokyo',
  [MovieCard.GreenAMonsterInTheShip]: 'A Monster In The Ship',
  [MovieCard.GreenWitchesVsCheerleaders]: 'Witches vs Cheerleaders',
  [MovieCard.GreenAbracadab]: "Abracadab'",
  [MovieCard.GreenEliminator4]: 'Eliminator 4',
  [MovieCard.GreenIntergalactic]: 'Intergalactic',
  // Red movies
  [MovieCard.RedTheManWithTheMoney]: 'The Man With The Money',
  [MovieCard.RedBarbacus]: 'Barbacus',
  [MovieCard.RedTheFuryOfTheSerpent]: 'The Fury of The Serpent',
  [MovieCard.RedTheCursedPegleg]: 'The Cursed Pegleg',
  [MovieCard.RedTheWorldAfter]: 'The World After',
  [MovieCard.RedTheVolcano]: 'The Volcano',
  [MovieCard.RedUnknownDestination]: 'Unknown Destination',
  [MovieCard.RedGentlemanDriver]: 'Gentleman Driver',
  [MovieCard.RedFinalLasso]: 'Final Lasso',
  [MovieCard.RedElitePilot]: 'Elite Pilot',
  [MovieCard.RedVroom8]: 'Vroom 8',
  // Yellow movies
  [MovieCard.YellowMisterGiggles]: 'Mister Giggles',
  [MovieCard.YellowMelancholyCharlie]: 'Melancholy Charlie',
  [MovieCard.YellowKangarooMan]: 'Kangaroo Man',
  [MovieCard.YellowTheKids]: 'The Kids',
  [MovieCard.YellowWhatABunchOfIdiots3]: 'What a Bunch of Idiots 3',
  [MovieCard.YellowSchoolOfZombies]: 'School of Zombies',
  [MovieCard.YellowDoReMiFaSo]: 'Do Re Mi Fa So',
  [MovieCard.YellowFrenchKiss]: 'French Kiss',
  [MovieCard.Yellow28InTheFamily]: '28 in the Family',
  [MovieCard.YellowTheAdventuresOfPewPew]: 'The Adventures of Pew Pew',
  [MovieCard.YellowTheFirePrincess]: 'The Fire Princess'
}

export const getMovieActionSymbol = (action: MovieAction, movieColor: MovieColor): string | undefined => {
  switch (action) {
    case MovieAction.AdvertisingTokenOnAnyGuest:
      return anyGuestActionSymbols[movieColor]
    case MovieAction.AdvertisingTokenOnWhiteGuestToBag:
      return whiteGuestActionSymbols[movieColor]
    default:
      return movieActionSymbols[action]
  }
}

export const colorSymbols = {
  [MovieColor.Blue]: blueMovieSymbol,
  [MovieColor.Green]: greenMovieSymbol,
  [MovieColor.Red]: redMovieSymbol,
  [MovieColor.Yellow]: yellowMovieSymbol
}

export const seatsNumberSymbols = {
  [SeatsNumber.One]: oneSeatMovieShowingBonusSymbol,
  [SeatsNumber.Two]: twoSeatMovieShowingBonusSymbol,
  [SeatsNumber.Three]: threeSeatMovieShowingBonusSymbol
}
