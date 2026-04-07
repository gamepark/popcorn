import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import nameSymbol from '../../images/Symbols/ScoringName.png'
import popcornSymbol from '../../images/Symbols/ActionXPopcorn.png'
import moneySymbol from '../../images/Symbols/ActionXMoney.png'
import awardSymbol from '../../images/Symbols/MovieActionDrawAwardCard.png'
import totalSymbol from '../../images/Symbols/ScoringTotal.png'
import { FilmStrip } from '../../theme/filmStrip'
import {
  headerDarkCss, headerTitleCss, helpBodyCss,
  scoreRowCss, scoreIconCss, scoreCategoryCss,
  tearLineCss, totalBarCss, totalLabelCss, totalValueCss
} from '../../theme/helpStyles'

export const ScoreSheetHelp: FC = () => {
  return (
    <>
      <div css={headerDarkCss}>
        <div css={headerTitleCss} style={{ fontSize: '1.25em' }}>
          <Trans i18nKey="help.material.scoreSheet.title" defaults="Score Sheet"/>
        </div>
      </div>
      <FilmStrip/>
      <div css={helpBodyCss}>
        <div>
          <div css={scoreRowCss}>
            <div css={[scoreIconCss, nameBgCss]}>
              <Picture src={nameSymbol} css={iconPicCss}/>
            </div>
            <div css={scoreCategoryCss}>
              <Trans i18nKey="help.material.scoreSheet.description.name" components={{ icon: <></> }}/>
            </div>
          </div>
          <div css={scoreRowCss}>
            <div css={[scoreIconCss, popcornBgCss]}>
              <Picture src={popcornSymbol} css={iconPicCss}/>
            </div>
            <div css={scoreCategoryCss}>
              <Trans i18nKey="help.material.scoreSheet.description.popcornDuringGame" components={{ icon: <></> }}/>
            </div>
          </div>
          <div css={scoreRowCss}>
            <div css={[scoreIconCss, moneyBgCss]}>
              <Picture src={moneySymbol} css={iconPicCss}/>
            </div>
            <div css={scoreCategoryCss}>
              <Trans i18nKey="help.material.scoreSheet.description.popcornMoney" components={{ icon: <></> }}/>
            </div>
          </div>
          <div css={scoreRowCss}>
            <div css={[scoreIconCss, awardBgCss]}>
              <Picture src={awardSymbol} css={iconPicCss}/>
            </div>
            <div css={scoreCategoryCss}>
              <Trans i18nKey="help.material.scoreSheet.description.popcornAwardCards" components={{ icon: <></> }}/>
            </div>
          </div>
        </div>

        <div css={tearLineCss}/>

        <div css={totalBarCss}>
          <div css={totalLabelCss}>
            <Trans i18nKey="help.material.scoreSheet.description.total" components={{ icon: <></> }} defaults="Total"/>
          </div>
          <Picture src={totalSymbol} css={totalIconCss}/>
        </div>
      </div>
    </>
  )
}

const iconPicCss = css`
  max-width: 1.2em;
  max-height: 1.2em;
`

const totalIconCss = css`
  max-width: 1.5em;
  max-height: 1.5em;
`

const nameBgCss = css`background: #E3F2FD;`
const popcornBgCss = css`background: #FFF3E0;`
const moneyBgCss = css`background: #E8F5E9;`
const awardBgCss = css`background: #FFF8E1;`
