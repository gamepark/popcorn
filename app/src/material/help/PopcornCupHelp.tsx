import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PopcornToken, popcornTokens } from '@gamepark/popcorn/material/PopcornToken.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules.ts'
import { MaterialComponent, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util.ts'

export const PopcornCupHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }: { item: Partial<MaterialItem<PlayerColor, LocationType, PlayerColor>> }) => {
  const me = usePlayerId<PlayerColor>()
  const playerName = usePlayerName(item.id)
  const rules = useRules<PopcornRules>()
  const isMe = item.id === me
  const amount = isMe
    ? rules?.material(MaterialType.PopcornTokens).player(me).location(LocationType.PlayerPopcornPileUnderPopcornCupSpot).money(popcornTokens).count
    : -1
  return (
    <>
      <h2>
        <Trans i18nKey="" defaults="{player}'s Popcorn cup" values={{ player: playerName }} />
      </h2>
      <p>
        <Trans
          i18nKey=""
          defaults="This cup holds the Popcorn tokens <popcorn/> {isMe, select, true{you} other{{player}}} obtained during the game."
          values={{ isMe: item.id === me, player: playerName }}
          components={{
            popcorn: (
              <MaterialComponent
                type={MaterialType.PopcornTokens}
                itemId={PopcornToken.Token1}
                css={css`
                  display: inline-block;
                  vertical-align: middle;
                `}
              />
            )
          }}
        />
      </p>
      {isMe && (
        <p>
          <Trans i18nKey="" defaults="The cup currently holds {amount} Popcorn." values={{ amount: amount }} />
        </p>
      )}
    </>
  )
}
