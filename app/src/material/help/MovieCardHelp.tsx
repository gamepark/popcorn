import { css } from '@emotion/react'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MovieAction, MovieCard, movieCardCharacteristics, MovieCardId, MovieColor } from '@gamepark/popcorn/material/MovieCard'
import { getMaximumNumberOfGuests } from '@gamepark/popcorn/material/TheaterTile'
import { AvailableMovieActionsMemory, Memory } from '@gamepark/popcorn/Memory'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { Picture, useRules } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import blueMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionBlue.png'
import greenMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionGreen.png'
import redMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionRed.png'
import yellowMovieShowingBonusSymbol from '../../images/Symbols/ShowingBonusConditionYellow.png'
import { colorSymbols, getMovieActionSymbol, seatsNumberSymbols } from '../utils/movieCard.utils'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util'

export const MovieCardHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }: { item: Partial<MaterialItem<PlayerColor, LocationType, MovieCardId>> }) => {
  const rules = useRules<PopcornRules>()
  const isMovieOnPlayerBoard = item.location?.type === LocationType.MovieCardSpotOnBottomPlayerCinemaBoard
  if (item.id?.front === undefined) {
    return
  }
  if (item.id.front === MovieCard.FinalShowing) {
    return (
      <>
        <h2>
          <Trans i18nKey="help.material.movieCard.finalShowing.title" />
        </h2>
        <p>
          <Trans i18nKey="help.material.movieCard.finalShowing.description" />
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
        <Trans i18nKey={`material.movieCard.title.${camelCase(MovieCard[item.id.front])}`} />
      </h2>
      <q>
        <Trans i18nKey={`material.movieCard.quote.${camelCase(MovieCard[item.id.front])}`} />
      </q>
      <h4>
        <Trans i18nKey="help.material.movieCard.headers.characteristics" />
      </h4>
      <p>
        <Trans i18nKey="help.material.movieCard.price" values={{ price: price, premiersMovie: isPremiersMovie }} components={{ s: <strong /> }} />
      </p>
      <p>
        <Trans
          i18nKey="help.material.movieCard.color"
          values={{ colorEnum: movieCharacteristics.color }}
          components={{
            s: <strong />,
            colorSymbol: <Picture src={colorSymbols[movieColor]} css={pictureCss} />,
            color: <Trans i18nKey={`help.material.movieCard.color.${camelCase(MovieColor[movieColor])}`} />
          }}
        />
      </p>
      {bonusAction && (
        <p>
          <Trans
            i18nKey={`help.movieCard.bonusAction`}
            values={{
              money: bonusActionAmount,
              popcorn: bonusActionAmount,
              numberOfSeats: getMaximumNumberOfGuests(movieCharacteristics.numberOfSeatsForBonus!)
            }}
            components={{
              s: <strong></strong>,
              p1: <Picture src={showingSymbols[movieColor]} css={conditionPictureCss} />,
              p2: <Picture src={seatsNumberSymbols[movieCharacteristics.numberOfSeatsForBonus!]} css={conditionPictureCss} />,
              p3: <Picture src={getMovieActionSymbol(bonusAction, movieColor)} css={conditionPictureCss} />,
              bonusActionDescription: <Trans i18nKey={getActionDescriptionKey(bonusAction)} values={{ money: bonusActionAmount, popcorn: bonusActionAmount }} />
            }}
          />
        </p>
      )}
      {item.location?.type === LocationType.PremiersRowSpot && (
        <p>
          <Trans
            i18nKey="help.material.movieCard.premiersShowingBonus"
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
        <Trans i18nKey="help.material.movieCard.header.actions" />
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
              <Trans i18nKey="help.material.movieCard.actions.table.heading.actionNumber" />
            </th>
            {isMovieOnPlayerBoard && (
              <th>
                <Trans i18nKey="help.material.movieCard.actions.table.heading.actionAvailable" />
              </th>
            )}
            <th colSpan={2}>
              <Trans i18nKey="help.material.movieCard.actions.table.heading.actionDescription" />
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
                    i18nKey={getActionDescriptionKey(action)}
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

const getActionDescriptionKey = (action: MovieAction): string => {
  switch (action) {
    case MovieAction.AdvertisingTokenOnBlueGuest:
    case MovieAction.AdvertisingTokenOnGreenGuest:
    case MovieAction.AdvertisingTokenOnRedGuest:
    case MovieAction.AdvertisingTokenOnYellowGuest:
    case MovieAction.AdvertisingTokenOnAnyGuest:
    case MovieAction.AdvertisingTokenOnWhiteGuestToBag:
      return 'help.material.movieCard.action.advertisingToken'
    case MovieAction.AudienceTrackAdvance:
      return 'help.material.movieCard.action.audienceTrackAdvance'
    case MovieAction.DrawAwardCard:
      return 'help.material.movieCard.action.drawAwardCard'
    case MovieAction.DrawGuestAndPlaceThem:
      return 'help.material.movieCard.action.drawGuestAndPlaceThem'
    case MovieAction.Get1Money:
    case MovieAction.Get2Money:
    case MovieAction.Get3Money:
    case MovieAction.Get4Money:
      return 'help.material.movieCard.action.getMoney'
    case MovieAction.Get1Popcorn:
    case MovieAction.Get2Popcorn:
    case MovieAction.Get3Popcorn:
    case MovieAction.Get4Popcorn:
      return 'help.material.movieCard.action.getPopcorn'
    case MovieAction.None:
      return 'help.material.movieCard.action.none'
    case MovieAction.PlaceExitZoneGuestInBag:
      return 'help.material.movieCard.action.placeExitZoneGuestInBag'
    case MovieAction.PlaceGuestInReserve:
      return 'help.material.movieCard.action.placeGuestInReserve'
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
