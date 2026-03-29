import { css } from '@emotion/react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GamePhase } from '@gamepark/popcorn/GamePhase.ts'
import { HelpCard } from '@gamepark/popcorn/material/HelpCard.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
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
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util.ts'

export const HelpCardHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }: { item: Partial<MaterialItem<PlayerColor, LocationType, HelpCard>> }) => {
  if (item.id === HelpCard.ActionsHelp) {
    return <ActionHelpCardHelp />
  }
  return <PhasesHelpCardHelp />
}

const ActionHelpCardHelp: FC = () => (
  <>
    <h2>
      <Trans i18nKey="help.helpCard.action.title" defaults="Actions reminder" />
    </h2>
    <div css={actionGridWithLastCss}>
      <div>
        <Picture src={getXMoneySymbol} css={actionPictureCss} />
      </div>
      <div>
        <Trans i18nKey="help.helpCard.action.money" defaults="Gain X $." />
      </div>
      <div>
        <Picture src={movieActionSymbol} css={actionPictureCss} />
      </div>
      <div>
        <Trans i18nKey="help.helpCard.action.movieAction" defaults="Use 1 Movie action." />
      </div>
      <div>
        <Picture src={getXPopcornSymbol} css={actionPictureCss} />
      </div>
      <div>
        <Trans i18nKey="help.helpCard.action.popcorn" defaults="Gain X Popcorn." />
      </div>
      <div>
        <Picture src={placeGuestInReserveSymbol} css={actionPictureCss} />
      </div>
      <div>
        <Trans i18nKey="help.helpCard.action.reserve" defaults="Place 1 of your Guests in the reserve." />
      </div>
      <div>
        <Picture src={exitGuestToBasSymbol} css={actionPictureCss} />
      </div>
      <div>
        <Trans i18nKey="help.helpCard.action.exitGuestToBag" defaults="Add 1 Guest from your exit zone to your bag." />
      </div>
      <div>
        <Picture src={audienceAdvanceSymbol} css={actionPictureCss} />
      </div>
      <div>
        <Trans i18nKey="help.helpCard.action.audience" defaults="Increase your audience." />
      </div>
      <div>
        <Picture src={drawAwardCardSymbol} css={actionPictureCss} />
      </div>
      <div>
        <Trans i18nKey="help.helpCard.action.awardCard" defaults="Draw 2 awards, keep 1." />
      </div>
      <div>
        <Picture src={drawGuestSymbol} css={actionPictureCss} />
      </div>
      <div>
        <Trans i18nKey="help.helpCard.action.drawGuest" defaults="Place 1 of your Guests in the reserve." />
      </div>
      <div css={lastLineCss}>
        <div>
          <Picture src={advertisingSymbol} css={actionPictureCss} />
        </div>
        <div>
          <Trans i18nKey="help.helpCard.action.advertising" defaults="Place 1 Advertising token on the corresponding space of the board." />
        </div>
      </div>
    </div>
    <h3 css={textCenterCss}>
      <Trans i18nKey="help.helpCard.header.buyingPhase" defaults="Phase: Buying and Advertising" />
    </h3>
    <div css={actionGridCss}>
      <div>
        <Picture src={whiteGuestToBagSymbol} css={actionPictureCss} />
      </div>
      <div>
        <Trans i18nKey="help.helpCard.action.whiteGuestToBag" defaults="Add 1 white Guest to any player's bag." />
      </div>
      <div css={iconsRowSpanCss}>
        <Picture src={yellowGuestSymbol} css={actionPictureCss} />
        <Picture src={greenGuestSymbol} css={actionPictureCss} />
        <Picture src={redGuestSymbol} css={actionPictureCss} />
        <Picture src={blueGuestSymbol} css={actionPictureCss} />
      </div>
      <div css={rowSpanCss}>
        <Trans i18nKey="help.helpCard.action.advertisingGuest" defaults="Gain 1 Guest of this color and add it to your bag." />
      </div>
      <div>
        <Picture src={anyGuestSymbol} css={actionPictureCss} />
      </div>
      <div>
        <Trans i18nKey="help.helpCard.action.advertisingAnyGuest" defaults="Gain 1 Guest of any color and add it to your bag." />
      </div>
    </div>
  </>
)

const PhasesHelpCardHelp: FC = () => {
  const rules = useRules<PopcornRules>()
  const currentPhase = rules?.currentPhase
  return (
    <>
      <h2>
        <Trans i18nKey="help.helpCard.phases.title" defaults="Turn Overview" />
      </h2>
      <ol css={headingListCss}>
        <li {...(currentPhase === GamePhase.BuyingPhase ? {} : { css: fadedPhaseCss })}>
          <h3>
            <Trans
              i18nKey="help.helpCard.phases.buyingAdvertising.title"
              defaults="Buying and Advertising (in turn order){currentPhase, plural, =1{ (current phase)} other{}}"
              values={{ currentPhase: currentPhase === GamePhase.BuyingPhase ? 1 : 0 }}
            />
          </h3>
          <Trans
            i18nKey="help.helpCard.phases.buyingAdvertising.description"
            defaults="All actions are optional and can be taken in any order:<nl/><ls><lit>Buy 1 movie + Showing bonus</lit><lit>Buy 1 theater</lit><lit>Activate Advertising tokens</lit></ls>"
            components={{
              ls: <ul></ul>,
              lit: <li></li>,
              nl: <br />
            }}
          />
        </li>
        <li {...(currentPhase === GamePhase.ShowingsPhase ? {} : { css: fadedPhaseCss })}>
          <h3>
            <Trans
              i18nKey="help.helpCard.phases.showing.title"
              defaults="Showings (simultaneous){currentPhase, plural, =1{ (current phase)} other{}}"
              values={{ currentPhase: currentPhase === GamePhase.ShowingsPhase ? 1 : 0 }}
            />
          </h3>
          <Trans
            i18nKey="help.helpCard.phases.showing.description"
            defaults="<ols><lit>Open Cinema: Draw Guests according to your audience <audiencePicture /></lit><lit>Place Guests <e>(pay attention to seat order)</e></lit><lit>Seat and Movie actions <e>(choose the order of theater)</e><nl/><uls><lit>Activate a Guest <e>(in seat order)</e><nl/>One at a time: Seat action <arr/> Movie action <arr/> Exit"
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
              i18nKey="help.helpCard.pahses.endOfRound.title"
              defaults="End of Round{currentPhase, plural, =1{ (current phase)} other{}}"
              values={{ currentPhase: currentPhase === GamePhase.EndOfRoundPhase ? 1 : 0 }}
            />
          </h3>
          <Trans
            i18nKey="help.helpCard.phases.endOfRound.description"
            defaults="<ls><lit>Theatrical Run</lit><lit>New Lineup</lit></ls>"
            components={{
              ls: <ul></ul>,
              lit: <li></li>
            }}
          />
        </li>
      </ol>
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

const textCenterCss = css`
  text-align: center;
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
