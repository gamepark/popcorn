import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { symbolCss } from '../../logs/utils/logCss.utils'
import nameSymbol from '../../images/Symbols/ScoringName.png'
import popcornSymbol from '../../images/Symbols/ActionXPopcorn.png'
import moneySymbol from '../../images/Symbols/ActionXMoney.png'
import awardSymbol from '../../images/Symbols/MovieActionDrawAwardCard.png'
import totalSymbol from '../../images/Symbols/ScoringTotal.png'

export const ScoreSheetHelp: FC = () => {
  return (
    <>
      <h2>
        <Trans i18nKey="help.material.scoreSheet.title" />
      </h2>
      <ul
        css={css`
          list-style: none;
        `}
      >
        <li>
          <Trans
            i18nKey="help.material.scoreSheet.description.name"
            components={{ icon: <Picture src={nameSymbol} css={[symbolCss, scoreSheetSymbolCss]} /> }}
          />
        </li>
        <li>
          <Trans
            i18nKey="help.material.scoreSheet.description.popcornDuringGame"
            components={{ icon: <Picture src={popcornSymbol} css={[symbolCss, scoreSheetSymbolCss]} /> }}
          />
        </li>
        <li>
          <Trans
            i18nKey="help.material.scoreSheet.description.popcornMoney"
            components={{ icon: <Picture src={moneySymbol} css={[symbolCss, scoreSheetSymbolCss]} /> }}
          />
        </li>
        <li>
          <Trans
            i18nKey="help.material.scoreSheet.description.popcornAwardCards"
            components={{ icon: <Picture src={awardSymbol} css={[symbolCss, scoreSheetSymbolCss]} /> }}
          />
        </li>
        <li>
          <Trans
            i18nKey="help.material.scoreSheet.description.total"
            components={{ icon: <Picture src={totalSymbol} css={[symbolCss, scoreSheetSymbolCss]} /> }}
          />
        </li>
      </ul>
    </>
  )
}

const scoreSheetSymbolCss = css`
  font-size: 2em;
  display: inline-block;
  vertical-align: middle;
`
