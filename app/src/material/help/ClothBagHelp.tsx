import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { useMaterialContext, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util'

export const ClothBagHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }) => {
  const playerName = usePlayerName(item.location?.player)
  const rules = useRules<PopcornRules>()
  const context = useMaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>()
  const numberOfGuests = rules?.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(item.location?.player).length
  return (
    <>
      <h2>
        <Trans i18nKey="help.material.clothBag.title" values={{ player: playerName }} />
      </h2>
      <p>
        <Trans
          i18nKey="help.material.clothBag.description"
          values={{ isMine: context.player !== undefined && context.player === item.location?.player, numberOfGuests: numberOfGuests, player: playerName }}
        />
      </p>
    </>
  )
}
