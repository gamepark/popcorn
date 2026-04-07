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
import { FilmStrip } from '../../theme/filmStrip'
import {
  availNoCss,
  availYesCss,
  badgeCss,
  badgeDotCss,
  headerRedCss,
  headerSubCss,
  headerTitleCss,
  helpBodyCss,
  numBadgeCss,
  pillCss,
  pillDotCss,
  pillLabelCss,
  pillsCss,
  pillValueCss,
  pillValuePriceCss,
  sectionHeaderCss,
  tableCellCss,
  tableCss,
  tableHeadCenterCss,
  tableHeadCss,
  tableRowHoverCss,
  tearLineCss
} from '../../theme/helpStyles'
import { getMovieActionSymbol, seatsNumberSymbols } from '../utils/movieCard.utils'
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
          <Trans i18nKey="help.material.movieCard.finalShowing.title" defaults="Final Showing" />
        </h2>
        <p>
          <Trans i18nKey="help.material.movieCard.finalShowing.description" defaults="This is the last round of the game." />
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
  const colorKey = camelCase(MovieColor[movieColor])

  return (
    <>
      {/* Colored header */}
      <div css={headerRedCss}>
        <div css={badgeCss}>
          <span css={badgeDotCss} style={{ background: movieColorValues[movieColor] }} />
          <Trans i18nKey={`help.material.movieCard.color.${colorKey}`} defaults={`${MovieColor[movieColor]} Film`} />
        </div>
        <div css={headerTitleCss}>
          <Trans i18nKey={`material.movieCard.title.${camelCase(MovieCard[item.id.front])}`} />
        </div>
        <div css={headerSubCss}>
          <Trans i18nKey={`material.movieCard.quote.${camelCase(MovieCard[item.id.front])}`} />
        </div>
      </div>
      <FilmStrip />

      {/* Body */}
      <div css={helpBodyCss}>
        <h4 css={sectionHeaderCss}>
          <Trans i18nKey="help.material.movieCard.headers.characteristics" defaults="Characteristics" />
        </h4>
        <div css={pillsCss}>
          <div css={pillCss}>
            <span css={pillLabelCss}>
              <Trans i18nKey="help.material.movieCard.pill.price" defaults="Price" />
            </span>
            <span css={pillValuePriceCss}>${price}</span>
          </div>
          {!isMovieOnPlayerBoard && (
            <div css={pillCss}>
              <span css={pillLabelCss}>
                <Trans i18nKey="help.material.movieCard.pill.row" defaults="Row" />
              </span>
              <span css={pillValueCss}>
                <Trans i18nKey={'help.material.movieCard.pill.row.' + (isPremiersMovie ? 'premiers' : 'features')} />
              </span>
            </div>
          )}
          <div css={pillCss}>
            <span css={pillLabelCss}>
              <Trans i18nKey="help.material.movieCard.pill.color" defaults="Color" />
            </span>
            <span css={pillDotCss} style={{ background: movieColorValues[movieColor] }} />
            <span css={pillValueCss} style={{ color: movieColorValues[movieColor] }}>
              <Trans i18nKey={`help.material.movieCard.color.${colorKey}`} />
            </span>
          </div>
        </div>

        {bonusAction && (
          <div css={bonusBoxCss}>
            <Trans
              i18nKey="help.material.movieCard.bonusAction"
              values={{
                money: bonusActionAmount,
                popcorn: bonusActionAmount,
                numberOfSeats: getMaximumNumberOfGuests(movieCharacteristics.numberOfSeatsForBonus!)
              }}
              components={{
                s: <strong></strong>,
                p1: <Picture src={showingSymbols[movieColor]} css={bonusIconCss} />,
                p2: <Picture src={seatsNumberSymbols[movieCharacteristics.numberOfSeatsForBonus!]} css={bonusIconCss} />,
                p3: <Picture src={getMovieActionSymbol(bonusAction, movieColor)} css={bonusIconCss} />,
                bonusActionDescription: (
                  <Trans i18nKey={getActionDescriptionKey(bonusAction)} values={{ money: bonusActionAmount, popcorn: bonusActionAmount }} />
                )
              }}
            />
          </div>
        )}
        {item.location?.type === LocationType.PremiersRowSpot && (
          <div css={bonusBoxCss}>
            <Trans
              i18nKey="help.material.movieCard.premiersShowingBonus"
              values={{ colorEnum: movieCharacteristics.color }}
              components={{ s: <strong></strong> }}
            />
          </div>
        )}

        <div css={tearLineCss} />

        <h4 css={sectionHeaderCss}>
          <Trans i18nKey="help.material.movieCard.header.actions" defaults="Actions" />
        </h4>
        <table css={tableCss}>
          <colgroup>
            <col style={{ width: '2.2em' }} />
            {isMovieOnPlayerBoard && <col style={{ width: '2.5em' }} />}
            <col style={{ width: '2em' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th css={tableHeadCenterCss}>
                <Trans i18nKey="help.material.movieCard.actions.table.header.actionNumber" defaults="#" />
              </th>
              {isMovieOnPlayerBoard && (
                <th css={tableHeadCenterCss}>
                  <Trans i18nKey="help.material.movieCard.actions.table.header.actionAvailable" defaults="Avail." />
                </th>
              )}
              <th css={tableHeadCss} colSpan={2}>
                <Trans i18nKey="help.material.movieCard.actions.table.header.actionDescription" defaults="Action" />
              </th>
            </tr>
          </thead>
          <tbody>
            {movieCharacteristics.actions.map((action, index) => {
              const isActionAvailable = availableMovieActions !== undefined ? availableMovieActions[index] : action !== MovieAction.None
              return (
                <tr key={`movie-${item.id!.front}-a-${index}`} css={tableRowHoverCss}>
                  <td css={tableCellCss}>
                    <div css={numBadgeCss}>{index + 1}</div>
                  </td>
                  {isMovieOnPlayerBoard && (
                    <td css={[tableCellCss, textCenterCss]}>
                      <span css={isActionAvailable ? availYesCss : availNoCss}>
                        <FontAwesomeIcon icon={isActionAvailable ? faCheck : faXmark} />
                      </span>
                    </td>
                  )}
                  <td css={[tableCellCss, noBorderRightCss]}>
                    <Picture src={getMovieActionSymbol(action, movieColor)} css={movieActionPictureCss} />
                  </td>
                  <td css={[tableCellCss, noBorderLeftCss]}>
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
      </div>
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

const movieColorValues: Record<MovieColor, string> = {
  [MovieColor.Blue]: '#2E86AB',
  [MovieColor.Green]: '#3A7D44',
  [MovieColor.Red]: '#C41E3A',
  [MovieColor.Yellow]: '#D4A828'
}

const showingSymbols = {
  [MovieColor.Blue]: blueMovieShowingBonusSymbol,
  [MovieColor.Green]: greenMovieShowingBonusSymbol,
  [MovieColor.Red]: redMovieShowingBonusSymbol,
  [MovieColor.Yellow]: yellowMovieShowingBonusSymbol
}

const bonusBoxCss = css`
  background: rgba(0, 0, 0, 0.04);
  border: 0.06em solid rgba(0, 0, 0, 0.08);
  border-radius: 0.4em;
  padding: 0.5em 0.7em;
  margin: 0.5em 0;
  display: flex;
  align-items: center;
  gap: 0.3em;
  flex-wrap: wrap;
  font-size: 0.9em;
  color: rgba(26, 10, 10, 0.72);
`

const bonusIconCss = css`
  height: 1.5em !important;
  vertical-align: middle;
  display: inline-block;
`

const movieActionPictureCss = css`
  max-width: 2em;
  max-height: 2em;
`

const textCenterCss = css`
  text-align: center;
`

const noBorderRightCss = css`
  border-right: none !important;
  padding: 0.25em;
`

const noBorderLeftCss = css`
  border-left: none !important;
`
