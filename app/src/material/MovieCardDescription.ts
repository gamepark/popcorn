import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { MovieCard, MovieCardId, MovieCardType } from '@gamepark/game-template/material/MovieCard'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { CardDescription } from '@gamepark/react-game'
import blue5678 from '../images/Cards/Movies/en/Blue5678.jpg'
import blueAdrian from '../images/Cards/Movies/en/BlueAdrian.jpg'
import blueControlZ from '../images/Cards/Movies/en/BlueControlZ.jpg'
import blueJoeJoe from '../images/Cards/Movies/en/BlueJoeJoe.jpg'
import blueTheGodmother from '../images/Cards/Movies/en/BlueTheGodmother.jpg'
import blueBigSpenders from '../images/Cards/Movies/en/BlueBigSpenders.jpg'
import blueTheNeuroticDetective from '../images/Cards/Movies/en/BlueTheNeuroticDetective.jpg'
import blueMe from '../images/Cards/Movies/en/BlueMe.jpg'
import blueObjection from '../images/Cards/Movies/en/BlueObjection.jpg'
import blueHenrietta from '../images/Cards/Movies/en/BlueHenrietta.jpg'
import blueRohanAndJaya from '../images/Cards/Movies/en/BlueRohanAndJaya.jpg'
import finalShowing from '../images/Cards/Movies/en/FinalShowing.jpg'
import firstMovieBack from '../images/Cards/Movies/en/FirstMovieBack.jpg'
import firstMovieBlueRosebud from '../images/Cards/Movies/en/FirstMovieBlueRosebud.jpg'
import firstMovieGreenEndOfTheWorld from '../images/Cards/Movies/en/FirstMovieGreenEndOfTheWorld.jpg'
import firstMovieRedItSMyWar from '../images/Cards/Movies/en/FirstMovieRedItSMyWar.jpg'
import firstMovieYellowModernLove from '../images/Cards/Movies/en/FirstMovieYellowModernLove.jpg'
import greenAbracadab from '../images/Cards/Movies/en/GreenAbracadab.jpg'
import greenBadMan from '../images/Cards/Movies/en/GreenBadman.jpg'
import greenEliminator4 from '../images/Cards/Movies/en/GreenEliminator4.jpg'
import greenFrankAndEinstein from '../images/Cards/Movies/en/GreenFrankAndEinstein.jpg'
import greenIntergalactic from '../images/Cards/Movies/en/GreenIntergalactic.jpg'
import greenKingOfTokyo from '../images/Cards/Movies/en/GreenKingOfTokyo.jpg'
import greenRevengeOfTheDiplodocus from '../images/Cards/Movies/en/GreenRevengeOfTheDiplodocus.jpg'
import greenTheBarbarian from '../images/Cards/Movies/en/GreenTheBarbarian.jpg'
import greenMountainHotel from '../images/Cards/Movies/en/GreenMountainHotel.jpg'
import greenAMonsterInTheShip from '../images/Cards/Movies/en/GreenAMonsterInTheShip.jpg'
import greenWitchesVsCheerleaders from '../images/Cards/Movies/en/GreenWitchesVsCheerleaders.jpg'
import movieBack from '../images/Cards/Movies/en/MovieBack.jpg'
import redBarbacus from '../images/Cards/Movies/en/RedBarbacus.jpg'
import redUnknownDestination from '../images/Cards/Movies/en/RedUnknownDestination.jpg'
import redGentlemanDriver from '../images/Cards/Movies/en/RedGentlemanDriver.jpg'
import redTheFuryOfTheSerpent from '../images/Cards/Movies/en/RedTheFuryOfTheSerpent.jpg'
import redTheCursedPegleg from '../images/Cards/Movies/en/RedTheCursedPegleg.jpg'
import redFinalLasso from '../images/Cards/Movies/en/RedFinalLasso.jpg'
import redElitePilot from '../images/Cards/Movies/en/RedElitePilot.jpg'
import redTheWorldAfter from '../images/Cards/Movies/en/RedTheWorldAfter.jpg'
import redTheVolcano from '../images/Cards/Movies/en/RedTheVolcano.jpg'
import redTheManWithTheMoney from '../images/Cards/Movies/en/RedTheManWithTheMoney.jpg'
import redVroom8 from '../images/Cards/Movies/en/RedVroom8.jpg'
import yellow28InTheFamily from '../images/Cards/Movies/en/Yellow28InTheFamily.jpg'
import yellowMelancholyCharlie from '../images/Cards/Movies/en/YellowMelancholyCharlie.jpg'
import yellowDoRemiFaSo from '../images/Cards/Movies/en/YellowDoReMiFaSo.jpg'
import yellowFrenchKiss from '../images/Cards/Movies/en/YellowFrenchKiss.jpg'
import yellowKangarooMan from '../images/Cards/Movies/en/YellowKangarooMan.jpg'
import yellowTheFirePrincess from '../images/Cards/Movies/en/YellowTheFirePrincess.jpg'
import yellowSchoolOfZombies from '../images/Cards/Movies/en/YellowSchoolOfZombies.jpg'
import yellowTheAdventuresOfPewPew from '../images/Cards/Movies/en/YellowTheAdventuresOfPewPew.jpg'
import yellowWhatABunchOfIdiots3 from '../images/Cards/Movies/en/YellowWhatABunchOfIdiots3.jpg'
import yellowMisterGiggles from '../images/Cards/Movies/en/YellowMisterGiggles.jpg'
import yellowTheKids from '../images/Cards/Movies/en/YellowTheKids.jpg'

