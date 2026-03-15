import { css } from '@emotion/react'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { MovieAction, MovieCard, movieCardCharacteristics, MovieCardId, MovieColor } from '@gamepark/popcorn/material/MovieCard.ts'
import { getMaximumNumberOfGuests, SeatsNumber } from '@gamepark/popcorn/material/TheaterTile.ts'
import { AvailableMovieActionsMemory, Memory } from '@gamepark/popcorn/Memory.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { MaterialHelpDisplayProps, Picture, useRules } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
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
import greenWhiteGuestSymbol from '../../images/Symbols/MovieActionGreenAdvertisingTokenWhiteGuest.png'
import yellowWhiteGuestSymbol from '../../images/Symbols/MovieActionGreenAdvertisingTokenWhiteGuest.png'
import redAnyGuestSymbol from '../../images/Symbols/MovieActionRedAdvertisingTokenAnyGuest.png'
import redWhiteGuestSymbol from '../../images/Symbols/MovieActionRedAdvertisingTokenWhiteGuest.png'
import yellowAnyGuestSymbol from '../../images/Symbols/MovieActionYellowAdvertisingTokenAnyGuest.png'
import redMovieSymbol from '../../images/Symbols/RedMovie.png'
import blueMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionBlue.png'
import greenMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionGreen.png'
import oneSeatMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionOneSeatTheater.png'
import redMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionRed.png'
import threeSeatMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionThreeSeatTheater.png'
import twoSeatMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionTwoSeatTheater.png'
import yellowMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionYellow.png'
import yellowMovieSymbol from '../../images/Symbols/YellowMovie.png'

