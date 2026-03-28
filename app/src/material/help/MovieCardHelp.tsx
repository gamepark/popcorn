import { css } from '@emotion/react'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { MovieAction, MovieCard, movieCardCharacteristics, MovieCardId, MovieColor } from '@gamepark/popcorn/material/MovieCard.ts'
import { getMaximumNumberOfGuests } from '@gamepark/popcorn/material/TheaterTile.ts'
import { AvailableMovieActionsMemory, Memory } from '@gamepark/popcorn/Memory.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { MaterialHelpDisplayProps, Picture, useRules } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import blueMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionBlue.png'
import greenMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionGreen.png'
import redMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionRed.png'
import yellowMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionYellow.png'
import { colorSymbols, getMovieActionSymbol, movieTitleDefaults, seatsNumberSymbols } from '../utils/movieCard.utils.ts'

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
          defaults="<s>Price:</s> ${price}{premiersMovie, select, 1{ (incl. +$2 because this is a Premiers row movie)} other{}}"
          values={{ price: price, premiersMovie: isPremiersMovie }}
          components={{ s: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="help.movieCard.color"
          defaults="<s>Color:</s> <colorSymbol/> <color/> {colorEnum, select, 1{(Comedies let you grow your audience more frequently.)} 2{(Action movies let you gain Popcorn more easily.)} 3{(Fantasy and sci-fi movies attract demanding Guests (and help you manage your bag and Guests).)} 4{(Drama and arthouse movies help you gain more money and Award cards.)} other{}}"
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
            defaults="<s>Showing bonus:</s> <p1/><p2/> = <p3/> When bought, if this movie is shown in a {numberOfSeats, select, 1{one seat} 2{two seats} 3{three seats} other{}} theater: {bonusActionDescription}"
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
              p3: <Picture src={getMovieActionSymbol(bonusAction, movieColor)} css={conditionPictureCss} />
            }}
          />
        </p>
      )}
      {item.location?.type === LocationType.PremiersRowSpot && (
        <p>
          <Trans
            i18nKey="help.movieCard.premiersShowingBonus"
            defaults="<s>Premiers row showing bonus:</s> When you buy a Premier movie, immediately gain 1 {colorEnum, select, 1{yellow} 2{red} 3{green} 4{blue} other{}} Guest from the reserve, and add it to your bag. If the reserve is empty, take it from any other player’s exit zone. If there are none available, nothing happens."
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
                  <Picture src={getMovieActionSymbol(action, movieColor)} css={movieActionPictureCss} />
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

const showingSymbols = {
  [MovieColor.Blue]: blueMovieShowingBonusSymbol,
  [MovieColor.Green]: greenMovieShowingBonusSymbol,
  [MovieColor.Red]: redMovieShowingBonusSymbol,
  [MovieColor.Yellow]: yellowMovieShowingBonusSymbol
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
