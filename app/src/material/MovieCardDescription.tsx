import { css } from '@emotion/react'
import { faHandPointLeft, faHandPointRight, faHandPointUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Actions } from '@gamepark/popcorn/material/Actions/Actions'
import { ActionType } from '@gamepark/popcorn/material/Actions/ActionType'
import { isBuyMovieCardCustomMove, isMovieActionCustomMove } from '@gamepark/popcorn/material/CustomMoveType'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { MovieCard, MovieCardId, MovieCardType, PlayableMovieCardId } from '@gamepark/popcorn/material/MovieCard'
import { PopcornMove } from '@gamepark/popcorn/material/PopcornMoves'
import { Memory } from '@gamepark/popcorn/Memory'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { CardDescription, ItemContext, ItemMenuButton, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import React from 'react'
import { Trans } from 'react-i18next'
import blue5678 from '../images/Cards/Movies/en/Blue5678.jpg'
import blueAdrian from '../images/Cards/Movies/en/BlueAdrian.jpg'
import blueBigSpenders from '../images/Cards/Movies/en/BlueBigSpenders.jpg'
import blueControlZ from '../images/Cards/Movies/en/BlueControlZ.jpg'
import blueHenrietta from '../images/Cards/Movies/en/BlueHenrietta.jpg'
import blueJoeJoe from '../images/Cards/Movies/en/BlueJoeJoe.jpg'
import blueMe from '../images/Cards/Movies/en/BlueMe.jpg'
import blueObjection from '../images/Cards/Movies/en/BlueObjection.jpg'
import blueRohanAndJaya from '../images/Cards/Movies/en/BlueRohanAndJaya.jpg'
import blueTheGodmother from '../images/Cards/Movies/en/BlueTheGodmother.jpg'
import blueTheNeuroticDetective from '../images/Cards/Movies/en/BlueTheNeuroticDetective.jpg'
import finalShowing from '../images/Cards/Movies/en/FinalShowing.jpg'
import firstMovieBack from '../images/Cards/Movies/en/FirstMovieBack.jpg'
import firstMovieBlueRosebud from '../images/Cards/Movies/en/FirstMovieBlueRosebud.jpg'
import firstMovieGreenEndOfTheWorld from '../images/Cards/Movies/en/FirstMovieGreenEndOfTheWorld.jpg'
import firstMovieRedItSMyWar from '../images/Cards/Movies/en/FirstMovieRedItSMyWar.jpg'
import firstMovieYellowModernLove from '../images/Cards/Movies/en/FirstMovieYellowModernLove.jpg'
import greenAbracadab from '../images/Cards/Movies/en/GreenAbracadab.jpg'
import greenAMonsterInTheShip from '../images/Cards/Movies/en/GreenAMonsterInTheShip.jpg'
import greenBadMan from '../images/Cards/Movies/en/GreenBadman.jpg'
import greenEliminator4 from '../images/Cards/Movies/en/GreenEliminator4.jpg'
import greenFrankAndEinstein from '../images/Cards/Movies/en/GreenFrankAndEinstein.jpg'
import greenIntergalactic from '../images/Cards/Movies/en/GreenIntergalactic.jpg'
import greenKingOfTokyo from '../images/Cards/Movies/en/GreenKingOfTokyo.jpg'
import greenMountainHotel from '../images/Cards/Movies/en/GreenMountainHotel.jpg'
import greenRevengeOfTheDiplodocus from '../images/Cards/Movies/en/GreenRevengeOfTheDiplodocus.jpg'
import greenTheBarbarian from '../images/Cards/Movies/en/GreenTheBarbarian.jpg'
import greenWitchesVsCheerleaders from '../images/Cards/Movies/en/GreenWitchesVsCheerleaders.jpg'
import movieBack from '../images/Cards/Movies/en/MovieBack.jpg'
import redBarbacus from '../images/Cards/Movies/en/RedBarbacus.jpg'
import redElitePilot from '../images/Cards/Movies/en/RedElitePilot.jpg'
import redFinalLasso from '../images/Cards/Movies/en/RedFinalLasso.jpg'
import redGentlemanDriver from '../images/Cards/Movies/en/RedGentlemanDriver.jpg'
import redTheCursedPegleg from '../images/Cards/Movies/en/RedTheCursedPegleg.jpg'
import redTheFuryOfTheSerpent from '../images/Cards/Movies/en/RedTheFuryOfTheSerpent.jpg'
import redTheManWithTheMoney from '../images/Cards/Movies/en/RedTheManWithTheMoney.jpg'
import redTheVolcano from '../images/Cards/Movies/en/RedTheVolcano.jpg'
import redTheWorldAfter from '../images/Cards/Movies/en/RedTheWorldAfter.jpg'
import redUnknownDestination from '../images/Cards/Movies/en/RedUnknownDestination.jpg'
import redVroom8 from '../images/Cards/Movies/en/RedVroom8.jpg'
import yellow28InTheFamily from '../images/Cards/Movies/en/Yellow28InTheFamily.jpg'
import yellowDoRemiFaSo from '../images/Cards/Movies/en/YellowDoReMiFaSo.jpg'
import yellowFrenchKiss from '../images/Cards/Movies/en/YellowFrenchKiss.jpg'
import yellowKangarooMan from '../images/Cards/Movies/en/YellowKangarooMan.jpg'
import yellowMelancholyCharlie from '../images/Cards/Movies/en/YellowMelancholyCharlie.jpg'
import yellowMisterGiggles from '../images/Cards/Movies/en/YellowMisterGiggles.jpg'
import yellowSchoolOfZombies from '../images/Cards/Movies/en/YellowSchoolOfZombies.jpg'
import yellowTheAdventuresOfPewPew from '../images/Cards/Movies/en/YellowTheAdventuresOfPewPew.jpg'
import yellowTheFirePrincess from '../images/Cards/Movies/en/YellowTheFirePrincess.jpg'
import yellowTheKids from '../images/Cards/Movies/en/YellowTheKids.jpg'
import yellowWhatABunchOfIdiots3 from '../images/Cards/Movies/en/YellowWhatABunchOfIdiots3.jpg'
import { bottomCinemaBoardLocator } from '../locators/BottomCinemaBoardLocator'
import { featureMovieCardsRowLocator } from '../locators/FeatureMovieCardsRowLocator'
import { movieCardOnBottomPlayerCinemaBoardLocator } from '../locators/MovieCardOnBottomPlayerCinemaBoardLocator'
import { premierMovieCardsRowLocator } from '../locators/PremierMovieCardsRowLocator'
import { MovieCardHelp } from './help/MovieCardHelp'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp

export class MovieCardDescription extends CardDescription<PlayerColor, MaterialType, LocationType, MovieCardId, RuleId, PlayerColor> {
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
    [MovieCard.RedTheWorldAfter]: redTheWorldAfter,
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

  help = MovieCardHelp

  public canDrag(move: PopcornMove, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return super.canDrag(move, context) || (isBuyMovieCardCustomMove(move) && move.data.boughtCardIndex === context.index)
  }

  public getMoveDropLocations(
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    move: PopcornMove
  ): Location<PlayerColor, LocationType>[] {
    if (context.rules.game.rule?.id === RuleId.BuyingPhaseRule && isBuyMovieCardCustomMove(move)) {
      const destination = {
        type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard,
        player: move.data.player,
        x: move.data.destinationSpot
      }
      return [destination]
    }
    return super.getMoveDropLocations(context, move)
  }

  public isMenuAlwaysVisible(
    _item: MaterialItem<PlayerColor, LocationType, MovieCardId>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): boolean {
    if (context.player !== undefined) {
      return context.rules.remind<Actions[]>(Memory.PendingActions, context.player)[0]?.type === ActionType.ChooseMovieAction
    }
    return super.isMenuAlwaysVisible(_item, context)
  }

  public getItemMenu(
    item: MaterialItem<PlayerColor, LocationType, MovieCardId>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    legalMoves: PopcornMove[]
  ): React.ReactNode {
    if (
      context.rules.game.rule?.id === RuleId.BuyingPhaseRule &&
      (item.location.type === LocationType.PremiersRowSpot || item.location.type === LocationType.FeaturesRowSpot)
    ) {
      return this.createItemMenuForBuyingPhase(item, context, legalMoves)
    }
    if (context.rules.game.rule?.id === RuleId.ShowingsPhaseRule && item.location.type === LocationType.MovieCardSpotOnBottomPlayerCinemaBoard) {
      return this.getItemMenuForChooseMovieAction(item, context, legalMoves)
    }
    return
  }

  public getHelpDisplayExtraCss() {
    return css`font-size: 6em !important;`
  }

  public isFlippedOnTable(
    item: Partial<MaterialItem<PlayerColor, LocationType>>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): boolean {
    if (
      item.location?.type === LocationType.MovieCardDeckSpot ||
      (item.location?.type === LocationType.PlayerMovieCardArchiveSpot && context.player !== item.location.player)
    ) {
      return true
    }
    return super.isFlippedOnTable(item, context)
  }

  public displayHelp(
    item: MaterialItem<PlayerColor, LocationType, MovieCardId>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): PopcornMove | undefined {
    if (
      !context.rules.isOver() &&
      (item.location.type === LocationType.MovieCardDeckSpot ||
        (item.location.type === LocationType.PlayerMovieCardArchiveSpot && context.player !== item.location.player))
    ) {
      const location = { type: item.location.type } as Location<PlayerColor, LocationType>
      if (item.location.player !== undefined) {
        location.player = item.location.player
      }
      return displayLocationHelp(location)
    }
    if (item.location.type === LocationType.PlayerMovieCardArchiveSpot) {
      return displayLocationHelp(item.location)
    }
    return super.displayHelp(item, context)
  }

  private createItemMenuForBuyingPhase(
    item: MaterialItem<PlayerColor, LocationType, MovieCardId>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    legalMoves: PopcornMove[]
  ): React.ReactNode {
    const cardIndex = context.index
    const movieCardMaterial = context.rules
      .material(MaterialType.MovieCards)
      .location((l) => l.type === LocationType.PremiersRowSpot || l.type === LocationType.FeaturesRowSpot)
      .index(cardIndex)
    if (movieCardMaterial.exists) {
      const movieCard = movieCardMaterial.getItem<Required<PlayableMovieCardId>>()!
      const cardLocator = movieCard.location.type === LocationType.PremiersRowSpot ? premierMovieCardsRowLocator : featureMovieCardsRowLocator
      const cardCoordinates = cardLocator.getItemCoordinates(movieCard, context)
      const bottomCinemaBoardCoordinates = bottomCinemaBoardLocator.coordinates
      const movieOnBoardLocator = movieCardOnBottomPlayerCinemaBoardLocator
      const movesForCard = legalMoves.filter(isBuyMovieCardCustomMove).filter((move) => move.data.boughtCardIndex === cardIndex)
      return movesForCard.length > 0 ? (
        <>
          {movesForCard.map((move, index) => {
            const destinationCoordinates = movieOnBoardLocator.getLocationCoordinates(
              { type: LocationType.MovieCardSpotOnBottomPlayerCinemaBoard, x: move.data.destinationSpot },
              context
            )
            const xOffset = move.data.destinationSpot === 0 ? -4 : move.data.destinationSpot === 1 ? 0 : 4
            const yOffest = move.data.destinationSpot === 1 ? 3 : 0
            const pointer = move.data.destinationSpot === 0 ? faHandPointRight : move.data.destinationSpot === 1 ? faHandPointUp : faHandPointLeft
            return (
              <ItemMenuButton
                key={`buy-move-${item.id.front}-${index}`}
                move={move}
                label={<Trans i18nKey="button.itemMenu.movieCard.buyCardDestination" values={{ destination: move.data.destinationSpot }} />}
                x={-(cardCoordinates.x ?? 0) + (destinationCoordinates.x ?? 0) + bottomCinemaBoardCoordinates.x + xOffset}
                y={-(cardCoordinates.y ?? 0) + (destinationCoordinates.y ?? 0) + bottomCinemaBoardCoordinates.y + yOffest}
                labelPosition={move.data.destinationSpot === 0 ? 'left' : 'right'}
              >
                <FontAwesomeIcon icon={pointer} size="lg" />
              </ItemMenuButton>
            )
          })}
          {this.getHelpButton(item, context, {
            angle: 0,
            radius: 2.5 - movesForCard.length * 2.25
          })}
        </>
      ) : undefined
    }
    return undefined
  }

  private getItemMenuForChooseMovieAction(
    item: MaterialItem<PlayerColor, LocationType, MovieCardId>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    legalMoves: PopcornMove[]
  ) {
    const movieCardIndex = context.index
    const moves = legalMoves.filter(isMovieActionCustomMove).filter((move) => move.data.movieCardIndex === movieCardIndex)
    if (moves.length > 0) {
      return (
        <>
          {moves.map((move, index) => (
            <ItemMenuButton
              key={`movieAction-${movieCardIndex}-${index}`}
              move={move}
              label={<Trans i18nKey="button.itemMenu.movieCard.movieAction" />}
              labelPosition="left"
              x={-3.5}
              y={-2.75 + 1.35 * move.data.movieActionNumber}
              style={{ width: '1.25em', height: '1.25em' }}
            >
              <FontAwesomeIcon icon={faHandPointRight} size="sm" />
            </ItemMenuButton>
          ))}
          {this.getHelpButton(item, context, {
            angle: 0,
            radius: -2.5
          })}
        </>
      )
    }
    return
  }
}

export const movieCardDescription = new MovieCardDescription()
