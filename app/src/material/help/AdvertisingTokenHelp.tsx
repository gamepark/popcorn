import { AdvertisingTokenSpot } from '@gamepark/popcorn/material/AdvertisingTokenSpot'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { linkButtonCss, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
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
          <Trans i18nKey="help.material.advertisingToken.title" values={{ player: playerName }} />
        </h2>
        <p>
          <Trans
            i18nKey="help.material.advertisingToken.description.inPlayerReserve"
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
        <Trans i18nKey="help.material.advertisingToken.title" values={{ player: playerName }} />
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
                i18nKey={
                  'help.material.advertisingBoard.spot.' +
                  (item.location!.id === AdvertisingTokenSpot.AnyGuestPawn
                    ? 'anyGuestPawn'
                    : item.location!.id === AdvertisingTokenSpot.PlaceWhiteTokenIntoAnyBag
                      ? 'placeWhiteTokenIntoAnyBag'
                      : 'coloredGuestPawn')
                }
              />
            )
          }}
        />
      </p>
    </>
  )
}
