import { css } from '@emotion/react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GamePhase } from '@gamepark/popcorn/GamePhase'
import { HelpCard } from '@gamepark/popcorn/material/HelpCard'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { Picture, useRules } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import advertisingSymbol from '../../images/Symbols/ActionAdvertising.png'
import drawGuestSymbol from '../../images/Symbols/ActionDrawGuest.png'
import exitGuestToBasSymbol from '../../images/Symbols/ActionExitZoneGuestToBag.png'
import placeGuestInReserveSymbol from '../../images/Symbols/ActionPlaceGuestInReserve.png'
import getXMoneySymbol from '../../images/Symbols/ActionXMoney.png'
import getXPopcornSymbol from '../../images/Symbols/ActionXPopcorn.png'
import anyGuestSymbol from '../../images/Symbols/AdvertisingBoardAnyGuest.png'
import blueGuestSymbol from '../../images/Symbols/AdvertisingBoardBlueGuest.png'
import greenGuestSymbol from '../../images/Symbols/AdvertisingBoardGreenGuest.png'
import redGuestSymbol from '../../images/Symbols/AdvertisingBoardRedGuest.png'
import whiteGuestToBagSymbol from '../../images/Symbols/AdvertisingBoardWhiteToBag.png'
import yellowGuestSymbol from '../../images/Symbols/AdvertisingBoardYellowGuest.png'
import audienceSymbol from '../../images/Symbols/Audience.png'
import audienceAdvanceSymbol from '../../images/Symbols/MovieActionAdvanceAudienceCube.png'
import drawAwardCardSymbol from '../../images/Symbols/MovieActionDrawAwardCard.png'
import movieActionSymbol from '../../images/Symbols/SeatActionMovieAction.png'
import { FilmStrip } from '../../theme/filmStrip'
import { headerDarkCss, headerRedCss, headerTitleCss, helpBodyCss, sectionHeaderCss } from '../../theme/helpStyles'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util'

export const HelpCardHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }: { item: Partial<MaterialItem<PlayerColor, LocationType, HelpCard>> }) => {
  if (item.id === HelpCard.ActionsHelp) {
    return <ActionHelpCardHelp />
  }
  return <PhasesHelpCardHelp />
}

const ActionHelpCardHelp: FC = () => (
  <>
    <div css={headerRedCss}>
      <h2 css={headerTitleCss}>
        <Trans i18nKey="help.material.helpCard.action.title" defaults="Action Reminder" />
      </h2>
    </div>
    <FilmStrip />
    <div css={helpBodyCss}>
      <div css={actionGridWithLastCss}>
        <div>
          <Picture src={getXMoneySymbol} css={actionPictureCss} />
        </div>
        <div>
          <Trans i18nKey="help.material.helpCard.action.money" />
        </div>
        <div>
          <Picture src={movieActionSymbol} css={actionPictureCss} />
        </div>
        <div>
          <Trans i18nKey="help.material.helpCard.action.movieAction" />
        </div>
        <div>
          <Picture src={getXPopcornSymbol} css={actionPictureCss} />
        </div>
        <div>
          <Trans i18nKey="help.material.helpCard.action.popcorn" />
        </div>
        <div>
          <Picture src={placeGuestInReserveSymbol} css={actionPictureCss} />
        </div>
        <div>
          <Trans i18nKey="help.material.helpCard.action.reserve" />
        </div>
        <div>
          <Picture src={exitGuestToBasSymbol} css={actionPictureCss} />
        </div>
        <div>
          <Trans i18nKey="help.material.helpCard.action.exitGuestToBag" />
        </div>
        <div>
          <Picture src={audienceAdvanceSymbol} css={actionPictureCss} />
        </div>
        <div>
          <Trans i18nKey="help.material.helpCard.action.audience" />
        </div>
        <div>
          <Picture src={drawAwardCardSymbol} css={actionPictureCss} />
        </div>
        <div>
          <Trans i18nKey="help.material.helpCard.action.awardCard" />
        </div>
        <div>
          <Picture src={drawGuestSymbol} css={actionPictureCss} />
        </div>
        <div>
          <Trans i18nKey="help.material.helpCard.action.drawGuest" />
        </div>
        <div css={lastLineCss}>
          <div>
            <Picture src={advertisingSymbol} css={actionPictureCss} />
          </div>
          <div>
            <Trans i18nKey="help.material.helpCard.action.advertising" />
          </div>
        </div>
      </div>
      <div css={sectionHeaderCss}>
        <Trans i18nKey="help.material.helpCard.action.header.buyingPhase" />
      </div>
      <div css={actionGridCss}>
        <div>
          <Picture src={whiteGuestToBagSymbol} css={actionPictureCss} />
        </div>
        <div>
          <Trans i18nKey="help.material.helpCard.action.whiteGuestToBag" />
        </div>
        <div css={iconsRowSpanCss}>
          <Picture src={yellowGuestSymbol} css={actionPictureCss} />
          <Picture src={greenGuestSymbol} css={actionPictureCss} />
          <Picture src={redGuestSymbol} css={actionPictureCss} />
          <Picture src={blueGuestSymbol} css={actionPictureCss} />
        </div>
        <div css={rowSpanCss}>
          <Trans i18nKey="help.material.helpCard.action.advertisingGuest" />
        </div>
        <div>
          <Picture src={anyGuestSymbol} css={actionPictureCss} />
        </div>
        <div>
          <Trans i18nKey="help.material.helpCard.action.advertisingAnyGuest" />
        </div>
      </div>
    </div>
  </>
)

