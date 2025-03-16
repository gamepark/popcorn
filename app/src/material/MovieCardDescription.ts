import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { MovieCard } from '@gamepark/game-template/material/MovieCard'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { CardDescription } from '@gamepark/react-game'
import firstMovieBlueRosebud from '../images/Cards/Movies/FirstMovieBlueRosebud.jpeg'
import firstMovieGreenLaFinDuMonde from '../images/Cards/Movies/FirstMovieGreenLaFinDuMonde.jpeg'
import firstMovieRedCEstMaGuerre from '../images/Cards/Movies/FirstMovieRedCEstMaGuerre.jpeg'
import firstMovieYellowModernLove from '../images/Cards/Movies/FirstMovieYellowModernLove.jpeg'
import blueMoi from '../images/Cards/Movies/BlueMoi.jpeg'
import bluePoupoule from '../images/Cards/Movies/BluePoupoule.jpeg'
import blue1234 from '../images/Cards/Movies/Blue1234.jpeg'
import blueJoeJoe from '../images/Cards/Movies/BlueJoeJoe.jpeg'
import blueLesNevrosesDuDetective from '../images/Cards/Movies/BlueLesNevrosesDuDetective.jpeg'
import blueObjections from '../images/Cards/Movies/BlueObjections.jpeg'
import blueLesFlambeurs from '../images/Cards/Movies/BlueLesFlambeurs.jpeg'
import blueControlZ from '../images/Cards/Movies/BlueControlZ.jpeg'
import blueRohanAndJaya from '../images/Cards/Movies/BlueRohanAndJaya.jpeg'
import blueAdrian from '../images/Cards/Movies/BlueAdrian.jpeg'
import blueLaMarraine from '../images/Cards/Movies/BlueLaMarraine.jpeg'
import greenFrankAndEinstein from '../images/Cards/Movies/GreenFrankAndEinstein.jpeg'
import greenLeBarbare from '../images/Cards/Movies/GreenLeBarbare.jpeg'
import greenLaRevancheDesDiplodocus from '../images/Cards/Movies/GreenLaRevancheDesDiplodocus.jpeg'
import greenLHotelDeLaMontagne from '../images/Cards/Movies/GreenLHotelDeLaMontagne.jpeg'
import greenBadMan from '../images/Cards/Movies/GreenBadman.jpeg'
import greenKingOfTokyo from '../images/Cards/Movies/GreenKingOfTokyo.jpeg'
import greenUnMonstreDansLaNavette from '../images/Cards/Movies/GreenUnMonstreDansLaNavette.jpeg'
import greenWitchesVsCheerleaders from '../images/Cards/Movies/GreenWitchesVsCheerleaders.jpeg'
import greenAbracadab from '../images/Cards/Movies/GreenAbracadab.jpeg'
import greenEliminator4 from '../images/Cards/Movies/GreenEliminator4.jpeg'
import greenIntergalactic from '../images/Cards/Movies/GreenIntergalactic.jpeg'
import redLHommeAvecDesDollars from '../images/Cards/Movies/RedLHommeAvecDesDollars.jpeg'
import redBarbacus from '../images/Cards/Movies/RedBarbacus.jpeg'
import redLaFureurDuSerpent from '../images/Cards/Movies/RedLaFureurDuSerpent.jpeg'
import redLaJambeDeBoisMaudite from '../images/Cards/Movies/RedLaJambeDeBoisMaudite.jpeg'
import redLeMondeDApres from '../images/Cards/Movies/RedLeMondeDApres.jpeg'
import redLeVolcan from '../images/Cards/Movies/RedLeVolcan.jpeg'
import redDestinationInconnue from '../images/Cards/Movies/RedDestinationInconnue.jpeg'
import redGentlemanDriver from '../images/Cards/Movies/RedGentlemanDriver.jpeg'
import redLassoFinal from '../images/Cards/Movies/RedLassoFinal.jpeg'
import redLEliteDesPilotes from '../images/Cards/Movies/RedLEliteDesPilotes.jpeg'
import redVroom8 from '../images/Cards/Movies/RedVroom8.jpeg'
import yellowMonsieurRigolo from '../images/Cards/Movies/YellowMonsieurRigolo.jpeg'
import yellowCharlieEtSesSoucis from '../images/Cards/Movies/YellowCharlieEtSesSoucis.jpeg'
import yellowKangarooMan from '../images/Cards/Movies/YellowKangarooMan.jpeg'
import yellowTheKids from '../images/Cards/Movies/YellowTheKids.jpeg'
import yellowMaisQuEstCeQuIlsSontDebiles3 from '../images/Cards/Movies/YellowMaisQuEstCeQuIlsSontDebiles3.jpeg'
import yellowLEcoleDesZombies from '../images/Cards/Movies/YellowLEcoleDesZombies.jpeg'
import yellowDoRemiFaSol from '../images/Cards/Movies/YellowDoReMiFaSol.jpeg'
import yellowFrenchKiss from '../images/Cards/Movies/YellowFrenchKiss.jpeg'
import yellow28DansLaFamille from '../images/Cards/Movies/Yellow28DansLaFamille.jpeg'
import yellowLesAventuresDePiouPiou from '../images/Cards/Movies/YellowLesAventuresDePiouPiou.jpeg'
import yellowLaPrincessDeFeu from '../images/Cards/Movies/YellowLaPrincesseDeFeu.jpeg'
import finalShowing from '../images/Cards/Movies/FinalShowing.jpeg'
import firstMovieBack from '../images/Cards/Movies/FirstMovieBack.jpeg'
import movieBack from '../images/Cards/Movies/MovieBack.jpeg'