export const MovieCardHelp: FC<MaterialHelpDisplayProps<PlayerColor, MaterialType, LocationType>> = ({
  item
}: {
  item: Partial<MaterialItem<PlayerColor, LocationType, MovieCardId>>
}) => {
  const rules = useRules<PopcornRules>()
  const { t } = useTranslation()
  const isMovieOnPlayerBoard = item.location?.type === LocationType.MovieCardSpotOnBottomPlayerCinemaBoard
  if (item.id?.front === undefined) {
    return
  }
  if (item.id.front === MovieCard.FinalShowing) {
    return (
      <>
        <h2>
          <Trans i18nKey="help.movieCard.title.finalShowing" defaults="Final Showing" />
        </h2>
        <p>
          <Trans
            i18nKey="help.movieCard.description.finalShowing"
            defaults="This card indicates that this round is the final round. Once the last player has finished their Showings Phase, players' scores will be computed and the game will end."
          />
        </p>
      </>
    )
  }
  const movieCharacteristics = movieCardCharacteristics[item.id.front]
  const isPremiersMovie = item.location?.type === LocationType.PremiersRowSpot ? 1 : 0
  const movieColor = movieCharacteristics.color
  const price =
    item.location?.type === LocationType.PremiersRowSpot
      ? movieCharacteristics.getPrice(LocationType.PremiersRowSpot)
      : movieCharacteristics.getPrice(LocationType.FeaturesRowSpot)
  const availableMovieActions = rules?.remind<AvailableMovieActionsMemory>(Memory.AvailableMovieActions)[item.id.front]
  const bonusAction = movieCharacteristics.bonusAction
  const bonusActionAmount = bonusAction !== undefined ? getAmountFromMovieAction(bonusAction) : -1
  return (
    <>
      <h2>
        <Trans i18nKey={`help.movieCard.title.${camelCase(MovieCard[item.id.front])}`} defaults={movieTitleDefaults[item.id.front]} />
      </h2>
      <q>
        <Trans i18nKey={`help.movieCard.quote.${camelCase(MovieCard[item.id.front])}`} defaults={movieQuotesDefaults[item.id.front]} />
      </q>
      <h4>
        <Trans i18nKey={'help.movieCard.headers.Characteristics'} defaults="Movie characteristics" />
      </h4>
      <p>
        <Trans
          i18nKey="help.movieCard.price"
          defaults="<s>Price:</s> ${price}{premiersMovie, plural, =1{ (incl. +$2 because this is a Premiers row movie)} other{}}"
          values={{ price: price, premiersMovie: isPremiersMovie }}
          components={{ s: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="help.movieCard.color"
          defaults="<s>Color:</s> <colorSymbol/> <color/> {colorEnum, plural, =1{(Comedies let you grow your audience more frequently.)} =2{(Action movies let you gain Popcorn more easily.)} =3{(Fantasy and sci-fi movies attract demanding Guests (and help you manage your bag and Guests).)} =4{(Drama and arthouse movies help you gain more money and Award cards.)} other{}}"
          values={{ colorEnum: movieCharacteristics.color }}
          components={{
            s: <strong />,
            colorSymbol: <Picture src={colorSymbols[movieColor]} css={pictureCss} />,
            color: <Trans i18nKey={`help.movieCard.color.${camelCase(MovieColor[movieColor])}`} defaults={colorDefaults[movieColor]} />
          }}
        />
      </p>
      {bonusAction && (
        <p>
          <Trans
            i18nKey={`help.movieCard.bonusAction`}
            defaults="<s>Showing bonus:</s> <p1/><p2/> = <p3/> If this movie is shown in a {numberOfSeats, plural, =1{one seat} =2{two seats} =3{three seats} other{}} theater: {bonusActionDescription}"
            values={{
              money: bonusActionAmount,
              popcorn: bonusActionAmount,
              numberOfSeats: getMaximumNumberOfGuests(movieCharacteristics.numberOfSeatsForBonus!),
              bonusActionDescription: t(`help.movieCard.action.${MovieAction[bonusAction]}`, getActionDescriptionDefaults(bonusAction), {
                money: bonusActionAmount,
                popcorn: bonusActionAmount
              })
            }}
            components={{
              s: <strong></strong>,
              p1: <Picture src={showingSymbols[movieColor]} css={conditionPictureCss} />,
              p2: <Picture src={seatsNumberSymbols[movieCharacteristics.numberOfSeatsForBonus!]} css={conditionPictureCss} />,
              p3: (
                <Picture
                  src={
                    bonusAction === MovieAction.AdvertisingTokenOnAnyGuest
                      ? anyGuestActionSymbols[movieColor]
                      : bonusAction === MovieAction.AdvertisingTokenOnWhiteGuestToBag
                        ? whiteGuestActionSymbols[movieColor]
                        : movieActionSymbols[bonusAction]
                  }
                  css={conditionPictureCss}
                />
              )
            }}
          />
        </p>
      )}
      {item.location?.type === LocationType.PremiersRowSpot && (
        <p>
          <Trans
            i18nKey="help.movieCard.premiersShowingBonus"
            defaults="<s>Premiers row showing bonus:</s> When you buy a Premier movie, immediately gain 1 {colorEnum, plural, =1{yellow} =2{red} =3{green} =4{blue} other{}} Guest from the reserve, and add it to your bag. If the reserve is empty, take it from any other player’s exit zone. If there are none available, nothing happens."
            values={{
              colorEnum: movieCharacteristics.color
            }}
            components={{
              s: <strong></strong>
            }}
          />
        </p>
      )}
      <h4>
        <Trans i18nKey={'help.movieCard.header.actions'} defaults="Actions" />
      </h4>
      <table css={tableCss}>
        <colgroup>
          <col />
          <col />
          {isMovieOnPlayerBoard && <col />}
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>
              <Trans i18nKey="help.movieCard.actions.table.heading.actionNumber" defaults="Action number" />
            </th>
            {isMovieOnPlayerBoard && (
              <th>
                <Trans i18nKey="help.movieCard.actions.table.heading.actionAvailable" defaults="Available" />
              </th>
            )}
            <th colSpan={2}>
              <Trans i18nKey="help.movieCard.actions.table.heading.actionDescription" defaults="Movie action description" />
            </th>
          </tr>
        </thead>
        <tbody>
          {movieCharacteristics.actions.map((action, index) => {
            const isActionAvailable = availableMovieActions !== undefined ? availableMovieActions[index] : action !== MovieAction.None
            return (
              <tr>
                <td css={textCenterCss}>{index + 1}</td>
                {isMovieOnPlayerBoard && (
                  <td css={textCenterCss}>
                    <FontAwesomeIcon icon={isActionAvailable ? faCheck : faXmark} size="xl" color={isActionAvailable ? 'green' : 'red'} />
                  </td>
                )}
                <td css={borderRightNoneCss}>
                  <Picture
                    src={
                      action === MovieAction.AdvertisingTokenOnAnyGuest
                        ? anyGuestActionSymbols[movieColor]
                        : action === MovieAction.AdvertisingTokenOnWhiteGuestToBag
                          ? whiteGuestActionSymbols[movieColor]
                          : movieActionSymbols[action]
                    }
                    css={movieActionPictureCss}
                  />
                </td>
                <td css={borderLeftNoneCss}>
                  <Trans
                    i18nKey={`help.movieCard.action.${MovieAction[action]}`}
                    defaults={getActionDescriptionDefaults(action)}
                    values={{ money: getAmountFromMovieAction(action), popcorn: getAmountFromMovieAction(action) }}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

const movieTitleDefaults = {
  // First movies
  [MovieCard.FirstMovieBlueRosebud]: 'Rosebud',
  [MovieCard.FirstMovieGreenEndOfTheWorld]: 'End of the World',
  [MovieCard.FirstMovieRedItSMyWar]: "It's My War",
  [MovieCard.FirstMovieYellowModernLove]: 'Modern Love',
  // Blue movies
  [MovieCard.BlueHenrietta]: 'Henrietta',
  [MovieCard.BlueMe]: 'Me',
  [MovieCard.Blue5678]: '5, 6, 7, 8...',
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

const movieQuotesDefaults = {
  // First movies
  [MovieCard.FirstMovieBlueRosebud]: '"It\'s the name of the sled" Spoiler.com',
  [MovieCard.FirstMovieGreenEndOfTheWorld]: 'The USA will defend us all.',
  [MovieCard.FirstMovieRedItSMyWar]: 'A one-man army',
  [MovieCard.FirstMovieYellowModernLove]: 'No final airport scene guaranteed!',
  // Blue movies
  [MovieCard.BlueHenrietta]: 'Inspired by a true story.',
  [MovieCard.BlueMe]: 'The new new wave.',
  [MovieCard.Blue5678]: 'Born with rythm',
  [MovieCard.BlueJoeJoe]: 'The griping story of the most famous triangle player in the world.',
  [MovieCard.BlueTheNeuroticDetective]: 'When she walked in, he knew he was going to have a problem.',
  [MovieCard.BlueObjection]: 'Will the evidence arrive in time ?',
  [MovieCard.BlueBigSpenders]: 'They hold all the cards.',
  [MovieCard.BlueControlZ]: 'He loved her. He wants to erase her.',
  [MovieCard.BlueRohanAndJaya]: "Just because we're sad doesn't mean we can't dance",
  [MovieCard.BlueAdrian]: 'You already know who wins.',
  [MovieCard.BlueTheGodmother]: "Don't even mention mental load to her.",
  // Green movies
  [MovieCard.GreenFrankAndEinstein]: 'They created a monster',
  [MovieCard.GreenTheBarbarian]: 'He wears the loincloth well.',
  [MovieCard.GreenRevengeOfTheDiplodocus]: 'Herbivores and proud of it.',
  [MovieCard.GreenMountainHotel]: 'A little birdie told him.',
  [MovieCard.GreenBadman]: "With a different letter, he'd be a hero.",
  [MovieCard.GreenKingOfTokyo]: "You're about to get smashed!",
  [MovieCard.GreenAMonsterInTheShip]: "Everyone's going to die (but one).",
  [MovieCard.GreenWitchesVsCheerleaders]: 'Between batons and wands, only one will win.',
  [MovieCard.GreenAbracadab]: 'The prefer magic wands over chemical bonds.',
  [MovieCard.GreenEliminator4]: "A.I.'ll be back!",
  [MovieCard.GreenIntergalactic]: 'They dream of their first star.',
  // Red movies
  [MovieCard.RedTheManWithTheMoney]: 'Obviously a western',
  [MovieCard.RedBarbacus]: 'Muscles and sweat.',
  [MovieCard.RedTheFuryOfTheSerpent]: 'The best jacket in the history of film.',
  [MovieCard.RedTheCursedPegleg]: 'Buy 10 tickets get 1 free bottle of rum',
  [MovieCard.RedTheWorldAfter]: 'The hardest part is filling up',
  [MovieCard.RedTheVolcano]: "Careful. It's very very hot!",
  [MovieCard.RedUnknownDestination]: 'They stole his life, he wants it back.',
  [MovieCard.RedGentlemanDriver]: 'The only criminal in history who still has their license.',
  [MovieCard.RedFinalLasso]: 'Even an archeologist can have adventures.',
  [MovieCard.RedElitePilot]: "There's always one who doesn't follow the rules.",
  [MovieCard.RedVroom8]: "Let's go even faster",
  // Yellow movies
  [MovieCard.YellowMisterGiggles]: 'He can do everything but talk.',
  [MovieCard.YellowMelancholyCharlie]: '"LMAO" The Film Folders',
  [MovieCard.YellowKangarooMan]: 'In Australia, the critters are strange.',
  [MovieCard.YellowTheKids]: 'They grow up so fast',
  [MovieCard.YellowWhatABunchOfIdiots3]: 'It was already crazy with two.',
  [MovieCard.YellowSchoolOfZombies]: "It's almost lunchtime.",
  [MovieCard.YellowDoReMiFaSo]: '"No wrong notes" Rock\'n\'Rock',
  [MovieCard.YellowFrenchKiss]: "You'll never forget your first time",
  [MovieCard.Yellow28InTheFamily]: "They're not even all on the poster",
  [MovieCard.YellowTheAdventuresOfPewPew]: '90 minutes of fun for kids (and torture for parents)',
  [MovieCard.YellowTheFirePrincess]: 'Hot stiff comingt hrough'
}

const colorDefaults = {
  [MovieColor.Blue]: 'Blue',
  [MovieColor.Green]: 'Green',
  [MovieColor.Red]: 'Red',
  [MovieColor.Yellow]: 'Yellow'
}

const getActionDescriptionDefaults = (action: MovieAction): string => {
  switch (action) {
    case MovieAction.AdvertisingTokenOnBlueGuest:
    case MovieAction.AdvertisingTokenOnGreenGuest:
    case MovieAction.AdvertisingTokenOnRedGuest:
    case MovieAction.AdvertisingTokenOnYellowGuest:
    case MovieAction.AdvertisingTokenOnAnyGuest:
    case MovieAction.AdvertisingTokenOnWhiteGuestToBag:
      return 'Place 1 of your Advertising tokens on the corresponding space of the Advertising board. There is no limit to the number of tokens that can be on the same space.'
    case MovieAction.AudienceTrackAdvance:
      return 'Move your audience cube 1 space to the right'
    case MovieAction.DrawAwardCard:
      return 'Draw 2 Award cards, keep 1 with out showing it to your opponents, then place the other face down under the deck'
    case MovieAction.DrawGuestAndPlaceThem:
      return 'Draw 1 Guest from your bag and place it on a seat that hasn’t yet been activated this showing. If you place it on a seat that already has a Guest, move the replaced (and unactivated) Guest to your exit zone.'
    case MovieAction.Get1Money:
    case MovieAction.Get2Money:
    case MovieAction.Get3Money:
    case MovieAction.Get4Money:
      return 'Get ${money}'
    case MovieAction.Get1Popcorn:
    case MovieAction.Get2Popcorn:
    case MovieAction.Get3Popcorn:
    case MovieAction.Get4Popcorn:
      return 'Get {popcorn, plural, =1{# Popcorn} other{# Popcorns}}'
    case MovieAction.None:
      return 'No action'
    case MovieAction.PlaceExitZoneGuestInBag:
      return 'Choose 1 Guest in your exit zone and add it to your bag.'
    case MovieAction.PlaceGuestInReserve:
      return 'Choose 1 Guest in your cinema (in a theater or your exit zone, but not in your bag) and place it in the reserve.'
  }
}

const getAmountFromMovieAction = (action: MovieAction): number => {
  switch (action) {
    case MovieAction.Get1Money:
    case MovieAction.Get1Popcorn:
      return 1
    case MovieAction.Get2Money:
    case MovieAction.Get2Popcorn:
      return 2
    case MovieAction.Get3Money:
    case MovieAction.Get3Popcorn:
      return 3
    case MovieAction.Get4Money:
    case MovieAction.Get4Popcorn:
      return 4
    default:
      return -1
  }
}

const colorSymbols = {
  [MovieColor.Blue]: blueMovieSymbol,
  [MovieColor.Green]: greenMovieSymbol,
  [MovieColor.Red]: redMovieSymbol,
  [MovieColor.Yellow]: yellowMovieSymbol
}

const movieActionSymbols = {
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
  [MovieAction.None]: '',
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

const showingSymbols = {
  [MovieColor.Blue]: blueMovieShowingBonusSymbol,
  [MovieColor.Green]: greenMovieShowingBonusSymbol,
  [MovieColor.Red]: redMovieShowingBonusSymbol,
  [MovieColor.Yellow]: yellowMovieShowingBonusSymbol
}

const seatsNumberSymbols = {
  [SeatsNumber.One]: oneSeatMovieShowingBonusSymbol,
  [SeatsNumber.Two]: twoSeatMovieShowingBonusSymbol,
  [SeatsNumber.Three]: threeSeatMovieShowingBonusSymbol
}

const pictureCss = css`
  width: 2em;
  height: 2.4em !important;
`

const movieActionPictureCss = css`
  max-width: 2em;
  max-height: 2em;
`

const tableCss = css`
  width: 95%;
  margin: 0 auto;
  border-collapse: collapse;
  border: 2px solid;

  th,
  td {
    border: 2px solid;
  }
`

const borderLeftNoneCss = css`
  border-left: none !important;
`

const borderRightNoneCss = css`
  border-right: none !important;
  padding: 0.25em;
`

const textCenterCss = css`
  text-align: center;
`

const conditionPictureCss = css`
  height: 2em !important;
`
