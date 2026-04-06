import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PopcornToken } from '@gamepark/popcorn/material/PopcornToken'
import { Memory } from '@gamepark/popcorn/Memory'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { MaterialComponent, Picture, ScoringDescription, ScoringValue } from '@gamepark/react-game'
import { getEnumValues } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { Trans } from 'react-i18next'
import getXPopcornSymbol from '../images/Symbols/ActionXPopcorn.png'
import getXMoneySymbol from '../images/Symbols/ActionXMoney.png'
import awardSymbol from '../images/Symbols/MovieActionDrawAwardCard.png'
import theaterTrophiesSymbol from '../images/Symbols/TheaterTrophies.png'
import totalSymbol from '../images/Symbols/ScoringTotal.png'
import { symbolCss } from '../logs/utils/logCss.utils'

export enum PopcornScoringKeys {
  PopcornEarnedDuringGame,
  PopcornEarnedWithMoney,
  TheaterTrophyPopcorn,
  AwardCardsPopcorn,
  Total
}

export class PopcornScoringDescription implements ScoringDescription<PlayerColor, PopcornRules, PopcornScoringKeys> {
  public getScoringHeader(key: PopcornScoringKeys): ScoringValue {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <Picture src={this.getScoringSymbolForKey(key)} css={symbolCss} />
        <div>
          <Trans
            i18nKey={`scoring.key.${camelCase(PopcornScoringKeys[key])}`}
            components={{
              popcorn: (
                <MaterialComponent
                  type={MaterialType.PopcornTokens}
                  itemId={PopcornToken.Token1}
                  css={css`
                    font-size: 1.25em;
                    display: inline-block;
                    vertical-align: middle;
                  `}
                />
              )
            }}
          />
        </div>
      </div>
    )
  }

  public getScoringKeys(): PopcornScoringKeys[] {
    return getEnumValues(PopcornScoringKeys)
  }

  public getScoringPlayerData(key: PopcornScoringKeys, player: PlayerColor, rules: PopcornRules): ScoringValue | null {
    switch (key) {
      case PopcornScoringKeys.AwardCardsPopcorn:
        return rules.remind<number>(Memory.AwardCardPopcorn, player)
      case PopcornScoringKeys.PopcornEarnedDuringGame:
        return rules.remind<number>(Memory.GamePopcornScoreBeforeFinalRoundScore, player)
      case PopcornScoringKeys.PopcornEarnedWithMoney:
        return rules.remind<number>(Memory.MoneyPopcorn, player)
      case PopcornScoringKeys.TheaterTrophyPopcorn:
        return rules.material(MaterialType.TheaterTrophies).player(player).getItem()?.id ?? 0
      case PopcornScoringKeys.Total:
        return this.getScoringKeys()
          .filter((k) => k !== PopcornScoringKeys.Total)
          .reduce((total, currentKey) => total + (this.getScoringPlayerData(currentKey, player, rules) as number), 0)
    }
  }

  private getScoringSymbolForKey(key: PopcornScoringKeys): string | undefined {
    switch (key) {
      case PopcornScoringKeys.AwardCardsPopcorn:
        return awardSymbol
      case PopcornScoringKeys.PopcornEarnedDuringGame:
        return getXPopcornSymbol
      case PopcornScoringKeys.PopcornEarnedWithMoney:
        return getXMoneySymbol
      case PopcornScoringKeys.TheaterTrophyPopcorn:
        return theaterTrophiesSymbol
      case PopcornScoringKeys.Total:
        return totalSymbol
    }
  }
}