class MovieCardDescription extends CardDescription<PlayerColor, MaterialType, LocationType, MovieCard> {
  width = 7.0
  height = 7.0

  images = {
    [MovieCard.FirstMovieBlueRosebud]: firstMovieBlueRosebud,
    [MovieCard.FirstMovieGreenLaFinDuMonde]: firstMovieGreenLaFinDuMonde,
    [MovieCard.FirstMovieRedCEstMaGuerre]: firstMovieRedCEstMaGuerre,
    [MovieCard.FirstMovieYellowModernLove]: firstMovieYellowModernLove,
    [MovieCard.BluePoupoule]: bluePoupoule,
    [MovieCard.BlueMoi]: blueMoi,
    [MovieCard.Blue1234]: blue1234,
    [MovieCard.BlueJoeJoe]: blueJoeJoe,
    [MovieCard.BlueLesNevrosesDuDetective]: blueLesNevrosesDuDetective,
    [MovieCard.BlueObjections]: blueObjections,
    [MovieCard.BlueLesFlambeurs]: blueLesFlambeurs,
    [MovieCard.BlueControlZ]: blueControlZ,
    [MovieCard.BlueRohanAndJaya]: blueRohanAndJaya,
    [MovieCard.BlueAdrian]: blueAdrian,
    [MovieCard.BlueLaMarraine]: blueLaMarraine,
    [MovieCard.GreenFrankAndEinstein]: greenFrankAndEinstein,
    [MovieCard.GreenLeBarbare]: greenLeBarbare,
    [MovieCard.GreenLaRevancheDesDiplodocus]: greenLaRevancheDesDiplodocus,
    [MovieCard.GreenLHotelDeLaMontagne]: greenLHotelDeLaMontagne,
    [MovieCard.GreenBadMan]: greenBadMan,
    [MovieCard.GreenKingOfTokyo]: greenKingOfTokyo,
    [MovieCard.GreenUnMonstreDansLaNavette]: greenUnMonstreDansLaNavette,
    [MovieCard.GreenWitchesVsCheerleaders]: greenWitchesVsCheerleaders,
    [MovieCard.GreenAbracadab]: greenAbracadab,
    [MovieCard.GreenEliminator4]: greenEliminator4,
    [MovieCard.GreenIntergalactic]: greenIntergalactic,
    [MovieCard.RedLHommeAvecDesDollars]: redLHommeAvecDesDollars,
    [MovieCard.RedBarbacus]: redBarbacus,
    [MovieCard.RedLaFureurDuSerpent]: redLaFureurDuSerpent,
    [MovieCard.RedLaJambeDeBoisMaudite]: redLaJambeDeBoisMaudite,
    [MovieCard.RedLeMondeDApres]: redLeMondeDApres,
    [MovieCard.RedLeVolcan]: redLeVolcan,
    [MovieCard.RedDestinationInconnue]: redDestinationInconnue,
    [MovieCard.RedGentlemanDriver]: redGentlemanDriver,
    [MovieCard.RedLassoFinal]: redLassoFinal,
    [MovieCard.RedLEliteDesPilotes]: redLEliteDesPilotes,
    [MovieCard.RedVroom8]: redVroom8,
    [MovieCard.YellowMonsieurRigolo]: yellowMonsieurRigolo,
    [MovieCard.YellowCharlieEtSesSoucis]: yellowCharlieEtSesSoucis,
    [MovieCard.YellowKangarooMan]: yellowKangarooMan,
    [MovieCard.YellowTheKids]: yellowTheKids,
    [MovieCard.YellowMaisQuEstCeQuIlsSontDebiles3]: yellowMaisQuEstCeQuIlsSontDebiles3,
    [MovieCard.YellowLEcoleDesZombies]: yellowLEcoleDesZombies,
    [MovieCard.YellowDoReMiFaSol]: yellowDoRemiFaSol,
    [MovieCard.YellowFrenchKiss]: yellowFrenchKiss,
    [MovieCard.Yellow28DansLaFamille]: yellow28DansLaFamille,
    [MovieCard.YellowLesAventuresDePiouPiou]: yellowLesAventuresDePiouPiou,
    [MovieCard.YellowLaPrincessDeFeu]: yellowLaPrincessDeFeu,
    [MovieCard.FinalShowing]: finalShowing
  }

