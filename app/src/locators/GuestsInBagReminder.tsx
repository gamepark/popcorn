import { css } from '@emotion/react'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { Picture, usePlayerId, useRules } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { FC } from 'react'
import unknownGuestPawn from '../images/GuestPawns/UnknownGuestPawn.png'

export const GuestsInBagReminder: FC<{ location: Location }> = ({ location }) => {
  const player = location.player
  const rules = useRules<PopcornRules>()
  const viewingPlayer = usePlayerId<PlayerColor>()
  if (player === viewingPlayer) {
    const numberOfGuestsInBag = rules?.material(MaterialType.GuestPawns).location(LocationType.PlayerGuestPawnsUnderClothBagSpot).player(player).length
    return (
      <div css={reminderStyle}>
        <Picture src={unknownGuestPawn} css={pictureStyle} />
        <span css={numberStyle}> × {numberOfGuestsInBag}</span>
      </div>
    )
  }
  return
}

const reminderStyle = css`
  height: 2em;
  color: white;
  white-space: nowrap;
  display: flex;
  transform: translateZ(0.1em);
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.1) 100%);
  border-radius: 0.8em;
  justify-items: center;
  align-items: center;
`

const pictureStyle = css`
  height: 1.25em;
  flex: 1;
  align-self: center;
  padding-left: 0.4em;
  padding-top: 0.2em;
`

const numberStyle = css`
  font-size: 1.25em;
  padding: 0.2em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 10em;
  align-self: center;
  flex: 1;
`