export class MovieCardDescription extends CardDescription<PlayerColor, MaterialType, LocationType, MovieCardId> {
  width = 7
  height = 7

  images = {
    [MovieCard.FirstMovieBlueRosebud]: firstMovieBlueRosebud,
    [MovieCard.FirstMovieGreenEndOfTheWorld]: firstMovieGreenEndOfTheWorld,
    [MovieCard.FirstMovieRedItSMyWar]: firstMovieRedItSMyWar,
    [MovieCard.FirstMovieYellowModernLove]: firstMovieYellowModernLove,
    [MovieCard.BlueHenrietta]: blueHenrietta,
    [MovieCard.BlueMe]: blueMe,
    [MovieCard.Blue5678]: blue5678,
    [MovieCard.BlueJoeJoe]: blueJoeJoe,
    [MovieCard.BlueTheNeuroticDetective]: blueTheNeuroticDetective,
    [MovieCard.BlueObjection]: blueObjection,
    [MovieCard.BlueBigSpenders]: blueBigSpenders,
    [MovieCard.BlueControlZ]: blueControlZ,
    [MovieCard.BlueRohanAndJaya]: blueRohanAndJaya,
    [MovieCard.BlueAdrian]: blueAdrian,
    [MovieCard.BlueTheGodmother]: blueTheGodmother,
    [MovieCard.GreenFrankAndEinstein]: greenFrankAndEinstein,
    [MovieCard.GreenTheBarbarian]: greenTheBarbarian,
    [MovieCard.GreenRevengeOfTheDiplodocus]: greenRevengeOfTheDiplodocus,
    [MovieCard.GreenMountainHotel]: greenMountainHotel,
    [MovieCard.GreenBadman]: greenBadMan,
    [MovieCard.GreenKingOfTokyo]: greenKingOfTokyo,
    [MovieCard.GreenAMonsterInTheShip]: greenAMonsterInTheShip,
    [MovieCard.GreenWitchesVsCheerleaders]: greenWitchesVsCheerleaders,
    [MovieCard.GreenAbracadab]: greenAbracadab,
    [MovieCard.GreenEliminator4]: greenEliminator4,
    [MovieCard.GreenIntergalactic]: greenIntergalactic,
    [MovieCard.RedTheManWithTheMoney]: redTheManWithTheMoney,
    [MovieCard.RedBarbacus]: redBarbacus,
    [MovieCard.RedTheFuryOfTheSerpent]: redTheFuryOfTheSerpent,
    [MovieCard.RedTheCursedPegleg]: redTheCursedPegleg,
    [MovieCard.RedTheWorkdAfter]: redTheWorldAfter,
    [MovieCard.RedTheVolcano]: redTheVolcano,
    [MovieCard.RedUnknownDestination]: redUnknownDestination,
    [MovieCard.RedGentlemanDriver]: redGentlemanDriver,
    [MovieCard.RedFinalLasso]: redFinalLasso,
    [MovieCard.RedElitePilot]: redElitePilot,
    [MovieCard.RedVroom8]: redVroom8,
    [MovieCard.YellowMisterGiggles]: yellowMisterGiggles,
    [MovieCard.YellowMelancholyCharlie]: yellowMelancholyCharlie,
    [MovieCard.YellowKangarooMan]: yellowKangarooMan,
    [MovieCard.YellowTheKids]: yellowTheKids,
    [MovieCard.YellowWhatABunchOfIdiots3]: yellowWhatABunchOfIdiots3,
    [MovieCard.YellowSchoolOfZombies]: yellowSchoolOfZombies,
    [MovieCard.YellowDoReMiFaSo]: yellowDoRemiFaSo,
    [MovieCard.YellowFrenchKiss]: yellowFrenchKiss,
    [MovieCard.Yellow28InTheFamily]: yellow28InTheFamily,
    [MovieCard.YellowTheAdventuresOfPewPew]: yellowTheAdventuresOfPewPew,
    [MovieCard.YellowTheFirePrincess]: yellowTheFirePrincess,
    [MovieCard.FinalShowing]: finalShowing
  }

  backImages = {
    [MovieCardType.FirstMovie]: firstMovieBack,
    [MovieCardType.Movie]: movieBack
  }
}

export const movieCardDescription = new MovieCardDescription()