  backImages = {
    [MovieCard.FirstMovieBlueRosebud]: firstMovieBack,
    [MovieCard.FirstMovieGreenLaFinDuMonde]: firstMovieBack,
    [MovieCard.FirstMovieRedCEstMaGuerre]: firstMovieBack,
    [MovieCard.FirstMovieYellowModernLove]: firstMovieBack,
    [MovieCard.BluePoupoule]: movieBack,
    [MovieCard.BlueMoi]: movieBack,
    [MovieCard.Blue1234]: movieBack,
    [MovieCard.BlueJoeJoe]: movieBack,
    [MovieCard.BlueLesNevrosesDuDetective]: movieBack,
    [MovieCard.BlueObjections]: movieBack,
    [MovieCard.BlueLesFlambeurs]: movieBack,
    [MovieCard.BlueControlZ]: movieBack,
    [MovieCard.BlueRohanAndJaya]: movieBack,
    [MovieCard.BlueAdrian]: movieBack,
    [MovieCard.BlueLaMarraine]: movieBack,
    [MovieCard.GreenFrankAndEinstein]: movieBack,
    [MovieCard.GreenLeBarbare]: movieBack,
    [MovieCard.GreenLaRevancheDesDiplodocus]: movieBack,
    [MovieCard.GreenLHotelDeLaMontagne]: movieBack,
    [MovieCard.GreenBadMan]: movieBack,
    [MovieCard.GreenKingOfTokyo]: movieBack,
    [MovieCard.GreenUnMonstreDansLaNavette]: movieBack,
    [MovieCard.GreenWitchesVsCheerleaders]: movieBack,
    [MovieCard.GreenAbracadab]: movieBack,
    [MovieCard.GreenEliminator4]: movieBack,
    [MovieCard.GreenIntergalactic]: movieBack,
    [MovieCard.RedLHommeAvecDesDollars]: movieBack,
    [MovieCard.RedBarbacus]: movieBack,
    [MovieCard.RedLaFureurDuSerpent]: movieBack,
    [MovieCard.RedLaJambeDeBoisMaudite]: movieBack,
    [MovieCard.RedLeMondeDApres]: movieBack,
    [MovieCard.RedLeVolcan]: movieBack,
    [MovieCard.RedDestinationInconnue]: movieBack,
    [MovieCard.RedGentlemanDriver]: movieBack,
    [MovieCard.RedLassoFinal]: movieBack,
    [MovieCard.RedLEliteDesPilotes]: movieBack,
    [MovieCard.RedVroom8]: movieBack,
    [MovieCard.YellowMonsieurRigolo]: movieBack,
    [MovieCard.YellowCharlieEtSesSoucis]: movieBack,
    [MovieCard.YellowKangarooMan]: movieBack,
    [MovieCard.YellowTheKids]: movieBack,
    [MovieCard.YellowMaisQuEstCeQuIlsSontDebiles3]: movieBack,
    [MovieCard.YellowLEcoleDesZombies]: movieBack,
    [MovieCard.YellowDoReMiFaSol]: movieBack,
    [MovieCard.YellowFrenchKiss]: movieBack,
    [MovieCard.Yellow28DansLaFamille]: movieBack,
    [MovieCard.YellowLesAventuresDePiouPiou]: movieBack,
    [MovieCard.YellowLaPrincessDeFeu]: movieBack,
    [MovieCard.FinalShowing]: movieBack
  }
}

export const movieCardDescription = new MovieCardDescription()
