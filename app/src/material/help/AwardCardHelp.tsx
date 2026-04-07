import { AwardCard } from '@gamepark/popcorn/material/AwardCard'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { usePlayerName } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util'

export const AwardCardHelp: FC<PopcornMaterialDisplayHelpProps> = ({ item }: { item: Partial<MaterialItem<PlayerColor, LocationType, AwardCard>> }) => {
  const playerName = usePlayerName(item.location?.player)
  if (item.id === undefined) {
    return
  }
  const awardCardKeyPart = camelCase(AwardCard[item.id])
  return (
    <>
      <h2>
        <Trans
          i18nKey="help.material.awardCard.title"
          components={{
            awardCardTitle: <Trans i18nKey={`material.awardCard.title.${awardCardKeyPart}`} />,
            location: (
              <Trans
                i18nKey={
                  item.location?.type === LocationType.AwardCardDeckSpot ? 'help.material.awardCard.title.location.deck' : 'help.material.awardCard.title.location.hand'
                }
                values={{ name: playerName }}
              />
            )
          }}
        />
      </h2>
      <p>
        <Trans i18nKey={`help.material.awardCard.description.${awardCardKeyPart}`} />
      </p>
    </>
  )
}
