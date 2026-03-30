import { AdvertisingTokenSpot } from '@gamepark/popcorn/material/AdvertisingTokenSpot'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { linkButtonCss, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { PopcornMaterialDisplayHelpProps } from './utils/popcornMaterialDisplayHelpProps.util'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const AdvertisingTokenHelp: FC<PopcornMaterialDisplayHelpProps> = ({
  item
}: {
  item: Partial<MaterialItem<PlayerColor, LocationType, PlayerColor>>
}) => {
  const playerName = usePlayerName(item.id)
  if (item.location?.type === LocationType.PlayerAdvertisingTokenSpot) {
    return (
      <>
        <h2>
          <Trans i18nKey="help.advertisingToken.title" defaults="{player}'s Advertising token" values={{ player: playerName }} />
        </h2>
        <p>
          <Trans
            i18nKey="help.advertisingToken.inPlayerReserver"
            defaults="{player} can use Movie actions to put this token on the <boardLink>Advertising board</boardLink>"
            values={{ player: playerName }}
            components={{
              boardLink: <PlayMoveButton move={displayMaterialHelp(MaterialType.AdvertisingBoard)} local transient css={linkButtonCss}></PlayMoveButton>
            }}
          />
        </p>
      </>
    )
  }
  return (
    <>
      <h2>
        <Trans i18nKey="help.advertisingToken.title" defaults="{player}'s Advertising token" values={{ player: playerName }} />
      </h2>
      <p>
        <Trans
          i18nKey=""
          defaults="{player} can use this token to <action/>"
          values={{ player: playerName }}
          components={{
            boardLink: <PlayMoveButton move={displayMaterialHelp(MaterialType.AdvertisingBoard)} local transient css={linkButtonCss}></PlayMoveButton>,
            action: (
              <Trans
                i18nKey={`help.advertisingToken.onAdvertisingSpot${camelCase(AdvertisingTokenSpot[item.location!.id])}`}
                defaults={getTransDefault(item.location?.id)}
              />
            )
          }}
        />
      </p>
    </>
  )
}

const getTransDefault = (spot: AdvertisingTokenSpot): string => {
  switch (spot) {
    case AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag:
      return 'take 1 white Guest from the reserve or your cinema (in a theater or in the exit zone), then add it to any player’s bag (including your own). If there are none available, nothing happens.'
    case AdvertisingTokenSpot.AnyGuestPawn:
      return 'take 1 Guest of any color from the reserve (or, if there aren’t any, from any other player’s exit zone) and add it to your bag. If there are none available, nothing happens.'
    default:
      return 'take 1 {guestColor} Guest from the reserve (or, if there aren’t any, from any other player’s exit zone) and add it to your bag. If there are none available, nothing happens.'
  }
}
