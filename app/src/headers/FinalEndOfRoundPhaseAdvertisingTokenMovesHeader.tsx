import { PopcornMove } from '@gamepark/popcorn/material/PopcornMoves'
import { HeaderText, PlayMoveButton, useLegalMoves } from '@gamepark/react-game'
import { isEndPlayerTurn } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const FinalEndOfRoundPhaseAdvertisingTokenMovesHeader: FC = () => {
  const moves = useLegalMoves<PopcornMove>()
  const passMove = moves.find(isEndPlayerTurn)
  const isPassOnlyMove = moves.length === 1 && moves[0] === passMove
  return (
    <HeaderText
      code="finalEndOfRoundPhaseAdvertisingTokenMoves"
      defaults={{
        you: 'You can move advertising tokens to coloured Guest spots or get them back or <pass/>',
        player: '{player} can move advertising tokens to coloured Guest spots or get them back or pass',
        players: 'Players can move advertising tokens to coloured Guest spots or get them back or pass'
      }}
      components={{
        pass: (
          <PlayMoveButton move={passMove} {...(isPassOnlyMove ? { auto: 10 } : {})}>
            <Trans i18nKey="header.button.passMove" defaults="pass" />
          </PlayMoveButton>
        )
      }}
    />
  )
}