const PhasesHelpCardHelp: FC = () => {
  const rules = useRules<PopcornRules>()
  const currentPhase = rules?.currentPhase
  return (
    <>
      <div css={headerDarkCss}>
        <h2 css={headerTitleCss}>
          <Trans i18nKey="help.material.helpCard.phases.title" defaults="Turn Overview" />
        </h2>
      </div>
      <FilmStrip />
      <div css={helpBodyCss}>
        <ol css={headingListCss}>
          <li {...(currentPhase === GamePhase.BuyingPhase ? {} : { css: fadedPhaseCss })}>
            <h3>
              <Trans i18nKey="help.material.helpCard.phases.buyingAdvertising.title" values={{ currentPhase: currentPhase === GamePhase.BuyingPhase ? 1 : 0 }} />
            </h3>
            <Trans
              i18nKey="help.material.helpCard.phases.buyingAdvertising.description"
              components={{
                ls: <ul></ul>,
                lit: <li></li>,
                nl: <br />
              }}
            />
          </li>
          <li {...(currentPhase === GamePhase.ShowingsPhase ? {} : { css: fadedPhaseCss })}>
            <h3>
              <Trans i18nKey="help.material.helpCard.phases.showing.title" values={{ currentPhase: currentPhase === GamePhase.ShowingsPhase ? 1 : 0 }} />
            </h3>
            <Trans
              i18nKey="help.material.helpCard.phases.showing.description"
              components={{
                ols: <ol type="A"></ol>,
                uls: <ul></ul>,
                lit: <li></li>,
                e: <em></em>,
                arr: <FontAwesomeIcon icon={faArrowRight} size="sm" />,
                nl: <br />,
                audiencePicture: <Picture src={audienceSymbol} css={audiencePictureCss} />
              }}
            />
          </li>
          <li {...(currentPhase === GamePhase.EndOfRoundPhase ? {} : { css: fadedPhaseCss })}>
            <h3>
              <Trans
                i18nKey="help.material.helpCard.phases.endOfRound.title"
                defaults="End of Round{currentPhase, plural, =1{ (current phase)} other{}}"
                values={{ currentPhase: currentPhase === GamePhase.EndOfRoundPhase ? 1 : 0 }}
              />
            </h3>
            <Trans
              i18nKey="help.material.helpCard.phases.endOfRound.description"
              components={{
                ls: <ul></ul>,
                lit: <li></li>
              }}
            />
          </li>
        </ol>
      </div>
    </>
  )
}

const actionGridCss = css`
  width: 95%;
  margin: 1em auto;
  display: grid;
  grid-template-columns: 1.2fr 3fr 1.2fr 3fr;
  align-items: center;
  border: 1px solid;
  border-collapse: collapse;
  > * {
    border: 1px solid;
    border-collapse: collapse;
    width: 100%;
    height: 100%;
    padding: 0.125em;
  }
  > div:nth-child(odd) {
    display: flex;
    justify-content: center;
  }
  > div:nth-child(even) {
    text-align: center;
    align-content: center;
  }
`

const actionGridWithLastCss = css`
  width: 95%;
  margin: 1em auto;
  display: grid;
  grid-template-columns: 1.2fr 3fr 1.2fr 3fr;
  align-items: center;
  border: 1px solid;
  border-collapse: collapse;
  > * {
    border: 1px solid;
    border-collapse: collapse;
    width: 100%;
    height: 100%;
    padding: 0.125em;
  }
  > div:nth-child(odd) {
    display: flex;
    justify-content: center;
  }
  > div:nth-child(even):not(:last-child) {
    text-align: center;
    align-content: center;
  }
  > div:last-child {
    text-align: center;
    padding: 0;
    border: none;
  }
`

const actionPictureCss = css`
  height: 2em;
  justify-self: center;
`

const lastLineCss = css`
  grid-column: 1 / 5;
  display: grid !important;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  border-collapse: collapse;
  border: none;
  padding: 0;
  > * {
    border: 1px solid;
    border-collapse: collapse;
    padding: 0.125em;
    width: 100%;
    height: 100%;
  }
  > div:nth-child(odd) {
    display: flex;
    justify-content: center;
  }
  > div:nth-child(even) {
    text-align: center;
  }
`

const iconsRowSpanCss = css`
  grid-column: 3;
  grid-row: 1 / 3;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
`

const rowSpanCss = css`
  grid-column: 4;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
`

const headingListCss = css`
  > li::marker {
    font-weight: bold;
    font-size: 1.5em;
  }
`

const audiencePictureCss = css`
  height: 2em;
`

const fadedPhaseCss = css`
  opacity: 0.45;
`
